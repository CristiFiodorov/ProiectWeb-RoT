function extractPayloadFromJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

const token = localStorage.getItem('accessToken');

if(token){
    const payload = extractPayloadFromJwt(token);

    if(payload.exp < Date.now() / 1000){
        localStorage.removeItem('accessToken');
    }
}