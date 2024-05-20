function shiftWords() {
    var ul = document.querySelector('.center-words');
    var lis = ul.getElementsByTagName('li');
    var lastLi = lis[lis.length - 1];
    ul.insertBefore(lastLi, lis[0]);

    // Удаляем класс "white" у всех элементов списка
    Array.from(ul.querySelectorAll('.clickable.white')).forEach(function(item) {
        item.classList.remove('white');
    });

    // Находим новое центральное слово и добавляем ему класс "white"
    var centralIndex = Math.floor(lis.length / 2);
    lis[centralIndex].querySelector('.clickable').classList.add('white');
}

// Вызываем функцию сразу после загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    shiftWords();
});

// И запускаем циклический вызов функции каждые 2000 миллисекунд
setInterval(shiftWords, 2000);

function Go() {
    window.location.href = '/html/discover.html';
}

function check_on_sign() {
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        window.location.href = "cabinet.html";
    }
    else {window.location.href = "sign.html";}
}