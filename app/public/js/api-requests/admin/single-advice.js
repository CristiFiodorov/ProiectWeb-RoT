async function deleteAdvice(adviceID) {
    return fetch(`${config.apiAddress}/api/v1/advices/${adviceID}`, {
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
            return responseObj.data;
        }
        else {
            throw new Error(responseObj.message);
        }
    });
}

function submitDeleteSingleAdviceHandler(event, currentAdvice) {
    event.preventDefault();
    const adviceID = currentAdvice._id;
    deleteAdvice(adviceID)
    .then(() => {
        window.location.href = `advice.html`;
    })  
    .catch(error => {
        console.error(error);
    });
}

function initializeUpdateSingleAdviceForm(currentAdvice) {
    document.getElementById("form_title").value = currentAdvice.title;
    document.getElementById("form_description").value = currentAdvice.description;
}

function submitUpdateSingleAdviceHandler(event) {
    event.preventDefault();
    const title = document.getElementById("form_title").value;
    const description = document.getElementById("form_description").value;
    const img = document.getElementById("form_img").files[0];
    const adviceID = new URLSearchParams(window.location.search).get('id');

    if (!title) {
        addErrorMessageElement("Titlul este obligatoriu!");
        return;
    }

    if(!description) {
        addErrorMessageElement("Descrierea este obligatorie!");
        return;
    }

    if(description.includes('<script>') || title.includes('<script>')) {
        addErrorMessageElement("Nu sunt permise scripturi!");
        return;
    }

    const formData = new FormData();
    if(img) {
        formData.append('file', img);
    }
    formData.append('title', title);
    formData.append('description', description);

    fetch(`${config.apiAddress}/api/v1/advices/${adviceID}`, {
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