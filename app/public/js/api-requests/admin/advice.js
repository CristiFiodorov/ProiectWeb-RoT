function submitAddSingleAdviceHandler(event) {
    event.preventDefault();
    const title = document.getElementById("form_title").value;
    const img = document.getElementById("form_img").files[0];
    const description = document.getElementById("form_description").value;

    if (!title) {
        addErrorMessageElement("Titlul este obligatoriu");
        return;
    }

    if (!img) {
        addErrorMessageElement("Încărcarea imaginii este obligatorie");
        return;
    }

    if(!description) {
        addErrorMessageElement("Descrierea este obligatorie");
        return;
    }

    if(description.includes('<script>') || title.includes('<script>')) {
        addErrorMessageElement("Nu sunt permise scripturi!");
        return;
    }

    const formData = new FormData();
    formData.append('file', img);
    formData.append('title', title);
    formData.append('description', description);

    fetch(`${config.apiAddress}/api/v1/advices`, {
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
            window.location.href = 'advice.html';
        }
        else {
            throw new Error(responseObj.message);
        }
    })
    .catch(error => {
        addErrorMessageElement(error.message);
    });
}