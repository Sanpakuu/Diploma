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

// Создаем массив с информацией о шагах
const stepsInfo = [
  {
    step: 1,
    name: 'Первый шаг',
    description: 'Описание первого шага',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/diplom-93856.appspot.com/o/background%2Ffriren.jpg?alt=media&token=1e38aeaf-1eaf-4ba0-9ee1-be447fd70a94',
  },
  {
    step: 2,
    name: 'Второй шаг',
    description: 'Описание второго шага',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/diplom-93856.appspot.com/o/background%2Ffriren.jpg?alt=media&token=1e38aeaf-1eaf-4ba0-9ee1-be447fd70a94',
  },
  {
    step: 3,
    name: 'Третий шаг',
    description: 'Описание третьего шага',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/diplom-93856.appspot.com/o/background%2Ffriren.jpg?alt=media&token=1e38aeaf-1eaf-4ba0-9ee1-be447fd70a94',
  }
];

// Устанавливаем начальное значение для шага
let currentStep = 0;

// Функция для обновления информации на странице
function updateStepInfo() {
    // Получаем информацию о текущем шаге
    const currentStepInfo = stepsInfo[currentStep];
    // Обновляем элементы на странице
    stepNameElement.textContent = currentStepInfo.name;
    stepDescriptionElement.textContent = currentStepInfo.description;
    stepImageElement.style.backgroundImage = `url(${currentStepInfo.imageUrl})`;
}

// Функция для обработки нажатия кнопки "Продолжить"
function handleBoostButtonClick() {
    if (!isBoostAnimating) {
        targetSpeed *= 100; // Увеличиваем скорость в 100 раз
        isBoostAnimating = true; // Устанавливаем флаг анимации ускорения
        stepsContainer.style.opacity = "0"; // Начинаем анимацию прозрачности
        setTimeout(function() {
            targetSpeed = DEFAULT_SPEED; // Возвращаем скорость обратно к стандартной
            isBoostAnimating = false; // Сбрасываем флаг анимации ускорения
            
            // После завершения анимации прозрачности и размытия, меняем шаг и показываем контейнер
            setTimeout(function() {
                currentStep++; // Переходим к следующему шагу
                if (currentStep >= stepsInfo.length) {
                    currentStep = 0; // Если достигнут конец списка шагов, переходим на первый шаг
                }
                updateStepInfo(); // Обновляем информацию на странице
                stepsContainer.style.opacity = "1"; // Возвращаем прозрачность
                stepsContainer.style.backdropFilter = "blur(10px)"; // Возвращаем размытие
            }, 4000); // Ждем 1 секунду перед возвращением прозрачности и размытия
        }, 600); // Ждем 1.5 секунды перед возвращением скорости и сменой шага
    }
}


// Назначаем обработчик события на кнопку "Продолжить"
boostButton.addEventListener('click', handleBoostButtonClick);

// Вызываем функцию обновления информации для отображения начального состояния
updateStepInfo();