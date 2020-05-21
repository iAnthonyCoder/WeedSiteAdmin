import { fetchWrapper, history } from '../_helpers';
import { BehaviorSubject } from 'rxjs';
import { getApi } from '../_helpers/config';

const baseUrl = getApi+"security";


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
