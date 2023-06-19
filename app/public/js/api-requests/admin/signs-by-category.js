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


    fetch(`${config.apiAddress}/api/v1/signs`, {
        method: 'POST',
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

async function initializeUpdateSignCategoryForm() {
    const categoryID = new URLSearchParams(window.location.search).get('categoryID');
    return fetch(`${config.apiAddress}/api/v1/signcategories/${categoryID}`, {
        method: 'GET'
    })
    .then(response => {
        return response.json();
    })
    .then(responseObj => {
        if (responseObj.success) {
            const responseData = responseObj.data;
            document.getElementById("form_title").value = responseData.title;
            return responseData.parentId;
        }
        else {
            throw new Error(responseObj.message);
        }
    });
}

function submitUpdateSignCategoryHandler(event) {
    event.preventDefault();
    const title = document.getElementById("form_title").value;
    const img = document.getElementById("form_img").files[0];

    const categoryID = new URLSearchParams(window.location.search).get('categoryID');

    if (!title) {
        addErrorMessageElement("The title field is required");
        return;
    }

    const formData = new FormData();
    if(img) {
        formData.append('file', img);
    }
    formData.append('title', title);
    // TODO: solve description issue for categories
    formData.append('description', 'modified description');

    fetch(`${config.apiAddress}/api/v1/signcategories/${categoryID}`, {
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
            window.location.href = `sign_categories.html`;
        }
        else {
            throw new Error(responseObj.message);
        }
    })
    .catch(error => {
        addErrorMessageElement(error.message);
    });
}

function submitDeleteSignCategoryHandler(event) {
    event.preventDefault();
    const categoryID = new URLSearchParams(window.location.search).get('categoryID');

    fetch(`${config.apiAddress}/api/v1/signcategories/${categoryID}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }
    })
    .then(response => {
        return response.json();
    })
    .then(responseObj => {
        if (responseObj.success) {
            window.location.href = `sign_categories.html`;
        }
        else {
            throw new Error(responseObj.message);
        }
    })
    .catch(error => {
        alert(error.message);
    });
}