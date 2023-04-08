let nav = document.getElementById("navbar")
nav.innerHTML = '\
    <div class="navbar__logo-nav-links">\
        <div class="navbar__logo-div">\
            <div class="navbar__logo-div__container">\
                <a href="#"><img src="images/logo-dark.png" alt="Your Logo" class="navbar__logo"></a>\
                <img src="/assets/hamb.png" class="toggle"></img>\
            </div>\
        </div>\
        <ul class="navbar__nav-links">\
            <li><a class="navbar__link" href="page.html">Acasa</a></li>\
            <li><a class="navbar__link" href="tipuri_indicatoare.html">Indicatoare</a></li>\
            <li><a class="navbar__link" href="sfaturi.html">Sfaturi</a></li>\
            <li><a class="navbar__link" href="#">Teste</a></li>\
            <li><a class="navbar__link" href="#">Clasament</a></li>\
        </ul>\
    </div>\
\
    <button class="navbar__login-btn">\
        <a href="#">Log in</a>\
    </button>';


let toggle = document.querySelector(".toggle");
let login = document.querySelector(".navbar__login-btn");
let links = document.querySelector(".navbar__nav-links");

toggle.addEventListener('click', function() {
    console.log("toggle clicked");
    // toggle class "active" on topNav let
    login.classList.toggle("active__button");
    links.classList.toggle("active");
  }, false);
  
  