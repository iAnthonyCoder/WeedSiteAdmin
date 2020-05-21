import { fetchWrapper, history } from '../_helpers';
import { getApi } from '../_helpers/config';

const baseUrl = getApi+"schedules";


export const scheduleService = {
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
   
    return fetchWrapper.get(`${baseUrl}/user/${id}`)}

function create(params) {
 
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {

    return fetchWrapper.put(`${baseUrl}/${id}`, params);
}

function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
}
