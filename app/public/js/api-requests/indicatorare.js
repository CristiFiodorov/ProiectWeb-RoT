async function getSigns(signCategoriesID){
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
        if(responseObj.success){
            return responseObj.data;
        }
        else{
            throw new Error(responseObj.message);
        }
    })
    .catch(error => {
        console.error(error);
    });
}

async function uploadImage(imageFile) {
    const formData = new FormData();
    formData.append('file', imageFile);

    return fetch('http://localhost:3000/api/v1/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        return response.json();
    })
    .then(responseObj => {
        if(responseObj.success){
            return responseObj.data;
        }
        else{
            throw new Error(responseObj.message);
        }
    })
    .catch(error => {
        console.error(error);
    });
}