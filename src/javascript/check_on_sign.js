function check_on_sign() {
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        window.location.href = "/html/cabinet.html";
    }
    else {window.location.href = "/html/sign.html";}
}