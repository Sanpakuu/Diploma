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
    document.querySelector(".steps-container").style.display = "none";
    document.querySelector(".quiz-info").style.display = "none";
    document.getElementById("loader-container").style.display = "flex";
    document.getElementById("loader").style.display = "flex";
}

function hideLoader() {
    document.getElementById("loader-container").style.display = "none";
    document.getElementById("loader").style.display = "none";
    
    if (localStorage.getItem('isLoggedIn') === 'true'){
        document.querySelector(".steps-container").style.display = "flex";
        document.querySelector(".quiz-info").style.display = "none";
    }
    else {
        document.querySelector(".steps-container").style.display = "none";
        document.querySelector(".quiz-info").style.display = "block";
    }
}

function navigateToSign() {
    // Используйте window.location.href для перехода на другую страницу
    window.location.href = "sign";
}

document.addEventListener('DOMContentLoaded', function() {
    showLoader();// Показываем лоадер при загрузке страницы
    
    setTimeout(function() {
        hideLoader();// Скрываем лоадер после загрузки данных
    }, 2000);//2 секунды
});

// Объявляем переменные для частиц
var PARTICLE_NUM = 600;
var PARTICLE_BASE_RADIUS = 0.5;
var FL = 500;
var DEFAULT_SPEED = 1;
var BOOST_SPEED = 500;
var isBoostAnimating = false;

// Переменные для canvas
var canvas;
var canvasWidth, canvasHeight;
var context;
var centerX, centerY;
var mouseX, mouseY;
var speed = DEFAULT_SPEED;
var targetSpeed = DEFAULT_SPEED;
var particles = [];
var boosting = false;

window.addEventListener('load', function() {
    canvas = document.getElementById('c');

    var resize = function() {
        canvasWidth  = canvas.width = window.innerWidth;
        canvasHeight = canvas.height = window.innerHeight;
        centerX = canvasWidth * 0.5;
        centerY = canvasHeight * 0.5;
        context = canvas.getContext('2d');
        context.fillStyle = 'rgb(255, 255, 255)';
    };

    document.addEventListener('resize', resize);
    resize();

    mouseX = centerX;
    mouseY = centerY;

    for (var i = 0, p; i < PARTICLE_NUM; i++) {
        particles[i] = randomizeParticle(new Particle());
        particles[i].z -= 500 * Math.random();
    }

    setInterval(loop, 1000 / 60);
}, false);

// Функция для анимации частиц
function loop() {
    context.save();
    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    context.restore();

    speed += (targetSpeed - speed) * 0.01;

    var p;
    var cx, cy;
    var rx, ry;
    var f, x, y, r;
    var pf, px, py, pr;
    var a, a1, a2;

    var halfPi = Math.PI * 0.5;
    var atan2  = Math.atan2;
    var cos    = Math.cos;
    var sin    = Math.sin;

    context.beginPath();
    for (var i = 0; i < PARTICLE_NUM; i++) {
        p = particles[i];

        p.pastZ = p.z;
        p.z -= speed;

        if (p.z <= 0) {
            randomizeParticle(p);
            continue;
        }

        cx = centerX - (mouseX - centerX) * 1.25;
        cy = centerY - (mouseY - centerY) * 1.25;

        rx = p.x - cx;
        ry = p.y - cy;

        f = FL / p.z;
        x = cx + rx * f;
        y = cy + ry * f;
        r = PARTICLE_BASE_RADIUS * f;

        pf = FL / p.pastZ;
        px = cx + rx * pf;
        py = cy + ry * pf;
        pr = PARTICLE_BASE_RADIUS * pf;

        a  = atan2(py - y, px - x);
        a1 = a + halfPi;
        a2 = a - halfPi;

        context.moveTo(px + pr * cos(a1), py + pr * sin(a1));
        context.arc(px, py, pr, a1, a2, true);
        context.lineTo(x + r * cos(a2), y + r * sin(a2));
        context.arc(x, y, r, a2, a1, true);
        context.closePath();
    }
    context.fill();
}

// Функция для случайного распределения частиц
function randomizeParticle(p) {
    p.x = Math.random() * canvasWidth;
    p.y = Math.random() * canvasHeight;
    p.z = Math.random() * 1500 + 500;
    return p;
}

