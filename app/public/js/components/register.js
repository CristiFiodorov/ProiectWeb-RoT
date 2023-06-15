var form = document.querySelector('form');
form.addEventListener('submit', handleFormSubmission);

var usernameField = document.getElementById('username');
var passwordField = document.getElementById('password');
var emailField = document.getElementById('email');
var confirmPasswordField = document.getElementById('confirm_password');
var confirmEmailField = document.getElementById('confirm_email');

function isDivTag(domElement) {
    if(!domElement.tagName) {
        return false;
    }
    return domElement.tagName.toLowerCase() === 'div';
}

usernameField.addEventListener('input', function () {
    const nextSibling = usernameField.nextSibling;
    if (isDivTag(nextSibling)) {
        nextSibling.remove();
    }
});

passwordField.addEventListener('input', function () {
    const nextSibling = passwordField.nextSibling;
    if (isDivTag(nextSibling)) {
        nextSibling.remove();
    }
});

emailField.addEventListener('input', function () {
    const nextSibling = emailField.nextSibling;
    if (isDivTag(nextSibling)) {
        nextSibling.remove();
    }
});

confirmPasswordField.addEventListener('input', function () {
    const nextSibling = confirmPasswordField.nextSibling;
    if (isDivTag(nextSibling)) {
        nextSibling.remove();
    }
});

confirmEmailField.addEventListener('input', function () {
    const nextSibling = confirmEmailField.nextSibling;
    if (isDivTag(nextSibling)) {
        nextSibling.remove();
    }
});