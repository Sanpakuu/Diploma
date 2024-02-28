// Функция для отправки данных в базу данных Firebase
function writeToFirebase(data) {
  const databaseURL =
    "https://diplom-93856-default-rtdb.firebaseio.com/quizes.json"; // замените на URL вашей базы данных
  fetch(databaseURL, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("Data has been sent to Firebase successfully");
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// Данные для записи в базу данных
const quizzesData = {
  quiz1: {
    questions: [
      {
        id: 1,
        question: "Какая планета Солнечной системы известна своими кольцами?",
        options: ["Венера", "Марс", "Юпитер", "Сатурн"],
        correctAnswer: "Сатурн",
      },
      {
        id: 2,
        question: "Какая планета известна как 'Утренняя звезда' и 'Вечерняя звезда'?",
        options: ["Юпитер", "Сатурн", "Венера", "Марс"],
        correctAnswer: "Венера",
      },
      {
        id: 3,
        question: "Какая планета обладает самой быстрой орбитой вокруг Солнца?",
        options: ["Меркурий", "Уран", "Сатурн", "Юпитер"],
        correctAnswer: "Меркурий",
      },
      {
        id: 4,
        question: "Какая планета обладает самой долгой орбитой вокруг Солнца?",
        options: ["Юпитер", "Плутон", "Венера", "Нептун"],
        correctAnswer: "Плутон",
      },
      {
        id: 5,
        question: "Какой космический объект считается 'Красной планетой'?",
        options: ["Луна", "Марс", "Юпитер", "Меркурий"],
        correctAnswer: "Марс",
      },
      {
        id: 6,
        question: "Какая планета Солнечной системы обладает самыми высокими ветрами?",
        options: ["Солнце", "Уран", "Юпитер", "Нептун"],
        correctAnswer: "Нептун",
      },
      {
        id: 7,
        question: "Какой из спутников Юпитера обладает самой большой вулканической активностью?",
        options: ["Ио", "Европа", "Ганимед", "Каллисто"],
        correctAnswer: "Ио",
      },
      {
        id: 8,
        question: "Какая планета обладает наибольшим количеством спутников в Солнечной системе?",
        options: ["Нептун", "Марс", "Юпитер", "Сатурн"],
        correctAnswer: "Юпитер",
      },
      {
        id: 9,
        question: "Какая планета имеет самый длительный день?",
        options: ["Венера", "Земля", "Нептун", "Уран"],
        correctAnswer: "Венера",
      },
      {
        id: 10,
        question: "Какой космический объект считается 'Утраченной планетой'?",
        options: ["Ио", "АO-210", "Плутон", "Гали"],
        correctAnswer: "Плутон",
      },
    ],
  },
  quiz2: {
    questions: [
      {
        id: 1,
        question: "Какая планета Солнечной системы известна своими кольцами?",
        options: ["Венера", "Марс", "Юпитер", "Сатурн"],
        correctAnswer: "Сатурн",
      },
      {
        id: 2,
        question: "Какая планета известна как 'Утренняя звезда' и 'Вечерняя звезда'?",
        options: ["Юпитер", "Сатурн", "Венера", "Марс"],
        correctAnswer: "Венера",
      },
      {
        id: 3,
        question: "Какая планета обладает самой быстрой орбитой вокруг Солнца?",
        options: ["Меркурий", "Уран", "Сатурн", "Юпитер"],
        correctAnswer: "Меркурий",
      },
      {
        id: 4,
        question: "Какая планета обладает самой долгой орбитой вокруг Солнца?",
        options: ["Юпитер", "Плутон", "Венера", "Нептун"],
        correctAnswer: "Плутон",
      },
      {
        id: 5,
        question: "Какой космический объект считается 'Красной планетой'?",
        options: ["Луна", "Марс", "Юпитер", "Меркурий"],
        correctAnswer: "Марс",
      },
      {
        id: 6,
        question: "Какая планета Солнечной системы обладает самыми высокими ветрами?",
        options: ["Солнце", "Уран", "Юпитер", "Нептун"],
        correctAnswer: "Нептун",
      },
      {
        id: 7,
        question: "Какой из спутников Юпитера обладает самой большой вулканической активностью?",
        options: ["Ио", "Европа", "Ганимед", "Каллисто"],
        correctAnswer: "Ио",
      },
      {
        id: 8,
        question: "Какая планета обладает наибольшим количеством спутников в Солнечной системе?",
        options: ["Нептун", "Марс", "Юпитер", "Сатурн"],
        correctAnswer: "Юпитер",
      },
      {
        id: 9,
        question: "Какая планета имеет самый длительный день?",
        options: ["Венера", "Земля", "Нептун", "Уран"],
        correctAnswer: "Венера",
      },
      {
        id: 10,
        question: "Какой космический объект считается 'Утраченной планетой'?",
        options: ["Ио", "АO-210", "Плутон", "Гали"],
        correctAnswer: "Плутон",
      },
    ],
  },
  quiz3: {
    questions: [
      {
        id: 1,
        question: "Какая планета Солнечной системы известна своими кольцами?",
        options: ["Венера", "Марс", "Юпитер", "Сатурн"],
        correctAnswer: "Сатурн",
      },
      {
        id: 2,
        question: "Какая планета известна как 'Утренняя звезда' и 'Вечерняя звезда'?",
        options: ["Юпитер", "Сатурн", "Венера", "Марс"],
        correctAnswer: "Венера",
      },
      {
        id: 3,
        question: "Какая планета обладает самой быстрой орбитой вокруг Солнца?",
        options: ["Меркурий", "Уран", "Сатурн", "Юпитер"],
        correctAnswer: "Меркурий",
      },
      {
        id: 4,
        question: "Какая планета обладает самой долгой орбитой вокруг Солнца?",
        options: ["Юпитер", "Плутон", "Венера", "Нептун"],
        correctAnswer: "Плутон",
      },
      {
        id: 5,
        question: "Какой космический объект считается 'Красной планетой'?",
        options: ["Луна", "Марс", "Юпитер", "Меркурий"],
        correctAnswer: "Марс",
      },
      {
        id: 6,
        question: "Какая планета Солнечной системы обладает самыми высокими ветрами?",
        options: ["Солнце", "Уран", "Юпитер", "Нептун"],
        correctAnswer: "Нептун",
      },
      {
        id: 7,
        question: "Какой из спутников Юпитера обладает самой большой вулканической активностью?",
        options: ["Ио", "Европа", "Ганимед", "Каллисто"],
        correctAnswer: "Ио",
      },
      {
        id: 8,
        question: "Какая планета обладает наибольшим количеством спутников в Солнечной системе?",
        options: ["Нептун", "Марс", "Юпитер", "Сатурн"],
        correctAnswer: "Юпитер",
      },
      {
        id: 9,
        question: "Какая планета имеет самый длительный день?",
        options: ["Венера", "Земля", "Нептун", "Уран"],
        correctAnswer: "Венера",
      },
      {
        id: 10,
        question: "Какой космический объект считается 'Утраченной планетой'?",
        options: ["Ио", "АO-210", "Плутон", "Гали"],
        correctAnswer: "Плутон",
      },
    ],
  },
  quiz4: {
    questions: [
      {
        id: 1,
        question: "Какая планета Солнечной системы известна своими кольцами?",
        options: ["Венера", "Марс", "Юпитер", "Сатурн"],
        correctAnswer: "Сатурн",
      },
      {
        id: 2,
        question: "Какая планета известна как 'Утренняя звезда' и 'Вечерняя звезда'?",
        options: ["Юпитер", "Сатурн", "Венера", "Марс"],
        correctAnswer: "Венера",
      },
      {
        id: 3,
        question: "Какая планета обладает самой быстрой орбитой вокруг Солнца?",
        options: ["Меркурий", "Уран", "Сатурн", "Юпитер"],
        correctAnswer: "Меркурий",
      },
      {
        id: 4,
        question: "Какая планета обладает самой долгой орбитой вокруг Солнца?",
        options: ["Юпитер", "Плутон", "Венера", "Нептун"],
        correctAnswer: "Плутон",
      },
      {
        id: 5,
        question: "Какой космический объект считается 'Красной планетой'?",
        options: ["Луна", "Марс", "Юпитер", "Меркурий"],
        correctAnswer: "Марс",
      },
      {
        id: 6,
        question: "Какая планета Солнечной системы обладает самыми высокими ветрами?",
        options: ["Солнце", "Уран", "Юпитер", "Нептун"],
        correctAnswer: "Нептун",
      },
      {
        id: 7,
        question: "Какой из спутников Юпитера обладает самой большой вулканической активностью?",
        options: ["Ио", "Европа", "Ганимед", "Каллисто"],
        correctAnswer: "Ио",
      },
      {
        id: 8,
        question: "Какая планета обладает наибольшим количеством спутников в Солнечной системе?",
        options: ["Нептун", "Марс", "Юпитер", "Сатурн"],
        correctAnswer: "Юпитер",
      },
      {
        id: 9,
        question: "Какая планета имеет самый длительный день?",
        options: ["Венера", "Земля", "Нептун", "Уран"],
        correctAnswer: "Венера",
      },
      {
        id: 10,
        question: "Какой космический объект считается 'Утраченной планетой'?",
        options: ["Ио", "АO-210", "Плутон", "Гали"],
        correctAnswer: "Плутон",
      },
    ]
  }
};

// Вызов функции для записи данных в базу данных
writeToFirebase(quizzesData);
