function addErrorMessageElement(errorMessage) {
    document.querySelector('.error-message')?.remove();
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-message';
    errorContainer.textContent = errorMessage;
    const form = document.querySelector('form');
    form.insertBefore(errorContainer, form.firstChild);
}

function submitAddSignCategoryHandler(event) {
    event.preventDefault();
    const title = document.getElementById("form_title").value;
    const img = document.getElementById("form_img").files[0];

    if (!title) {
        addErrorMessageElement("The title field is required");
        return;
    }

    if (!img) {
        addErrorMessageElement("Please upload an image");
        return;
    }

    const formData = new FormData();
    formData.append('file', img);
    formData.append('title', title);
    formData.append('description', null);

    fetch('http://localhost:3000/api/v1/signcategories', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        return response.json();
    })
    .then(responseObj => {
        if (responseObj.success) {
            window.location.href = 'sign_categories.html';
        }
        else {
            throw new Error(responseObj.message);
        }
    })
    .catch(error => {
        addErrorMessageElement(error.message);
    });
}