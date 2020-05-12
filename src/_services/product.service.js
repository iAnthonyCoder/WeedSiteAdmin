import { fetchWrapper, history } from '../_helpers';
const baseUrl = `http://localhost:3000/api/products`;

export const productService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
};




function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function getByUserId(id) {
   
    return fetchWrapper.get(`${baseUrl}/user/${id}`)  .then(dispensary => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        // localStorage.setItem('dispensary', JSON.stringify(dispensary));
        
        // // publish user to subscribers
        // dispensarySubject.next(dispensary);
        

        return dispensary;
})}

function create(params) {
    return fetchWrapper.postMulti(baseUrl, params);
}

function update(id, params) {
    console.log(id);
    console.log(params);
    return fetchWrapper.putMulti(`${baseUrl}/${id}`, params)

}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
        .then(x => {
            // // auto logout if the logged in user deleted their own record
            // if (id === userSubject.value.id) {
            //     logout();
            // }
            // return x;
        });
}
