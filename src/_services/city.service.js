import { fetchWrapper, history } from '../_helpers';
import { getApi } from '../_helpers/config';

const baseUrl = getApi+"cities";


export const cityService = {
    getAll,
};


function getAll() {

    return fetchWrapper.get(baseUrl);
}


