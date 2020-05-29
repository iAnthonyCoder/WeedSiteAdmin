import { fetchWrapper, history } from '../_helpers';
import { getPrivateApi } from '../_helpers/config';

const baseUrl = getPrivateApi+"parentcategories";


export const parentcategoryService = {
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
}

function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
        
}
