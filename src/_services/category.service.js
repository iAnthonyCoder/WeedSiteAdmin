import { fetchWrapper, history } from '../_helpers';
import { getApi } from '../_helpers/config';

const baseUrl = getApi+"categories";


export const categoryService = {
    getAll,
    getById,
    create,
    update,
    getByUserId,
    delete: _delete,
};




function getAll() {

    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function getByUserId(id) {
   
    return fetchWrapper.get(`${baseUrl}/user/${id}`)  .then(category => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        // localStorage.setItem('category', JSON.stringify(category));
        
        // // publish user to subscribers
        // categorySubject.next(category);
        

        return category;
})}

function create(params) {
 
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {

    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(user => {
            // // update stored user if the logged in user updated their own record
            // if (user.id === userSubject.value.id) {
            //     // update local storage
            //     user = { ...userSubject.value, ...user };
            //     localStorage.setItem('user', JSON.stringify(user));

            //     // publish updated user to subscribers
            //     userSubject.next(user);
            // }
            // return user;
        });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
        .then(x => {
            // // auto logout if the logged in user deleted their own record
            // if (id === userSubject.value.id) {
            //     logout();
            // }
            // return x;
        });
}
