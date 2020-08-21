import { fetchWrapper } from '../_helpers';
import { getPrivateApi } from '../_helpers/config';
import { getPublicApi } from '../_helpers/config';
const baseUrl = getPrivateApi+"products";
const publicBaseUrl = getPublicApi+"products";
export const productService = {
    getAll,
    getById,
    create,
    update,
    getAllRequest,
    getMyList,
    getAddList,
    deleteFromDispensary,
    delete: _delete,
    getAllFixPicture,
    fixPicture
};


function getAll(query) {
    var fetchParam=""
    if(!query){fetchParam=`${baseUrl}`}
    else{fetchParam=`${baseUrl}${query}`}
    return fetchWrapper.get(fetchParam);
}
function getAllRequest(query) {
    var fetchParam=""
    if(!query){fetchParam=`${baseUrl}/requests/list`}
    else{fetchParam=`${baseUrl}/requests/list${query}`}
    return fetchWrapper.get(fetchParam);
}
function getAllFixPicture(query) {
    var fetchParam=""
    if(!query){fetchParam=`${baseUrl}/fix_picture/list?sortField=createdAt&sortOrder=asc`}
    else{fetchParam=`${baseUrl}/fix_picture/list${query}&sortField=createdAt&sortOrder=asc`}
    return fetchWrapper.get(fetchParam);
}



function getMyList() {
    return fetchWrapper.get(baseUrl+"/mylist");
}

function getAddList() {
    return fetchWrapper.get(baseUrl+"/addlist");
}
function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function fixPicture(id){
 
    return fetchWrapper.put(`${baseUrl}/fix_picture/${id}`,{"edit":"edit"});
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
