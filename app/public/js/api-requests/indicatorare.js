async function getSigns(signCategoriesID){
    return fetch('http://localhost:3000/api/v1/signs', {
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