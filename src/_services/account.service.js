import { BehaviorSubject } from 'rxjs';
import { getPrivateApi, getPublicApi } from './../_helpers/config'

import { fetchWrapper, history } from '../_helpers';

const userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')));

const baseUrl = getPublicApi;
const accountUrl = getPrivateApi+"users";

export const accountService = {
    login,
    logout,
    register,
    verifyEmail,
    forgotPassword,
    validateResetToken,
    resetPassword,
    getAll,
    getById,
    resendToken,
    fixpassword,
    updateOwn,
    create,
    update,
    delete: _delete,
    updateIsActive,
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value }
};

function login(email, password) {
    return fetchWrapper.post(`${baseUrl}auth/login`, { email, password })
    .then(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        
        // publish user to subscribers
        userSubject.next(user);
        
        return user;
    });
}

function logout() {
    // remove user from local storage and publish null to user subject
    localStorage.removeItem('user');
    userSubject.next(null);
    history.push('/account/login');
}

function resendToken(params) {
    return fetchWrapper.post(`${baseUrl}auth/resend`, params)
}

function register(params) {
    return fetchWrapper.post(`${baseUrl}auth/signup`, params);
}

function verifyEmail(token) {
    return fetchWrapper.post(`${baseUrl}auth/verify/${token}`);
}

function forgotPassword(email) {
    return fetchWrapper.post(`${baseUrl}password/forgot-password`, { email });
}

function validateResetToken(token) {
    return fetchWrapper.post(`${baseUrl}password/validate-token`, { token });
}

function resetPassword(token, password) {
    return fetchWrapper.post(`${baseUrl}password/reset`, { token, password });
}

function getAll(query) {
    var fetchParam=""
    if(!query){fetchParam=`${accountUrl}`}
    else{fetchParam=`${accountUrl}${query}`}
    return fetchWrapper.get(fetchParam);
}



function getById(id) {
    return fetchWrapper.get(`${accountUrl}/${id}`);
}

function create(params) {
    return fetchWrapper.post(accountUrl, params);
}

function updateOwn(id, params) {
    
    return fetchWrapper.put(`${accountUrl}/own/${id}`, params)
    .then(user => { 
        // update stored user if the logged in user updated their own record
        if (user._id === userSubject.value._id) {
            
            // update local storage
            user = { ...userSubject.value, ...user };
            
            localStorage.setItem('user', JSON.stringify(user));
            
            // publish updated user to subscribers
            userSubject.next(user);
        }
        return user;
    });
}

function update(id, params) {
    
    return fetchWrapper.putUserImg(`${accountUrl}/${id}`, params)
    .then(user => { 
        // update stored user if the logged in user updated their own record
        if (user._id === userSubject.value._id) {
            
            // update local storage
            user = { ...userSubject.value, ...user };
            
            localStorage.setItem('user', JSON.stringify(user));
            
            // publish updated user to subscribers
            userSubject.next(user);
        }
        return user;
    });
}



function updateIsActive(id, params) {
    return fetchWrapper.put(`${accountUrl}/${id}`, params)
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${accountUrl}/${id}`)
}



function fixpassword(email) {
    const params = {email:email}
    return fetchWrapper.put(`${accountUrl}/fixpassword/${email}`, params)
}