function addErrorMessageElement(errorMessage) {
    document.getElementById('error-message-auth')?.remove();
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-message-auth';
    errorContainer.textContent = errorMessage;
    const form = document.querySelector('form');
    const h2Element = form.querySelector('h2');
    form.insertBefore(errorContainer, h2Element.nextSibling);
}

function handleFormSubmission(event) {
    event.preventDefault();

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
        if(response.ok) {
            return response.json();
        } else {
            return response.text().then(errorText => {
                throw new Error(errorText);
            });
        }
    })
    .then(responseData => {
        // set jwt token in local storage 
        localStorage.setItem('accessToken', responseData.accessToken);
        // redirect to home page
        window.location.href = '/app/views/index.html';
    })
    .catch(error => {
        // log the message with the red color above username 
        addErrorMessageElement(error.message);
    });
}