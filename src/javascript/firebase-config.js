const firebaseConfig = {
    apiKey: "AIzaSyDiL7cJ54cNtuDD676elAz0iSRMOaVth-U",
    authDomain: "diplom-93856.firebaseapp.com",
    projectId: "diplom-93856",
    storageBucket: "diplom-93856.appspot.com",
    messagingSenderId: "788892321907",
    appId: "1:788892321907:web:e7597c191b5f3578efc206",
    measurementId: "G-FX34DDGDHN",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

function register() {
    const login = document.getElementById("login").value;
    const email = document.getElementById("email2").value;
    const password = document.getElementById("password2").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (
        validate_email(email) == false ||
        validate_pass(password) == false ||
        validate_field(login) == false
    ) {
        alert("Неверные данные");
        return;
    }

    if (password != confirmPassword) {
        alert("Проверьте правильность введенных паролей");
        return;
    }

    auth
        .createUserWithEmailAndPassword(email, password)
        .then(function () {
            var user = auth.currentUser;
            var database_ref = database.ref();

            var user_data = {
                login: login,
                email: email,
                pass: password,
                last_login: Date.now(),
            };

            database_ref.child("users/" + user.uid).set(user_data);

            alert("Пользователь создан");
        })
        .catch(function (error) {
            var error_code = error.code;
            var error_message = error.message;

            alert(error_message);
        });
}

async function login() {
    const email = document.getElementById("email1").value;
    const password = document.getElementById("password1").value;
    console.log(email);
    if (validate_field(email) == false || validate_pass(password) == false) {
        alert("Неверные данные");
        return;
    }

    await auth
        .signInWithEmailAndPassword(email, password)
        .then(function () {
            var user = auth.currentUser;
            var database_ref = database.ref();

            var user_data = {
                last_login: Date.now(),
            };

            database_ref.child("users/" + user.uid).update(user_data);

            alert("Ты вошел");

            // Сохраняем информацию о входе пользователя в localStorage
            localStorage.setItem("isLoggedIn", "true");

            // Перенаправляем пользователя на страницу "Личный кабинет"
            window.location.href = "/cabinet";
        })
        .catch(function (error) {
            var error_message = error.message;

            alert(error_message);
        });
}

function validate_email(email1) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/;
    if (expression.test(email1) == true) {
        return true;
    } else return false;
}

function validate_pass(password) {
    if (password.length < 6) {
        return false;
    } else return true;
}

function validate_field(field) {
    if (field == null || field.trim() === "") {
        return false;
    } else return true;
}

