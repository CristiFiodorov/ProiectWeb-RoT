import { baseURL } from "./const.js";

const form = document.querySelector('form');
const emailField = document.getElementById('email');

emailField.addEventListener('input', function () {
    document.querySelector('.error-message-auth')?.remove();
});

function addErrorMessageAfterElement(errorMessage) {
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-message-auth';
    errorContainer.textContent = errorMessage;
    const form = document.querySelector('form');
    const h2Element = form.querySelector('h2');
    form.insertBefore(errorContainer, h2Element.nextSibling);
}

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
  

form.addEventListener('submit', async (event) =>{
    event.preventDefault();
    const email = emailField.value;
    console.log(email);
    if(!validateEmail(email)){
        addErrorMessageAfterElement("Email invalid", 'email')
        return;
    }

    try {
        const request = await fetch(baseURL + `/api/v1/forgot/${email}`);
        const response = await request.json();
        if(response?.success === false){
            console.log("ERROR");
            addErrorMessageAfterElement("Utilizator inexistent", 'email')
            return;
        }
        console.log(response);
        window.location.href = 'password-success.html';
        return response?.data;
    } catch(error){
        console.log(error);
    }

});