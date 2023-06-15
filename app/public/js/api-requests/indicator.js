async function getSign(signID){
    return fetch('http://localhost:3000/api/v1/sign', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }
    })
    .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            return response.text().then(errorText => {
                throw new Error(errorText);
            });
        }
    })
}

async function getPrevSign(signId, categoryId) {
    return fetch(`http://localhost:3000/api/v1/prevsign`)
      .then(response => response.json())
      .catch(error => console.error(error));
}

async function getNextSign(signId, categoryId) {
    return fetch(`http://localhost:3000/api/v1/nextsign`)
      .then(response => response.json())
      .catch(error => console.error(error));
}