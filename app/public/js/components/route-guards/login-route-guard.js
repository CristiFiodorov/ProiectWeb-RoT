const token = localStorage.getItem('accessToken');

if(token) {
    window.location.href = '/app/views/index.html';
}