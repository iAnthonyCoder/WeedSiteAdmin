import { fetchWrapper } from '../_helpers';
import { getPrivateApi } from '../_helpers/config';
import { getPublicApi } from '../_helpers/config';
const baseUrl = getPrivateApi+"menuproducts";
const publicBaseUrl = getPublicApi+"menuproducts";
export const menuproductService = {
    getAll,
    getById,
    create,
    update,
    getMyList,
    getAddList,
    deleteFromDispensary,
    delete: _delete,

};


function getAll(query) {
    var fetchParam=""
    if(!query){fetchParam=`${baseUrl}`}
    else{fetchParam=`${baseUrl}${query}`}
    return fetchWrapper.get(fetchParam);
}
function getMyList(query) {
    var fetchParam=""
    if(!query){fetchParam=`${baseUrl}/mylist`}
    else{fetchParam=`${baseUrl}/mylist${query}`}
    return fetchWrapper.get(fetchParam);
}
function getAddList() {
    return fetchWrapper.get(baseUrl+"/addlist");
}
function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function deleteFromDispensary(id) {
    return fetchWrapper.delete(`${baseUrl}/dispensary/${id}`);
}

function getByUserId(id) {
   
    return fetchWrapper.get(`${baseUrl}/user/${id}`)  .then(dispensary => {
        return dispensary;
})}

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)

}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
}
