function extractPayloadFromJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function userIsAdmin() {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        return false;
    }
    const payload = extractPayloadFromJwt(token);
    return payload.isAdmin;
}