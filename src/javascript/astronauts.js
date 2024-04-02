// Показать loader перед загрузкой данных
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

// Инициализация Firebase
firebase.initializeApp(firebaseConfig);

// Получение ссылки на базу данных
const database = firebase.database();

function showLoader() {
    document.querySelector(".main").style.display = "none";
    document.getElementById("loader-container").style.display = "flex";
    document.getElementById("loader").style.display = "flex";
}

function hideLoader() {
    document.getElementById("loader-container").style.display = "none";
    document.getElementById("loader").style.display = "none";
    document.querySelector(".main").style.display = "flex";
}

// Получение ссылки на узел "astronauts"
const astronautsRef = database.ref('astronauts');

// Обработчик события загрузки данных из базы данных
document.addEventListener('DOMContentLoaded', function() {

    astronautsRef.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var astronautData = childSnapshot.val();
            var astronautKey = childSnapshot.key;

            // Доступ к данным о космонавте
            var astronautName = astronautData.astronautName;
            var astronautInfo = astronautData.astronautInfo;
            var astronautImageURL = astronautData.astronautImage;

            // Обновление HTML для соответствующего космонавта
            var astronautDiv = document.getElementById(astronautKey);
            if (astronautDiv) {
                astronautDiv.querySelector('.as-name').innerText = astronautName;
                astronautDiv.querySelector('.as-info').innerText = astronautInfo;
                astronautDiv.querySelector('.as-image').style.backgroundImage = 'url(' + astronautImageURL + ')';
            } else {
                console.error('Элемент ' + astronautKey + ' не найден.');
            }
        });

        // Вызвать hideLoader после завершения загрузки данных
        hideLoader();
    });
});

// // Сохраняем информацию о космонавтах в базе данных
// database.ref('astronauts/as6').set({
//     astronautName: "",
//     astronautImage: "",
//     astronautInfo: ""
// });