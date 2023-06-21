function submitDeleteSignHandler(event, chapterId) {
    event.preventDefault();
    return fetch(`${config.apiAddress}/api/v1/chapters/${chapterId}/clear`, {
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
            window.location.reload();
        }
        else {
            throw new Error(responseObj.message);
        }
    });
}

function addParagraphDataToFormData(formData) {
    const description = document.getElementById('form_description').value;
    if(!description) {
        addErrorMessageElement("Paragraful nu poate fi gol");
        return false;
    }
    const allTags = document.querySelectorAll('input[type="checkbox"]');
    const selectedTags = [];
    allTags.forEach(tag => {
        if(tag.checked) {
            selectedTags.push(tag.value);
        }
    });
    formData.append('data', description);
    formData.append('tags', selectedTags);
    return true;
}

function addImageDataToFormData(formData) {
    const img = document.getElementById('form_img').files[0];
    if(!img) {
        addErrorMessageElement("Please upload an image");
        return false;
    }
    formData.append('file', img);
    return true;
}

function addSubsectionDataToFormData(formData) {
    const title = document.getElementById('form_title').value;
    if(!title) {
        addErrorMessageElement("Titlul subsecțiunii nu poate fi gol");
        return false;
    }
    formData.append('data', title);
    return true;
}

function submitAddElementHandler(event, chapterId) {
    event.preventDefault();
    const elementType = document.getElementById('element_type').value;
    const formData = new FormData();
    
    formData.append('elementType', elementType);
    
    let success = true;
    switch(elementType) {
        case "paragraph":
            success = addParagraphDataToFormData(formData);
            break;
        
        case "image":
            success = addImageDataToFormData(formData);
            break;
        
        case "subsection":
            success = addSubsectionDataToFormData(formData);
            break;
    }

    if(!success) {
        return;
    }

    fetch(`${config.apiAddress}/api/v1/chapters/${chapterId}/contents/append`, {
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
            window.location.reload();
        }
        else {
            throw new Error(responseObj.message);
        }
    })
    .catch(error => {
        addErrorMessageElement(error.message);
    });
}