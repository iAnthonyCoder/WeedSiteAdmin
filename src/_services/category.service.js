import { fetchWrapper, history } from '../_helpers';
import { getPrivateApi } from '../_helpers/config';

const baseUrl = getPrivateApi+"categories";


export const categoryService = {
    getAll,
    getById,
    create,
    update,
    getProductsByCategoryId,
    delete: _delete,
};

function getAll() {return fetchWrapper.get(baseUrl);}

function getById(id) {return fetchWrapper.get(`${baseUrl}/${id}`);}

function getProductsByCategoryId(id) {return fetchWrapper.get(`${baseUrl}/${id}/products/`);}

function create(params) {return fetchWrapper.post(baseUrl, params);}

function update(id, params) {return fetchWrapper.put(`${baseUrl}/${id}`, params)}

function _delete(id) {return fetchWrapper.delete(`${baseUrl}/${id}`)}
