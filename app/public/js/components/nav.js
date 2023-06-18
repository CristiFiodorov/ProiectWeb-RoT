function appendLoginButton(nav) {
    const login = document.createElement("a");
    login.className = "navbar__log-link";
    login.href = "login.html";
    const logButton = document.createElement("button");
    logButton.className = "navbar__log-btn";
    logButton.innerHTML = "Log in";
    login.appendChild(logButton);
    nav.appendChild(login);
}

function appendLogoutButton(nav) {
    const logout = document.createElement("a");
    logout.className = "navbar__log-link";
    logout.href = "#";
    const logoutButton = document.createElement("button");
    logoutButton.className = "navbar__log-btn";
    logoutButton.innerHTML = "Log out";
    logout.appendChild(logoutButton);
    logout.addEventListener("click", () => {
        localStorage.removeItem("accessToken");
        window.location.href = "index.html";
    });
    nav.appendChild(logout);
}


let nav = document.getElementById("navbar")
nav.innerHTML = '\
    <div class="navbar__logo-nav-links">\
        <div class="navbar__logo-div">\
            <div class="navbar__logo-div__container">\
                <a href="index.html"><img src="../public/images/logo-dark.png" alt="Your Logo" class="navbar__logo"></a>\
                <img src="../public/images/hamb.png" class="toggle"></img>\
            </div>\
        </div>\
        <ul class="navbar__nav-links">\
            <li><a class="navbar__link" href="index.html">Acasa</a></li>\
            <li><a class="navbar__link" href="courses.html">Cursuri</a></li>\
            <li><a class="navbar__link" href="sign_categories.html">Indicatoare</a></li>\
            <li><a class="navbar__link" href="advice.html">Sfaturi</a></li>\
            <li><a class="navbar__link" href="teste.html">Teste</a></li>\
            <li><a class="navbar__link" href="clasament.html">Clasament</a></li>\
        </ul>\
    </div>';

// if user is not logged in then show login button
if (!localStorage.getItem("accessToken")) {
    // not logged because token is not set in local storage 
    appendLoginButton(nav);
}
else {
    appendLogoutButton(nav);
}

let toggle = document.querySelector(".toggle");
let login = document.querySelector(".navbar__log-btn");
let links = document.querySelector(".navbar__nav-links");

let current_url = document.location;

document.querySelectorAll(".navbar__link").forEach(function (e) {
    if (e.href == current_url) {
        e.classList += " navbar__link--clicked";
    }
});

toggle.addEventListener('click', function () {
    console.log("toggle clicked");
    // toggle class "active" on topNav let
    login.classList.toggle("active__button");
    links.classList.toggle("active");
}, false);

