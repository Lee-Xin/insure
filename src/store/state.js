
let token = '';

if (token === '' && localStorage.getItem('token')){
    token = localStorage.getItem('token');
}

export default {
    token
}