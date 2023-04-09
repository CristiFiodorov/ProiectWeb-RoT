let nav = document.getElementById("navbar")
nav.innerHTML = '\
    <div class="navbar__logo-nav-links">\
        <div class="navbar__logo-div">\
            <div class="navbar__logo-div__container">\
                <a href="index.html"><img src="../images/logo-dark.png" alt="Your Logo" class="navbar__logo"></a>\
                <img src="../images/hamb.png" class="toggle"></img>\
            </div>\
        </div>\
        <ul class="navbar__nav-links">\
            <li><a class="navbar__link" href="index.html">Acasa</a></li>\
            <li><a class="navbar__link" href="categorii_cursuri.html">Cursuri</a></li>\
            <li><a class="navbar__link" href="tipuri_indicatoare.html">Indicatoare</a></li>\
            <li><a class="navbar__link" href="sfaturi.html">Sfaturi</a></li>\
            <li><a class="navbar__link" href="teste.html">Teste</a></li>\
            <li><a class="navbar__link" href="clasament.html">Clasament</a></li>\
        </ul>\
    </div>\
\
    <a class="navbar__login-link" href="login.html">\
        <button class="navbar__login-btn">\
            Log in\
        </button>\
    </a>';


let toggle = document.querySelector(".toggle");
let login = document.querySelector(".navbar__login-btn");
let links = document.querySelector(".navbar__nav-links");

let current_url = document.location;

document.querySelectorAll(".navbar__link").forEach(function(e){
    if(e.href == current_url){
       e.classList += " navbar__link--clicked";
    }
 });

toggle.addEventListener('click', function() {
    console.log("toggle clicked");
    // toggle class "active" on topNav let
    login.classList.toggle("active__button");
    links.classList.toggle("active");
  }, false);
  
  