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
            return responseData.parentId;
        }
        else {
            throw new Error(responseObj.message);
        }
    });
}