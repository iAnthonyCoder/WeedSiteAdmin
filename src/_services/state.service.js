import { fetchWrapper, history } from '../_helpers';
import { getPublicApi } from '../_helpers/config';

const baseUrl = getPublicApi+"states";


export const stateService = {
    getAll,
    // getByState
};


function getAll() {

    return fetchWrapper.get(baseUrl);
}

