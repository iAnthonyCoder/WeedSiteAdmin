import { fetchWrapper, history } from '../_helpers';
import { getApi } from '../_helpers/config';

const baseUrl = getApi+"subscriptions";


export const subscriptionService = {
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
        return category;
})}

function create(params) {
 
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {

    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(user => {
        });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
        .then(x => {
        });
}
