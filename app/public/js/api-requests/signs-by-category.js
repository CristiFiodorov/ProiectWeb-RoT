function addErrorMessageElement(errorMessage) {
    document.querySelector('.error-message')?.remove();
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-message';
    errorContainer.textContent = errorMessage;
    const form = document.querySelector('form');
    form.insertBefore(errorContainer, form.firstChild);
}

async function getSigns(signCategoriesID) {
    return fetch(`http://localhost:3000/api/v1/${signCategoriesID}/signs`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }
    })
    .then(response => {
        return response.json();
    })
    .then(responseObj => {
        if (responseObj.success) {
            return responseObj.data;
        }
        else {
            throw new Error(responseObj.message);
        }
    })
    .catch(error => {
        console.error(error);
    });
}


function submitAddSignHandler(event) {
    event.preventDefault();
    const title = document.getElementById("form_title").value;
    const description = document.getElementById("form_description").value;
    const img = document.getElementById("form_img").files[0];
    const categoryID = new URLSearchParams(window.location.search).get('categoryID');

    if (!title) {
        addErrorMessageElement("The title field is required");
        return;
    }

    if (!img) {
        addErrorMessageElement("Please upload an image");
        return;
    }

    if(!description) {
        addErrorMessageElement("The description field is required");
        return;
    }

    const formData = new FormData();
    formData.append('file', img);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('parentId', categoryID);


    fetch('http://localhost:3000/api/v1/signs', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        return response.json();
    })
    .then(responseObj => {
        if (responseObj.success) {
            window.location.href = `signs_by_category.html?categoryID=${categoryID}`;
        }
        else {
            throw new Error(responseObj.message);
        }
    })
    .catch(error => {
        addErrorMessageElement(error.message);
    });
}