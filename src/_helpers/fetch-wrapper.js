import { accountService, alertService } from '../_services';

export const fetchWrapper = {
    get,
    post,
    put,
    postMulti,
    delete: _delete,
    postMultiBrand,
    putBrandWithImage,
    putMulti,
    putUserImg,
    postMultiPurchase
}

function get(url) {
    
    const requestOptions = {
        method: 'GET',
        headers: authHeader(url)
    };
    return fetch(url, requestOptions).then(handleResponse);
}


function postMulti(url, body) {
    const formData = new FormData();
    formData.append("name", body.name);
    formData.append("category", body.category);
    formData.append("brand", body.brand);
    formData.append("picture", body.picture);
    formData.append("description", body.description);
    formData.append("_id", body._id)
    formData.append("slug", body.slug)
    const requestOptions = {
        method: 'POST',
        headers: {  ...authHeader(url) },
        body:formData
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function putMulti(url, body) {

    const formData = new FormData();
    formData.append("name", body.name);
    formData.append("category", body.category);
    formData.append("brand", body.brand);
    formData.append("picture", body.picture);
    formData.append("description", body.description);
    formData.append("_id", body._id)
    formData.append("slug", body.slug)
    const requestOptions = {
        method: 'PUT',
        headers: {  ...authHeader(url) },
        body:formData
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function postMultiBrand(url, body) {
    const formData = new FormData();
    formData.append("name", body.name);
    formData.append("picture", body.picture);
    formData.append("description", body.description);
    formData.append("slug", body.slug)
    const requestOptions = {
        method: 'POST',
        headers: {  ...authHeader(url) },
        body:formData
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function postMultiPurchase(url, body) {

    const formData = new FormData();
    formData.append("date", body.date);
    formData.append("reference", body.reference);
    formData.append("method", body.method);
    formData.append("amount", body.amount);
    formData.append("picture", body.picture);
    formData.append("plan", body.plan)
    const requestOptions = {
        method: 'POST',
        headers: {  ...authHeader(url) },
        body:formData
    };
    return fetch(url, requestOptions).then(handleResponse);
}






function putUserImg(url, body) {
   
    const formData = new FormData();

    formData.append("email", body.email);
    formData.append("name", body.name);
    formData.append("birthdate", body.birthdate);
    formData.append("password", body.password)
    formData.append("newPassword", body.newPassword)
    formData.append("confirmPassword", body.confirmPassword)
    formData.append("picture", body.picture)
    const requestOptions = {
        method: 'PUT',
        headers: {  ...authHeader(url) },
        body:formData
    };
    return fetch(url, requestOptions).then(handleResponse);
}



function putBrandWithImage(url, body) {
   
    const formData = new FormData();

    formData.append("name", body.name);
    formData.append("picture", body.picture);
    formData.append("description", body.description);
    formData.append("slug", body.slug)
    const requestOptions = {
        method: 'PUT',
        headers: {  ...authHeader(url) },
        body:formData
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body) {

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);    
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(url)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const user = accountService.userValue;
    const isLoggedIn = user && user.token;
    // const isApiUrl = url.startsWith("http://localhost/3000/api");
    
    if (isLoggedIn) {
        return { Authorization: `Bearer ${user.token}` };
    } else {
        return {};
    }
}

function handleResponse(response) {
  
    
    if (!response.ok){
        if ([401, 403].includes(response.status)) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            accountService.logout();
        }
    }
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            
            const error = (data && data.message) || response.statusText;
            alertService.error(error);
            return Promise.reject(error);
        } 
        return data;
    });
}