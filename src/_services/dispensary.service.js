import { fetchWrapper, history } from '../_helpers';
import { BehaviorSubject } from 'rxjs';
import { getPrivateApi } from '../_helpers/config';
const baseUrl = getPrivateApi+"dispensaries";
const dispensarySubject = new BehaviorSubject(JSON.parse(localStorage.getItem('dispensary')));

export const dispensaryService = {
    getAll,
    getById,
    create,
    update,
    getByUserId,
    delete: _delete,
    dispensary: dispensarySubject.asObservable(),
    get dispensaryValue () { return dispensarySubject.value }
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

function getByUserId(id) {
   
    return fetchWrapper.get(`${baseUrl}/user/${id}`)  .then(dispensary => {
        return dispensary;
})}

function create(params) {
    delete params.opens_ata
    delete params.closes_ata
    delete params.opens_ata_type
    delete params.closes_ata_type
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {

    return fetchWrapper.put(`${baseUrl}/${id}`, params)
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
}
