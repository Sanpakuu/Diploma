document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, сохранена ли информация о входе пользователя
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (isLoggedIn === 'true') {
        // Перенаправляем пользователя на страницу личного кабинета
        window.location.href = '/html/cabinet.html';
    }
    if (isLoggedIn === 'false') {
        // Перенаправляем пользователя на страницу входа
        window.location.href = '/html/sign.html';
    }
});