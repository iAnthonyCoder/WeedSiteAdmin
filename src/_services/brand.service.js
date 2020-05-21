import { fetchWrapper, history } from '../_helpers';
import { getApi } from '../_helpers/config';

const baseUrl = getApi+"brands";


export const brandService = {
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
    return fetchWrapper.postMultiBrand(baseUrl, params);
}

function update(id, params) {
    return fetchWrapper.putBrandWithImage(`${baseUrl}/${id}`, params)
}

function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
}
