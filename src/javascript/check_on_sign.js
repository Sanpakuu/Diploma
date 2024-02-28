function check_on_sign() {
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        window.location.href = "/cabinet";
    }
    else {window.location.href = "/sign";}
}