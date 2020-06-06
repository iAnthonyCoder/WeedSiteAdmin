import { fetchWrapper, history } from '../_helpers';
import { getPublicApi } from '../_helpers/config';

const baseUrl = getPublicApi+"cities";


export const cityService = {
    getAll,
    getByState
};


function getAll() {

    return fetchWrapper.get(baseUrl);
}


function getByState(id) {

    return fetchWrapper.get(`${baseUrl}/state/${id}`);
}
