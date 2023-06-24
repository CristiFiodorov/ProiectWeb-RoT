function addErrorMessageAfterElement(errorMessage, elementId) {
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-message-auth';
    errorContainer.textContent = errorMessage;
    const form = document.querySelector('form');
    const correspondingElement = document.getElementById(elementId);
    form.insertBefore(errorContainer, correspondingElement.nextSibling);
}

function checkIfCredentialsAreMatched(password, email, confirmedPassword, confirmedEmail) {
    let matchedCredentials = true;
    if(confirmedPassword !== password) {
        addErrorMessageAfterElement("Parolele nu se potrivesc", "confirm_password");
        matchedCredentials = false;
    }

    if(email !== confirmedEmail) {
        addErrorMessageAfterElement("Email-urile nu se potrivesc", "confirm_email");
        matchedCredentials = false;
    }
    return matchedCredentials;
}

function parseErrorListAndCreateElements(errorList) {
    errorList.forEach(error => {
        if(error.passwordNotValid) {
            addErrorMessageAfterElement(error.passwordNotValid, "password");
        }
        if(error.emailNotValid) {
            addErrorMessageAfterElement(error.emailNotValid, "email");
        }
        if(error.emailAlreadyUsed) {
            addErrorMessageAfterElement(error.emailAlreadyUsed, "email");
        }
        if(error.usernameNotValid) {
            addErrorMessageAfterElement(error.usernameNotValid, "username");
        }
        if(error.usernameAlreadyUsed) {
            addErrorMessageAfterElement(error.usernameAlreadyUsed, "username");
        }
        if(error.dbError) {
            console.log(error.dbError);
        }
    });
}

function handleFormSubmission(event) {
    event.preventDefault();

    document.querySelectorAll(".error-message-auth").forEach(element => {
        element.remove();
    });

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    const confirmedPassword = document.getElementById("confirm_password").value;
    const confirmedEmail = document.getElementById("confirm_email").value;
    
    if(!checkIfCredentialsAreMatched(password, email, confirmedPassword, confirmedEmail)) {
        return;
    }

    fetch(`${config.apiAddress}/api/v1/register`, {
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
        return response.json();
    })
    .then(responseObj => {
        if(!responseObj.success) {
            throw new Error(JSON.stringify(responseObj.data));
        } else {
            // everything is ok
            window.location.href = "login.html";
        }
    })
    .catch(error => {
        parseErrorListAndCreateElements(JSON.parse(error.message));
    });
}