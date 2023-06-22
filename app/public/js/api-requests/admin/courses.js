function submitAddCourseHandler(event) {
    event.preventDefault();
    const title = document.getElementById("form_title").value;
    const description = document.getElementById("form_description").value;
    const img = document.getElementById("form_img").files[0];

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


    fetch(`${config.apiAddress}/api/v1/courses`, {
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
            window.location.href = `courses.html`;
        }
        else {
            throw new Error(responseObj.message);
        }
    })
    .catch(error => {
        addErrorMessageElement(error.message);
    });
}