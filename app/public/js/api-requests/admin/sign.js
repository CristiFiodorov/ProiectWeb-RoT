function addErrorMessageElement(errorMessage) {
    document.querySelector('.error-message')?.remove();
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-message';
    errorContainer.textContent = errorMessage;
    const form = document.querySelector('form');
    form.insertBefore(errorContainer, form.firstChild);
}

async function initializeUpdateSignFormAndGetParentId() {
    const signID = new URLSearchParams(window.location.search).get('indicatorID');
    return fetch(`http://localhost:3000/api/v1/signs/${signID}`, {
        method: 'GET'
    })
    .then(response => {
        return response.json();
    })
    .then(responseObj => {
        if (responseObj.success) {
            const responseData = responseObj.data;
            document.getElementById("form_title").value = responseData.title;
            document.getElementById("form_description").value = responseData.description;
            return responseData.parentId;
        }
        else {
            throw new Error(responseObj.message);
        }
    });
}

function submitUpdateSignHandler(event, parentId) {
    event.preventDefault();
    const title = document.getElementById("form_title").value;
    const description = document.getElementById("form_description").value;
    const img = document.getElementById("form_img").files[0];
    const signID = new URLSearchParams(window.location.search).get('indicatorID');

    if (!title) {
        addErrorMessageElement("The title field is required");
        return;
    }

    if(!description) {
        addErrorMessageElement("The description field is required");
        return;
    }

    const formData = new FormData();
    if(img) {
        formData.append('file', img);
    }
    formData.append('title', title);
    formData.append('description', description);
    formData.append('parentId', parentId);

    fetch(`http://localhost:3000/api/v1/signs/${signID}`, {
        method: 'PUT',
        body: formData
    })
    .then(response => {
        return response.json();
    })
    .then(responseObj => {
        if (responseObj.success) {
            location.reload();
        }
        else {
            throw new Error(responseObj.message);
        }
    })
    .catch(error => {
        addErrorMessageElement(error.message);
    });
} 