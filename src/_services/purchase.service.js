import { fetchWrapper } from '../_helpers';
import { getPrivateApi } from '../_helpers/config';

const baseUrl = getPrivateApi+"purchases";

export const purchaseService = {
    getAll,
    getById,
    create,
    update,
    getAllPending,
    getByUserId,
    delete: _delete,
};


function getAll(query) {
    var fetchParam=""
    if(!query){fetchParam=`${baseUrl}`}
    else{fetchParam=`${baseUrl}${query}`}
    return fetchWrapper.get(fetchParam);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}
function getAllPending(query) {
    var fetchParam=""
    if(!query){fetchParam=`${baseUrl}/pending`}
    else{fetchParam=`${baseUrl}/pending${query}`}
    return fetchWrapper.get(fetchParam);
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
}

function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
}
