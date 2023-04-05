let nav = document.getElementById("navContainer")
nav.innerHTML = '\
<div>\
<img src="/assets/hamb.png" class="toggle"></img>\
<nav id="navbar" class="nav nav--top">\
    <ul class="flex flex-row justify-center">\
        <li><a href="#">Link</a></li>\
        <li><a href="#">Link</a></li>\
        <li><a href="#">Link</a></li></ul>\
</nav>\
</div>';


let toggle = document.querySelector(".toggle");
let topNav = document.querySelector(".nav--top");

toggle.addEventListener('click', function() {
    console.log("toggle clicked");
    // toggle class "active" on topNav let
    topNav.classList.toggle("active");
  }, false);
  
  