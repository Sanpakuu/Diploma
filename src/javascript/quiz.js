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
const database = firebase.database();

function navigateToSign() {
  // Используйте window.location.href для перехода на другую страницу
  window.location.href = "/html/sign.html";
}
function showLoader() {
  document.getElementById("loader-container").style.display = "flex";
  document.getElementById("loader").style.display = "flex";
  document.querySelector(".quiz").style.display = "none";
}
function hideLoader() {
  document.getElementById("loader-container").style.display = "none";
  document.getElementById("loader").style.display = "none";
  document.querySelector(".quiz").style.display = "flex";
}

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("isLoggedIn") === "true") {
    document.querySelector(".quiz-info").style.display = "none";
    document.querySelector(".quiz-buttons").style.display = "flex";
  } else {
    document.querySelector(".quiz-info").style.display = "block";
  }

  const questionsSets = []; // Добавлено объявление переменной questionsSets

  // Функция для загрузки вопросов из базы данных Firebase
  async function loadQuestionsFromFirebase(quizName) {
    showLoader();
    console.log("Загрузка вопросов из Firebase...");
    try {
      const response = await fetch(
        `https://diplom-93856-default-rtdb.firebaseio.com/quizes/${quizName}.json`
      );
      if (!response.ok) {
        throw new Error("Ошибка загрузки вопросов");
      }
      const data = await response.json();
      console.log("Данные успешно загружены из Firebase:", data);

      if (data && data.questions) {
        hideLoader();
        return data.questions;
      } else {
        throw new Error("Ошибка: данные в Firebase пусты или отсутствуют");
      }
    } catch (error) {
      console.error("Ошибка при загрузке вопросов из Firebase:", error);
      hideLoader();
      questionsLoaded = false; // Устанавливаем флаг загрузки вопросов в false в случае ошибки
      return null;
    }
  }

  // Обработчик событий для кнопок выбора викторины
  document.querySelectorAll(".quiz-button").forEach(function (button, index) {
    button.addEventListener("click", function () {
      var quizNumber = button.dataset.quiz;
      loadQuestions(quizNumber);
      // После выбора викторины скрываем кнопки и отображаем контент викторины
      document.querySelector(".quiz-buttons").style.display = "none";
      document.querySelector(".quiz-content").style.display = "block";
    });
  });

  const quizScores = [];

  let currentQuestion = 0;
  let selectedOption = null;
  let score = 0;
  let showResult = false;
  let currentQuestionsSet = 0; // индекс текущего набора вопросов
  let questionsLoaded = false; // Добавляем переменную для отслеживания загрузки вопросов

  const questionContainer = document.querySelector(".question_number");
  const optionsContainer = document.querySelector(".options");
  const submitButton = document.querySelector(".btn_submit");
  const uid = localStorage.getItem("uid");

  // Функция для записи результатов викторины в массив
  function recordQuizScore(quizIndex, score) {
    // Проверяем, инициализирован ли quizScores[quizIndex] как массив
    if (!Array.isArray(quizScores[quizIndex])) {
      quizScores[quizIndex] = []; // Если нет, инициализируем его как пустой массив
    }
    // Теперь мы уверены, что quizScores[quizIndex] - это массив, и можем безопасно использовать push
    quizScores[quizIndex].push(score);
  
    // Отправляем данные о пройденных викторинах в базу данных Firebase
    sendQuizScoresToFirebase(quizScores);
  }

  // Функция для загрузки вопросов из выбранного набора
  function loadQuestions(quizName) {
    console.log("loadQuestions");
    if (!questionsLoaded) {
      // Проверяем, были ли вопросы уже загружены
      loadQuestionsFromFirebase(quizName)
        .then((questions) => {
          if (questions) {
            // Проверяем, что данные успешно загружены
            questionsSets[currentQuestionsSet] = questions;
            renderQuestion();
            questionsLoaded = true; // Устанавливаем флаг загрузки вопросов в true
            console.log("Данные успешно загружены из Firebase:", questions);
          } else {
            console.error("Ошибка: данные в Firebase пусты или отсутствуют");
          }
        })
        .catch((error) => {
          console.error("Ошибка при загрузке вопросов из Firebase:", error);
          questionsLoaded = false; // Сбрасываем флаг загрузки вопросов
        });
    }
  }

  // Функция для отображения вопросов
  function renderQuestion() {
    // Проверяем, определен ли массив вопросов перед попыткой доступа к нему
    if (questionsSets[currentQuestionsSet]) {
      document.querySelectorAll(".numb").forEach((button, index) => {
        if (index === currentQuestion) {
          button.classList.add("current");
        } else {
          button.classList.remove("current");
        }
      });

      // Теперь текст вопроса будет изменяться при переходе к следующему вопросу
      questionContainer.textContent =
        questionsSets[currentQuestionsSet][currentQuestion].question;
      optionsContainer.innerHTML = "";
      if (!showResult) {
        questionsSets[currentQuestionsSet][currentQuestion].options.forEach(
          (option, index) => {
            const optionButton = document.createElement("button");
            optionButton.textContent = `${index + 1}. ${option}`;
            optionButton.classList.add("option_button");
            optionButton.addEventListener("click", () =>
              handleOptionClick(optionButton, option)
            );
            optionsContainer.appendChild(optionButton);
          }
        );
      } else {
        const resultMessage = document.createElement("h6");
        resultMessage.textContent = `Ваша галактическая оценка: ${score}`;
        optionsContainer.appendChild(resultMessage);
        // Скрыть элемент btn_answer
        submitButton.style.display = "none";
      }
    }
  }

  // Функция для обработки клика по варианту ответа
  function handleOptionClick(button, option) {
    selectedOption = option;
    selectedOptionIndex = Array.from(optionsContainer.children).indexOf(button); // Получаем индекс выбранного варианта ответа
    // Сначала сбросить цвет всех кнопок
    document.querySelectorAll(".option_button").forEach((button) => {
      button.style.backgroundColor = "#D9D9D9"; // Цвет по умолчанию
    });
    // Затем установить цвет выбранной кнопки
    button.style.backgroundColor = "#727272"; // Цвет при выборе
  }

  // Функция для загрузки следующего вопроса или отображения результата
  function handleNextQuestion() {
    const isCorrect =
      selectedOption ===
      questionsSets[currentQuestionsSet][currentQuestion].correctAnswer;
    isAnswerCorrect = isCorrect;

    // Получаем все кнопки button.numb
    const numberButtons = document.querySelectorAll(".numb");

    // Получаем индекс кнопки, которую нужно изменить
    const buttonIndex = currentQuestion;

    // Устанавливаем цвет кнопки в зависимости от правильности ответа
    if (isCorrect) {
      numberButtons[buttonIndex].style.backgroundColor = "green";
    } else {
      numberButtons[buttonIndex].style.backgroundColor = "red";
    }

    if (isCorrect) {
      score++;
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questionsSets[currentQuestionsSet].length) {
        currentQuestion++;
        selectedOption = null;
        isAnswerCorrect = null;
        renderQuestion();
      } else {
        quizScores[currentQuestionsSet] = score;

        showResult = true;
        renderQuestion();

        // Выводим счет текущей викторины в консоль с указанием номера викторины
        console.log(`Счет викторины: ${score}`);

        recordQuizScore(currentQuestionsSet, score);
       
        // Добавляем таймер на возврат к выбору викторины через 3 секунды
        setTimeout(() => {
          // Показываем кнопки выбора викторины
          document.querySelector(".quiz-buttons").style.display = "flex";
          // Скрываем контент викторины
          document.querySelector(".quiz-content").style.display = "none";
        }, 3000);
      }
    }, 50);
  }

  function resetQuizState() {
    console.log("resetQuizState");
    showResult = false;
    selectedOption = null;
    currentQuestion = 0;
    score = 0;
    questionsLoaded = false;
    const numberButtons = document.querySelectorAll(".numb");
    numberButtons.forEach((button) => {
      button.style.backgroundColor = ""; // Сброс цвета кнопок
    });
    // Отображение кнопки Submit перед началом новой викторины
    submitButton.style.display = "block";
  }

  // Добавляем обработчики событий для кнопок выбора викторины
  document.querySelectorAll(".quiz-button").forEach((button, index) => {
    button.addEventListener("click", () => {
      const quizName = `quiz${index + 1}`; // имя викторины соответствует "quiz" + номер кнопки
      currentQuestionsSet = index; // устанавливаем текущий набор вопросов
      resetQuizState(); // Сбрасываем состояние викторины
      loadQuestions(quizName); // загружаем вопросы выбранной викторины
    });
  });

  // Добавляем обработчик события для кнопки "Далее"
  submitButton.addEventListener("click", handleNextQuestion);

  // Функция для отправки данных о пройденных викторинах в базу данных Firebase
  function sendQuizScoresToFirebase(scores) {
    // Убедитесь, что scores не содержит undefined значения
    const cleanedScores = {};
    Object.keys(scores).forEach(key => {
      if (scores[key] !== undefined) {
        cleanedScores[key] = scores[key];
      }
    });

    // Создаем ссылку на место в базе данных
    const userScoresRef = database.ref(`userScores/${uid}`);
    
    // Записываем очищенные данные о пройденных викторинах в базу данных
    userScoresRef.update(cleanedScores, (error) => {
      if (error) {
        console.error("Ошибка при отправке данных в базу данных Firebase:", error);
      } else {
        console.log("Данные успешно отправлены в базу данных Firebase");
      }
    });
  }
});
