async function initializeUpdateCourseForm() {
    const categoryID = new URLSearchParams(window.location.search).get('courseID');
    return fetch(`${config.apiAddress}/api/v1/courses/${categoryID}`, {
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
        }
        else {
            throw new Error(responseObj.message);
        }
    });
}

function initializeUpdateChapterForm(chapter) {
    document.getElementById("form_title").value = chapter.title;
}

function submitUpdateCourseHandler(event) {
    event.preventDefault();
    const title = document.getElementById("form_title").value;
    const description = document.getElementById("form_description").value;
    const img = document.getElementById("form_img").files[0];
    const courseId = new URLSearchParams(window.location.search).get('courseID');

    if (!title) {
        addErrorMessageElement("The title field is required");
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

    fetch(`${config.apiAddress}/api/v1/courses/${courseId}`, {
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

function submitDeleteCourseHandler(event) {
    event.preventDefault();
    const courseId = new URLSearchParams(window.location.search).get('courseID');

    fetch(`${config.apiAddress}/api/v1/courses/${courseId}`, {
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
            window.location.href = `courses.html`;
        }
        else {
            throw new Error(responseObj.message);
        }
    })
    .catch(error => {
        alert(error.message);
    });
}

function submitUpdateChapterHandler(event, chapter) {
    event.preventDefault();
    const title = document.getElementById("form_title").value;
    const parentId = new URLSearchParams(window.location.search).get('courseID');

    if (!title) {
        addErrorMessageElement("The title field is required");
        return;
    }

    fetch(`${config.apiAddress}/api/v1/chapters/${chapter._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        },
        body: JSON.stringify({
            title: title,
            parentId: parentId,
        })
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

function submitDeleteChapterHandler(event, chapter) {
    event.preventDefault();
    fetch(`${config.apiAddress}/api/v1/chapters/${chapter._id}`, {
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
            window.location.reload();
        }
        else {
            throw new Error(responseObj.message);
        }
    })
    .catch(error => {
        alert(error.message);
    });
}

function submitAddChapterHandler(event) {
    event.preventDefault();
    const title = document.getElementById("form_title").value;
    const parentId = new URLSearchParams(window.location.search).get('courseID');

    if (!title) {
        addErrorMessageElement("The title field is required");
        return;
    }

    fetch(`${config.apiAddress}/api/v1/chapters`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        },
        body: JSON.stringify({
            title: title,
            parentId: parentId,
        })
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

function uploadContentInChapterHandler(jsonObject, chapter) {
    const chapterId = chapter._id;
    fetch(`${config.apiAddress}/api/v1/chapters/${chapterId}/contents`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        },
        body: JSON.stringify(jsonObject)
    })
    .then(response => {
        return response.json();
    })
    .then(responseObj => {
        if (responseObj.success) {
            window.location.href = `chapter_content.html?chapterID=${chapterId}`;
        }
        else {
            throw new Error(responseObj.message);
        }
    })
    .catch(error => {
        alert(error.message);
    });
}