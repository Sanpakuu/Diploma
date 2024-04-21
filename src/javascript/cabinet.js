showLoader();

const firebaseConfig = {
  apiKey: "AIzaSyDiL7cJ54cNtuDD676elAz0iSRMOaVth-U",
  authDomain: "diplom-93856.firebaseapp.com",
  projectId: "diplom-93856",
  storageBucket: "diplom-93856.appspot.com",
  messagingSenderId: "788892321907",
  appId: "1:788892321907:web:e7597c191b5f3578efc206",
  measurementId: "G-FX34DDGDHN",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

function showLoader() {
  document.querySelector(".main").style.display = "none";
  document.getElementById("loader-container").style.display = "flex";
  document.getElementById("loader").style.display = "flex";
  console.log("showLoader");
}
function hideLoader() {
  document.getElementById("loader-container").style.display = "none";
  document.getElementById("loader").style.display = "none";
  document.querySelector(".main").style.display = "flex";
  console.log("hideLoader");
}

function displayUserQuizScores(uid) {
  const userScoresRef = database.ref(`userScores/${uid}`);
  userScoresRef.once("value", function (snapshot) {
    const userScoresData = snapshot.val();
    if (userScoresData) {
      Object.keys(userScoresData).forEach((quizIndex, index) => {
        const quizScore = userScoresData[quizIndex];
        const quizScoreElement = document.getElementById(
          `quiz-score-${index + 1}`
        );
        if (quizScoreElement) {
          quizScoreElement.textContent += ` ${quizScore}`;
        } else {
          console.log(
            `Элемент для вывода баллов за Викторину №${index + 1} не найден.`
          );
        }
      });
    } else {
      console.log("У пользователя пока нет результатов викторин.");
    }
    console.log("Данные о викторинах пользователя? загружены!");
    hideLoader(); // Скрыть загрузчик после загрузки данных
  });
}

auth.onAuthStateChanged(function (user) {
  if (user) {
    // Если пользователь вошел, получаем его UID и отображаем информацию о пользователе
    localStorage.setItem("uid", user.uid); // Сохраняем UID в localStorage
    displayUserInfo(user.uid);
    displayUserQuizScores(user.uid); // Добавляем вызов функции для отображения результатов викторин
    displayUserProfileImage();
  }
});

function displayUserInfo(uid) {
  const userRef = database.ref("users/" + uid);
  userRef.once("value", function (snapshot) {
    const userData = snapshot.val();
    document.getElementById("id").textContent += ` ${uid}`;
    document.getElementById("login").textContent += ` ${userData.login}`;
    document.getElementById("email").textContent += ` ${userData.email}`;
    document.getElementById("password-text").textContent += ` ${userData.pass}`;

    if (
      userData.stepsCompleted != null &&
      userData.stepsCompleted != undefined
    ) {
      document.getElementById(
        "step-score"
      ).textContent += ` ${userData.stepsCompleted}`;
    } else {
      document.getElementById("step-score").textContent += ` 0`;
    }
    console.log("Данные о пользователе загружены!");

    hideLoader();
  });
}

// Обработка модального окна для смены пароля
document.addEventListener("DOMContentLoaded", function () {
  // Получаем модальное окно
  var modal = document.getElementById("passwordModal");

  // Получаем изображение, которое открывает модальное окно
  var img = document.getElementById("password-image"); // Убедитесь, что у вашего изображения есть этот id

  // Получаем элемент <span>, который закрывает модальное окно
  var span = document.getElementsByClassName("close")[0];

  // При клике на изображение открыть модальное окно
  img.onclick = function () {
    modal.style.display = "block";
  };

  // При клике на <span> (x), закрыть модальное окно
  span.onclick = function () {
    modal.style.display = "none";
  };

  // При клике вне модального окна, закрыть его
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});

// Функция для смены пароля
function changeUserPassword(oldPassword, newPassword) {
  const user = firebase.auth().currentUser;
  const credential = firebase.auth.EmailAuthProvider.credential(
    user.email,
    oldPassword
  );

  user
    .reauthenticateWithCredential(credential)
    .then(() => {
      user
        .updatePassword(newPassword)
        .then(() => {
          console.log("Пароль успешно изменен.");

          // Обновляем пароль в Firebase Database
          const userRef = firebase.database().ref("users/" + user.uid);
          userRef
            .update({
              pass: newPassword, // ВНИМАНИЕ: Хранение паролей в базе данных не рекомендуется!
            })
            .then(() => {
              alert("Пароль успешно изменен!");
              console.log("Пароль пользователя обновлен в Firebase Database.");
              location.reload();
            })
            .catch((error) => {
              console.error(
                "Ошибка при обновлении пароля в базе данных: ",
                error
              );
            });
        })
        .catch((error) => {
          console.error("Ошибка при смене пароля: ", error);
        });
    })
    .catch((error) => {
      console.error("Ошибка при повторной аутентификации: ", error);
    });
}

// Добавление обработчика событий для формы смены пароля
document
  .getElementById("passwordChangeForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    var oldPassword = document.getElementById("oldPassword").value;
    var newPassword = document.getElementById("newPassword").value;

    changeUserPassword(oldPassword, newPassword);
    modal.style.display = "none"; // Закрыть модальное окно после смены пароля
  });

