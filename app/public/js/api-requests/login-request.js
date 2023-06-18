function addErrorMessageElement(errorMessage) {
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-message-auth';
    errorContainer.textContent = errorMessage;
    const form = document.querySelector('form');
    const h2Element = form.querySelector('h2');
    form.insertBefore(errorContainer, h2Element.nextSibling);
}

function handleFormSubmission(event) {
    event.preventDefault();
    
    document.querySelector(".error-message-auth")?.remove();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const inpData = {
        username: username,
        password: password
    }

    fetch('http://localhost:3000/api/v1/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(inpData)
    })
    .then(response => {
        return response.json();
    })
    .then(responseObj => {
        // set jwt token in local storage
        if(!responseObj.success) {
            throw new Error(responseObj.message);
        }
        const responseData = responseObj.data;
        localStorage.setItem('accessToken', responseData.accessToken);
        // redirect to home page
        window.location.href = 'index.html';
    })
    .catch(error => {
        // log the message with the red color above username 
        addErrorMessageElement(error.message);
    });
}