import { BehaviorSubject } from 'rxjs';
import { getApi } from './../_helpers/config'

import { fetchWrapper, history } from '../_helpers';

const userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')));

const baseUrl = getApi;
const accountUrl = getApi+"users";

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
    create,
    update,
    delete: _delete,
    updateIsActive,
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value }
};

function login(email, password) {
    console.log(`${baseUrl}auth/login`)
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




function getAll() {
    return fetchWrapper.get(accountUrl);
}

function getById(id) {
    return fetchWrapper.get(`${accountUrl}/${id}`);
}

function create(params) {
    return fetchWrapper.post(accountUrl, params);
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
