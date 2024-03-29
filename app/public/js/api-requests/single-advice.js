async function getAdviceById(adviceId){
    return fetch(`${config.apiAddress}/api/v1/advices/` + adviceId, {
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


async function getPrevAdvice(adviceId) {
    return fetch(`${config.apiAddress}/api/v1/advices/prevadvice/${adviceId}`, {
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

async function getNextAdvice(adviceId) {
    return fetch(`${config.apiAddress}/api/v1/advices/nextadvice/${adviceId}`, {
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