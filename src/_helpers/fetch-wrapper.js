import { accountService, alertService } from '../_services';

export const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete,
}

function get(url) {
    
    const requestOptions = {
        method: 'GET',
        headers: authHeader(url)
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
        if ([401, 403,].includes(response.status)) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            accountService.logout();
        }
        if ([429].includes(response.status)) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            accountService.logout();
            alertService.error("TOO MANY REQUESTS... LOGGING OFF");
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