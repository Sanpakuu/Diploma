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
  }
});

function displayUserInfo(uid) {
  const userRef = database.ref("users/" + uid);
  userRef.once("value", function (snapshot) {
    const userData = snapshot.val();
    document.getElementById("id").textContent += ` ${uid}`;
    document.getElementById("login").textContent += ` ${userData.login}`;
    document.getElementById("email").textContent += ` ${userData.email}`;
    document.getElementById("password").textContent += ` ${userData.pass}`;
    console.log("Данные о пользователе загружены!");
    hideLoader();
  });
}
