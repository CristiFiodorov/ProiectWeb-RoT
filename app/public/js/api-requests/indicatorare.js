async function getSigns(signCategoriesID) {
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

// async function uploadImage(imageFile) {
//     const formData = new FormData();
//     formData.append('file', imageFile);

//     console.log(imageFile);

//     return fetch('http://localhost:3000/api/v1/upload', {
//         method: 'POST',
//         body: formData
//     })
//     .then(response => {
//         return response.json();
//     })
//     .then(responseObj => {
//         if (responseObj.success) {
//             return responseObj.data;
//         }
//         else {
//             throw new Error(responseObj.message);
//         }
//     });
// }

// async function createSign(sign) {
//     return fetch(`http://localhost:3000/api/v1/signs`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(sign)
//     })
//     .then(response => {
//         return response.json();
//     })
//     .then(responseObj => {
//         if (responseObj.success) {
//             return responseObj.data;
//         }
//         else {
//             throw new Error(responseObj.message);
//         }
//     });
// }

function submitAddSignHandler(event) {
    event.preventDefault();
    const title = document.getElementById("form_title").value;
    const description = document.getElementById("form_description").value;
    const img = document.getElementById("form_img").files[0];

    if (!img) {
        alert("Please select an image");
        return;
    }

    if (!title) {
        alert("Please enter a title");
        return;
    }

    const formData = new FormData();
    formData.append('file', img);


    fetch('http://localhost:3000/api/v1/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        return response.json();
    })
    .then(responseObj => {
        if (responseObj.success) {
            console.log(responseObj.data);
        }
        else {
            throw new Error(responseObj.message);
        }
    })
    .catch(error => {
        alert(error.message);
    });
}