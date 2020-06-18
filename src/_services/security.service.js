import { fetchWrapper, history } from '../_helpers';
import { BehaviorSubject } from 'rxjs';
import { getPrivateApi } from '../_helpers/config';

const baseUrl = getPrivateApi+"security";


export const securityService = {
    getAllActivity,
    getAllSessions,
    getAddedRecords
};

function getAllActivity(query) {
    var fetchParam=""
    if(!query){fetchParam=`${baseUrl}/activity`}
    else{fetchParam=`${baseUrl}/activity${query}`}
    return fetchWrapper.get(fetchParam);
}

function getAllSessions(query) {
    var fetchParam=""
    if(!query){fetchParam=`${baseUrl}/sessions`}
    else{fetchParam=`${baseUrl}/sessions${query}`}
    return fetchWrapper.get(fetchParam);
}

function getAddedRecords(query) {
    var fetchParam=""
    if(!query){fetchParam=`${baseUrl}/activity/addedPerDay`}
    else{fetchParam=`${baseUrl}/activity/addedPerDay${query}`}
    return fetchWrapper.get(fetchParam);
}

