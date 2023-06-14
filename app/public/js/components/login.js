var form = document.querySelector('form');
form.addEventListener('submit', handleFormSubmission);

var usernameField = document.getElementById('username');
var passwordField = document.getElementById('password');

usernameField.addEventListener('input', function () {
    document.getElementById('error-message')?.remove();
});

passwordField.addEventListener('input', function () {
    document.getElementById('error-message')?.remove();
});