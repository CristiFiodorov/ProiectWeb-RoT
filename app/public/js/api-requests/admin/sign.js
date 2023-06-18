function addErrorMessageElement(errorMessage) {
    document.querySelector('.error-message')?.remove();
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-message';
    errorContainer.textContent = errorMessage;
    const form = document.querySelector('form');
    form.insertBefore(errorContainer, form.firstChild);
}

function initializeUpdateSignFormAndGetParentId(currentSign) {
    document.getElementById("form_title").value = currentSign.title;
    document.getElementById("form_description").value = currentSign.description;
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

    fetch(`${config.apiAddress}/api/v1/signs/${signID}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        },
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

async function deleteSign(signId) {
    return fetch(`${config.apiAddress}/api/v1/signs/${signId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }
    })
    .then(response => {
        return response.json();
    })
    .then(responseObj => {
        if(responseObj.success) {
            return responseObj.data;
        }
        else {
            throw new Error(responseObj.message);
        }
    });
}

function submitDeleteSignHandler(event, currentSign) {
    event.preventDefault();    
    deleteSign(currentSign._id)
    .then(() => {
        window.location.href = `signs_by_category.html?categoryID=${currentSign.parentId}`;
    })  
    .catch(error => {
        console.error(error);
    });
}