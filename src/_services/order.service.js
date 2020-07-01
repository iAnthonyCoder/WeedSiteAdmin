import { fetchWrapper, history } from '../_helpers';
import { getPrivateApi } from '../_helpers/config';

const baseUrl = getPrivateApi+"productorders";


export const orderService = {
    getAll,
    getById,
    create,
    update,
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

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
}
