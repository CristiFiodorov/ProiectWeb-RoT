async function getPrevChapter(chapterId, courseId) {
    return fetch(`${config.apiAddress}/api/v1/chapters/prevchapter/${chapterId}/${courseId}`, {
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


async function getNextChapter(chapterId, courseId) {
    return fetch(`${config.apiAddress}/api/v1/chapters/nextchapter/${chapterId}/${courseId}`, {
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


async function getChapter(chapterId) {
    return fetch(`${config.apiAddress}/api/v1/chapters/${chapterId}`, {
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

async function getChapterContent(chapterId) {
    return fetch(`${config.apiAddress}/api/v1/chapters/${chapterId}/contents`, {
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