function addUsernameNotMatchedMessageElement(errorMessage) {
    const errorContainer = document.createElement('div');
    errorContainer.id = 'error-message';
    errorContainer.textContent = errorMessage;
    const confirmUsernameElement = document.getElementById('confirm-username');
    form.insertBefore(errorContainer, confirmUsernameElement.nextSibling);
}

function addEmailNotMatchedMessageElement(errorMessage) {
    const errorContainer = document.createElement('div');
    errorContainer.id = 'error-message';
    errorContainer.textContent = errorMessage;
    const confirmEmailElement = document.getElementById('confirm-email');
    form.insertBefore(errorContainer, confirmEmailElement.nextSibling);
}

function addPasswordNotValidMessageElement(errorMessage) {
    const errorContainer = document.createElement('div');
    errorContainer.id = 'error-message';
    errorContainer.textContent = errorMessage;
    const passwordElement = document.getElementById('password');
    form.insertBefore(errorContainer, passwordElement.nextSibling);
}

function addEmailNotValidMessageElement(errorMessage) {
    const errorContainer = document.createElement('div');
    errorContainer.id = 'error-message';
    errorContainer.textContent = errorMessage;
    const emailElement = document.getElementById('email');
    form.insertBefore(errorContainer, emailElement.nextSibling);
}

function addEmailAlreadyUsedMessageElement(errorMessage) {
    const errorContainer = document.createElement('div');
    errorContainer.id = 'error-message';
    errorContainer.textContent = errorMessage;
    const emailElement = document.getElementById('email');
    form.insertBefore(errorContainer, emailElement.nextSibling);
}

function addUsernameNotValidMessageElement(errorMessage) {
    const errorContainer = document.createElement('div');
    errorContainer.id = 'error-message';
    errorContainer.textContent = errorMessage;
    const usernameElement = document.getElementById('username');
    form.insertBefore(errorContainer, usernameElement.nextSibling);
}   

function addUsernameAlreadyUsedMessageElement(errorMessage) {
    const errorContainer = document.createElement('div');
    errorContainer.id = 'error-message';
    errorContainer.textContent = errorMessage;
    const usernameElement = document.getElementById('username');
    form.insertBefore(errorContainer, usernameElement.nextSibling);
}

function checkIfCredentialsAreMatched(password, email, confirmedPassword, confirmedEmail) {
    let matchedCredentials = true;
    if(confirmedPassword !== password) {
        addUsernameNotMatchedMessageElement("Parolele nu se potrivesc!");
        matchedCredentials = false;
    }

    if(email !== confirmedEmail) {
        addEmailNotMatchedMessageElement("Email-urile nu se potrivesc!");
        matchedCredentials = false;
    }
    return matchedCredentials;
}

function parseErrorListAndCreateElements(errorList) {
    errorList.forEach(error => {
        if(error.passwordNotValid) {
            addPasswordNotValidMessageElement(error.passwordNotValid);
        }
        if(error.emailNotValid) {
            addEmailNotValidMessageElement(error.emailNotValid);
        }
        if(error.emailAlreadyUsed) {
            addEmailAlreadyUsedMessageElement(error.emailAlreadyUsed);
        }
        if(error.usernameNotValid) {
            addUsernameNotValidMessageElement(error.usernameNotValid);
        }
        if(error.usernameAlreadyUsed) {
            addUsernameAlreadyUsedMessageElement(error.usernameAlreadyUsed);
        }
        if(error.dbError) {
            addDbErrorMessageElement(error.dbError);
        }
    });
}

function handleFormSubmission(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    const confirmedPassword = document.getElementById("confirm_password").value;
    const confirmedEmail = document.getElementById("confirm_email").value;

    if(!checkIfCredentialsAreMatched(password, email, confirmedPassword, confirmedEmail)) {
        return;
    }
    
    fetch("http://localhost:3000/api/v1/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })
    })
    .then(response => {
        if(!response.ok) {
            return response.text().then(errorText => {
                throw new Error(errorText);
            });
        }
    })
    .catch(error => {
        parseErrorListAndCreateElements(JSON.parse(error.message));
    });

}