import { BehaviorSubject } from 'rxjs';


import { fetchWrapper, history } from '../_helpers';

const userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')));
const baseUrl = `http://localhost:3000/api`;

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
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value }
};

function login(email, password) {
   
    return fetchWrapper.post(`${baseUrl}/auth/login`, { email, password })
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
    return fetchWrapper.post(`${baseUrl}/auth/signup`, params);
}

function verifyEmail(token) {
    return fetchWrapper.post(`${baseUrl}/auth/verify/${token}`);
}

function forgotPassword(email) {
    return fetchWrapper.post(`${baseUrl}/password/forgot-password`, { email });
}

function validateResetToken(token) {
    return fetchWrapper.post(`${baseUrl}/password/validate-token`, { token });
}

function resetPassword(token, password) {
    console.log(token+"asdasd")
    return fetchWrapper.post(`${baseUrl}/password/reset`, { token, password });
}

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(user => {
            // update stored user if the logged in user updated their own record
            if (user.id === userSubject.value.id) {
                // update local storage
                user = { ...userSubject.value, ...user };
                localStorage.setItem('user', JSON.stringify(user));

                // publish updated user to subscribers
                userSubject.next(user);
            }
            return user;
        });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
        .then(x => {
            // auto logout if the logged in user deleted their own record
            if (id === userSubject.value.id) {
                logout();
            }
            return x;
        });
}
