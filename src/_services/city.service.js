import { fetchWrapper, history } from '../_helpers';
import { getPublicApi } from '../_helpers/config';

const baseUrl = getPublicApi+"cities";


export const cityService = {
    getAll,
};


function getAll() {

    return fetchWrapper.get(baseUrl);
}


