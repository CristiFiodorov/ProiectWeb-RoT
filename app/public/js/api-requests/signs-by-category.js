async function getSigns(signCategoriesID) {
    return fetch(`${config.apiAddress}/api/v1/${signCategoriesID}/signs`, {
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