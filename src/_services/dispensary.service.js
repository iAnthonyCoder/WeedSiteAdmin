import { fetchWrapper, history } from '../_helpers';
import { BehaviorSubject } from 'rxjs';
import { getPrivateApi } from '../_helpers/config';
const baseUrl = getPrivateApi+"dispensaries";
const dispensarySubject = new BehaviorSubject(JSON.parse(localStorage.getItem('dispensary')));

export const dispensaryService = {
    getAll,
    getById,
    create,
    update,
    getByUserId,
    delete: _delete,
    dispensary: dispensarySubject.asObservable(),
    get dispensaryValue () { return dispensarySubject.value }
};




function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function getByUserId(id) {
   
    return fetchWrapper.get(`${baseUrl}/user/${id}`)  .then(dispensary => {
        return dispensary;
})}

function create(params) {
    console.log(params)
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {

    return fetchWrapper.put(`${baseUrl}/${id}`, params)
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
}
