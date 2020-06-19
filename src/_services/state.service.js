import { fetchWrapper, history } from '../_helpers';
import { getPublicApi } from '../_helpers/config';

const baseUrl = getPublicApi+"states";


export const stateService = {
    getAll,
    // getByState
};


function getAll(query) {
    var fetchParam=""
    if(!query){fetchParam=`${baseUrl}`}
    else{fetchParam=`${baseUrl}${query}`}
    return fetchWrapper.get(fetchParam);
}
