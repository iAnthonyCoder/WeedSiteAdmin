import { fetchWrapper } from '../_helpers';
import { getPrivateApi } from '../_helpers/config';

const baseUrl = getPrivateApi+"brands";


export const brandService = {
    getAll,
    getById,
    create,
    update,
    getByUserId,
    getProductsByBrandId,
    delete: _delete,
};


function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function getProductsByBrandId(id) {return fetchWrapper.get(`${baseUrl}/${id}/products/`);}

function getByUserId(id) {
   
    return fetchWrapper.get(`${baseUrl}/user/${id}`).then(category => {
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
