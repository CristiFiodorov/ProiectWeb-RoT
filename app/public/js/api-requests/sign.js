async function getSign(signID){
    return fetch(`${config.apiAddress}/api/v1/signs/${signID}`, {
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

async function getPrevSign(signId, categoryId) {
    return fetch(`${config.apiAddress}/api/v1/signs/prevsign/${signId}/${categoryId}`,{
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

async function getNextSign(signId, categoryId) {
    return fetch(`${config.apiAddress}/api/v1/signs/nextsign/${signId}/${categoryId}`, {
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

async function deleteSign(signId) {
    return fetch(`${config.apiAddress}/api/v1/signs/${signId}`, {
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
            return responseObj.data;
        }
        else {
            throw new Error(responseObj.message);
        }
    });
}