import { fetchWrapper, history } from '../_helpers';
import { BehaviorSubject } from 'rxjs';
import { getPrivateApi } from '../_helpers/config';

const baseUrl = getPrivateApi+"security";


export const securityService = {
    getAllActivity,
    getAllSessions
};

function getAllActivity() {
    return fetchWrapper.get(baseUrl+"/activity");
}

function getAllSessions() {
    return fetchWrapper.get(baseUrl+"/sessions");
}
