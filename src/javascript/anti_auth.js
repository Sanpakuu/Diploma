function anti_auth() {
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('uid');
    }
    window.location.href = "/sign";
}