// Конструктор объекта Particle
function Particle(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.pastZ = 0;
}

// Получаем элементы, которые будем изменять
const stepNameElement = document.querySelector('.step-name');
const stepDescriptionElement = document.querySelector('.step-description');
const stepImageElement = document.querySelector('.step-image');
var boostButton = document.getElementById('boostButton');
var stepsContainer = document.querySelector('.steps');

// Устанавливаем начальное значение для шага
let currentStep = 0;

// Функция для обновления информации на странице на основе данных из базы данных
async function updateStepInfo() {
    // Получаем ссылку на текущий шаг из базы данных
    const currentStepRef = database.ref(`steps/step${currentStep}`);

    // Используем метод once для одноразового чтения данных текущего шага
    currentStepRef.once('value')
        .then((snapshot) => {
            const stepData = snapshot.val(); // Получаем данные шага из снимка
            if (stepData) {
                // Обновляем элементы на странице на основе данных из БД для текущего шага
                stepNameElement.textContent = stepData.stepName;
                stepDescriptionElement.textContent = stepData.stepDescription;
                stepImageElement.style.backgroundImage = `url(${stepData.stepImage})`;
            } else {
                console.log("Данные для текущего шага не найдены в базе данных.");
            }
        })
        .catch((error) => {
            console.error("Ошибка при чтении данных из базы данных для текущего шага:", error);
        });
}


// Назначаем обработчик события на кнопку "Продолжить"
boostButton.addEventListener('click', handleBoostButtonClick);

function handleBoostButtonClick() {
    if (!isBoostAnimating) {
        targetSpeed *= 50; // Увеличиваем скорость в 100 раз
        isBoostAnimating = true; // Устанавливаем флаг анимации ускорения
        stepsContainer.style.opacity = "0"; // Начинаем анимацию прозрачности
        setTimeout(function() {
            targetSpeed = DEFAULT_SPEED; // Возвращаем скорость обратно к стандартной
            isBoostAnimating = false; // Сбрасываем флаг анимации ускорения
            
            // После завершения анимации прозрачности и размытия, меняем шаг и показываем контейнер
            currentStep++; // Увеличиваем шаг на 1
            if (currentStep >= 10) {
                currentStep = 0; // Если достигнут конец списка шагов, переходим на первый шаг
            }

            // Обновляем количество пройденных шагов в базе данных пользователя
            const user = firebase.auth().currentUser;
            if (user) {
                const userStepsRef = firebase.database().ref('users/' + user.uid + '/stepsCompleted');
                userStepsRef.set(currentStep);
                console.log("Шаг обновлен, данные занесены в БД. Текущий шаг: ", currentStep);
            }

            // Получаем ссылку на следующий шаг из базы данных
            const nextStepRef = database.ref(`steps/step${currentStep}`);

            // Используем метод once для одноразового чтения данных следующего шага
            nextStepRef.once('value')
                .then((snapshot) => {
                    const stepData = snapshot.val(); // Получаем данные шага из снимка
                    if (stepData) {
                        // Обновляем информацию на странице на основе данных из БД для следующего шага
                        stepNameElement.textContent = stepData.stepName;
                        stepDescriptionElement.textContent = stepData.stepDescription;
                        stepImageElement.style.backgroundImage = `url(${stepData.stepImage})`;
                    } else {
                        console.log("Данные для шага не найдены в базе данных.");
                    }

                    setTimeout(function() {
                        stepsContainer.style.opacity = "1"; // Возвращаем прозрачность
                        stepsContainer.style.backdropFilter = "blur(10px)"; // Возвращаем размытие
                    }, 1000); // Небольшая задержка перед началом анимации контейнера
                })
                .catch((error) => {
                    console.error("Ошибка при чтении данных из базы данных:", error);
                    isBoostAnimating = false; // Сбрасываем флаг анимации ускорения в случае ошибки
                });
        }, 500); // Ждем 4 секунды перед сменой шага и началом анимации
    }
}

// Вызываем функцию обновления информации для отображения начального состояния
updateStepInfo();

// database.ref('steps/step10').set({
//     stepName: "",
//     stepImage: "",
//     stepDescription: ""
// });


    