document.getElementById("editImageText").addEventListener("click", function () {
  document.getElementById("profileImageUpload").click(); // Активирует клик по скрытому input[type="file"]
});

document.getElementById("editImageIcon").addEventListener("click", function () {
  document.getElementById("profileImageUpload").click(); // Активирует клик по скрытому input[type="file"]
});

// Добавляем обработчик событий для input[type="file"]
document
  .getElementById("profileImageUpload")
  .addEventListener("change", function (e) {
    const file = e.target.files[0]; // Получаем файл из input
    if (!file) {
      console.log("Файл не выбран.");
      return;
    }
    const user = firebase.auth().currentUser;
    const storageRef = firebase
      .storage()
      .ref("users/" + user.uid + "/" + file.name);

    // Загрузка файла в Firebase Storage
    storageRef
      .put(file)
      .then(function (snapshot) {
        console.log("Изображение загружено.");
        alert("Изображение загружено!");

        // Получение URL загруженного изображения
        snapshot.ref.getDownloadURL().then(function (url) {
          console.log("URL изображения:", url);

          // Обновление URL изображения в Firebase Database
          firebase
            .database()
            .ref("users/" + user.uid)
            .update({
              image: url,
            })
            .then(() => {
              console.log(
                "URL изображения профиля обновлен в Firebase Database."
              );
              // Здесь можно обновить изображение на странице без перезагрузки
              document.querySelector(
                ".user-image"
              ).style.backgroundImage = `url(${url})`;
            })
            .catch((error) => {
              console.error(
                "Ошибка при обновлении URL изображения в базе данных: ",
                error
              );
            });
        });
      })
      .catch((error) => {
        console.error("Ошибка при загрузке изображения: ", error);
      });
  });

// Функция для отображения фото пользователя
function displayUserProfileImage() {
  const user = firebase.auth().currentUser;
  if (user) {
    const userRef = firebase.database().ref("users/" + user.uid);
    userRef
      .once("value")
      .then(function (snapshot) {
        const userData = snapshot.val();
        if (userData && userData.image) {
          // Если у пользователя есть фото, обновляем его на странице
          document.querySelector(
            ".user-image"
          ).style.backgroundImage = `url(${userData.image})`;
        }
      })
      .catch(function (error) {
        console.error("Ошибка при получении данных пользователя: ", error);
      });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Получаем элементы модального окна
  var modal = document.getElementById("myModal");
  var btn = document.getElementById("openModalBtn");
  var span = document.getElementsByClassName("close2")[0];
  var sendBtn = document.getElementById("sendBtn");

  // Открываем модальное окно при клике на кнопку
  btn.onclick = function () {
    modal.style.display = "block";
  };

  // Закрываем модальное окно при клике на крестик
  span.onclick = function () {
    modal.style.display = "none";
  };

  // Закрываем модальное окно при клике за его пределами
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});

// Получение ссылки на узел в базе данных Firebase
const dbRef = firebase.database().ref('reports');

// Обработчик события при нажатии на кнопку "Отправить"
document.getElementById('sendBtn').addEventListener('click', function() {
  // Получение данных от пользователя
  const textInput = document.getElementById('textInput').value;
  const modal = document.getElementById('myModal');
  // Проверка наличия данных от пользователя
  if (textInput.trim() !== '') {
    // Генерация уникального ключа для новой записи в узле 'reports'
    const newReportRef = dbRef.child(firebase.auth().currentUser.uid).push();

    // Сохранение данных в базе данных Firebase
    newReportRef.set({
      email: firebase.auth().currentUser.email,
      login: firebase.auth().currentUser.displayName,
      report: textInput
    }).then(function() {
      alert('Отзыв успешно отправлен!');
      modal.style.display = "none";
    }).catch(function(error) {
      console.error('Ошибка при отправке отзыва:', error);
      alert('Произошла ошибка при отправке отзыва.');
    });
  } else {
    alert('Пожалуйста, введите отзыв перед отправкой.');
  }
});