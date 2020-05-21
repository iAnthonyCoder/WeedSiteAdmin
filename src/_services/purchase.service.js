import { fetchWrapper } from '../_helpers';
import { getApi } from '../_helpers/config';

const baseUrl = getApi+"purchases";


export const purchaseService = {
    getAll,
    getById,
    create,
    update,
    getAllPending,
    getByUserId,
    delete: _delete,
};


function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}
function getAllPending() {

    return fetchWrapper.get(`${baseUrl}/pending`);
}
function getByUserId(id) {
   
    return fetchWrapper.get(`${baseUrl}/user/${id}`)  .then(category => {
        return category;
})}

function create(params) {
    return fetchWrapper.postMultiPurchase(baseUrl, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
}

function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
}
