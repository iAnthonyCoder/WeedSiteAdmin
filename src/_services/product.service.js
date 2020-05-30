import { fetchWrapper } from '../_helpers';
import { getPrivateApi } from '../_helpers/config';

const baseUrl = getPrivateApi+"products";

export const productService = {
    getAll,
    getById,
    create,
    update,
    getAllRequest,
    getMyList,
    getAddList,
    deleteFromDispensary,
    delete: _delete,
};




function getAll() {
    return fetchWrapper.get(baseUrl);
}
function getAllRequest() {
    return fetchWrapper.get(baseUrl+"/requests/list");
}
function getMyList() {
    return fetchWrapper.get(baseUrl+"/mylist");
}

function getAddList() {
    return fetchWrapper.get(baseUrl+"/addlist");
}
function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function deleteFromDispensary(id) {
    return fetchWrapper.delete(`${baseUrl}/dispensary/${id}`);
}

function getByUserId(id) {
   
    return fetchWrapper.get(`${baseUrl}/user/${id}`)  .then(dispensary => {
        return dispensary;
})}

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)

}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
}
