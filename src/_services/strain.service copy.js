import { fetchWrapper, history } from '../_helpers';
import { getPrivateApi } from '../_helpers/config';

const baseUrl = getPrivateApi+"strains";


export const strainService = {
    getAll,
    getById,
    create,
    update,
    getProductsByStrainId,
    delete: _delete,
};

function getAll(query) {
    var fetchParam=""
    if(!query){fetchParam=`${baseUrl}`}
    else{fetchParam=`${baseUrl}${query}`}
    return fetchWrapper.get(fetchParam);
}


function getById(id) {return fetchWrapper.get(`${baseUrl}/${id}`);}

function getProductsByStrainId(id) {return fetchWrapper.get(`${baseUrl}/${id}/products/`);}

function create(params) {return fetchWrapper.post(baseUrl, params);}

function update(id, params) {return fetchWrapper.put(`${baseUrl}/${id}`, params)}

function _delete(id) {return fetchWrapper.delete(`${baseUrl}/${id}`)}
