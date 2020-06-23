import { fetchWrapper } from '../_helpers';
import { getPrivateApi } from '../_helpers/config';

const baseUrl = getPrivateApi+"packages";


export const packageService = {
    getAll,
    getById,
    create,
    update,
    getByUserId,
    delete: _delete,
    getAllByProductId
};




function getAll() {

    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function getAllByProductId(id) {
    return fetchWrapper.get(`${baseUrl}/product/${id}`);
}

function getByUserId(id) {
   
    return fetchWrapper.get(`${baseUrl}/user/${id}`)
}

function create(params) {
 
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
    console.log(params)
    return fetchWrapper.put(`${baseUrl}/${id}`, params)

}

function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
