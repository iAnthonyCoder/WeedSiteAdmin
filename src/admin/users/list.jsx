import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { accountService, alertService } from '../../_services';
import { PageHeader, ConfirmModal, NoResults } from '../../_components'
import { fromEventPattern } from 'rxjs';
import $ from 'jquery';

function List({ match }) {
    const { path } = match;
    const [users, setUsers] = useState(null);
    const manipuledUsersInitialValue = "";
    const searchModeInitialValue = false;
    const [manupiledUsers, setManipuledUsers] = useState(manipuledUsersInitialValue)
    const [searchMode, setSearchMode] = useState(searchModeInitialValue)

    useEffect(() => {
        accountService.getAll().then(x => setUsers(x));
    }, []);


    function confirmThis(){
      
    }

    function deleteUser(id,name) {
        // setUsers(users.map(x => {
        //     if (x.id === id) { x.isDeleting = true; }
        //     return x;
        // }));
        
        if(window.confirm("Are you sure do you want to delete "+name+" ?")){
          accountService.delete(id).then(() => {
              alertService.success('Deleted Sucessfully', { keepAfterRouteChange: true });
              setUsers(users => users.filter(x => x._id !== id));
          });
        }
    }


    const handleSearch = async (e) => {
      const { value } = e.target;
      const lowervalue=value.toLowerCase();
      if (value.length < 1){
        setSearchMode(false)
        setManipuledUsers([]); 
      }
      else{
          setSearchMode(true)
          var searchResult = await users.filter((user)=>{
            return  user.name.toLowerCase().includes(lowervalue) ||
                    user.email.toLowerCase().includes(lowervalue) 
          });
          setManipuledUsers(searchResult); 
      }
      
    }

    function setIsActive(id,user,isActive) {
        var userUpdated = user;
        userUpdated.isActive=isActive
        if(window.confirm("Are you sure do you want to change the status of "+user.name+" ?")){
            accountService.updateIsActive(id,userUpdated).then((res) => {
                alertService.success('Updated Sucessfully', { keepAfterRouteChange: true });
                setUsers(users.map(user => (user._id === id ? res.payload : user)))
            });
        }
    }

    return (

      
        <div class="box">
          <PageHeader title="Admin/Users" subtitle="Users list" />
          {/* <ConfirmModal confirmThis /> */}
            <div class="card">
            <div class="card-header">
              <h3 class="card-title">Users</h3>
              <div class="ml-auto text-muted">
                  Search:
                  <div class="ml-2 d-inline-block">
                    <input type="text" onChange={handleSearch} class="form-control form-control-sm"/>
                  </div>
                </div>
            </div>
              <div class="table-responsive">
                <table class="table table-vcenter table-mobile-md card-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Subscription</th>
                      <th class="w-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      !searchMode?(
                    (users)?users.map(user =>
                        <tr>
                            <td data-label="Name">
                              <div class="d-flex lh-sm py-1 align-items-center">
                                <span class="avatar mr-2" style={{backgroundImage: "url(./static/avatars/005f.jpg)"}}></span>
                                <div class="flex-fill">
                                  <div class="strong">{user.name}</div>
                                  <div class="text-muted text-h5"><a href="#" class="text-reset">{user.email}</a></div>
                                </div>
                              </div>
                            </td>
                            <td data-label="Type">
                              <div>{(user.type==="DISPENSARY")?"Dispensary owner":"Customer"}</div>
                              <div class="text-muted text-h5">{user.dispensary && user.dispensary.name}</div>
                            </td>
                            <td class="text-muted" data-label="Status">
                                {user.isActive?<span class="badge badge-success">Active</span>:<span class="badge badge-danger">Banned</span>}
                            </td>
                            <td class="text-muted" data-label="Subscription">
                       
                            <div class="progress progress-sm">
                    <div class="progress-bar bg-blue" style={{width: "75%"}} role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                      <span class="sr-only">75% Complete</span>
                    </div>
                  </div>
                      
                            </td>
                            <td>
                              <div class="btn-list flex-nowrap">
                                <div class="dropdown position-static">
                                  <button class="btn btn-white dropdown-toggle align-text-top" data-boundary="viewport" data-toggle="dropdown" aria-expanded="false">Actions</button>
                                  <div class="dropdown-menu dropdown-menu-right">
                                    <Link class="dropdown-item" to={`/admin/users/${user._id}`}>
                                      Details
                                    </Link>
                                    
                                    <a onClick={()=>{setIsActive(user._id, user, !user.isActive)}} class="dropdown-item">
                                      {(user.isActive)?"Disable":"Enable"}
                                    </a>

                                    <a onClick={()=>{deleteUser(user._id, user.name)}} class="dropdown-item" >
                                      Delete
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </td>
                        </tr>
                    ):(<tr><td colspan="5" key={"1"}><NoResults /></td></tr>)
                    ):(

                      manupiledUsers>0?manupiledUsers.map(user =>
                        <tr>
                            <td data-label="Name">
                              <div class="d-flex lh-sm py-1 align-items-center">
                                <span class="avatar mr-2" style={{backgroundImage: "url(./static/avatars/005f.jpg)"}}></span>
                                <div class="flex-fill">
                                  <div class="strong">{user.name}</div>
                                  <div class="text-muted text-h5"><a href="#" class="text-reset">{user.email}</a></div>
                                </div>
                              </div>
                            </td>
                            <td data-label="Type">
                              <div>{(user.type==="DISPENSARY")?"Dispensary owner":"Customer"}</div>
                              <div class="text-muted text-h5">{user.dispensary && user.dispensary.name}</div>
                            </td>
                            <td class="text-muted" data-label="Status">
                                {user.isActive?<span class="badge badge-success">Active</span>:<span class="badge badge-danger">Banned</span>}
                            </td>
                            <td class="text-muted" data-label="Subscription">
                       
                            <div class="progress progress-sm">
                    <div class="progress-bar bg-blue" style={{width: "75%"}} role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                      <span class="sr-only">75% Complete</span>
                    </div>
                  </div>
                      
                            </td>
                            <td>
                              <div class="btn-list flex-nowrap">
                                <div class="dropdown position-static">
                                  <button class="btn btn-white dropdown-toggle align-text-top" data-boundary="viewport" data-toggle="dropdown" aria-expanded="false">Actions</button>
                                  <div class="dropdown-menu dropdown-menu-right">
                                    <Link class="dropdown-item" to={`/admin/users/${user._id}`}>
                                      Details
                                    </Link>
                                    
                                    <a onClick={()=>{setIsActive(user._id, user, !user.isActive)}} class="dropdown-item">
                                      {(user.isActive)?"Disable":"Enable"}
                                    </a>

                                    <a onClick={()=>{deleteUser(user._id, user.name)}} class="dropdown-item" >
                                      Delete
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </td>
                        </tr>

                    ):(<tr><td colspan="5" key={"1"}><NoResults /></td></tr>)
                    )
                  
                  }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        // <div>
        //     <h1>Users</h1>
        //     <p>All users from secure (admin only) api end point:</p>
        //     <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add User</Link>
        //     <table className="table table-striped">
        //         <thead>
        //             <tr>
        //                 <th style={{ width: '30%' }}>Name</th>
        //                 <th style={{ width: '30%' }}>Email</th>
        //                 <th style={{ width: '30%' }}>Role</th>
        //                 <th style={{ width: '10%' }}></th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {users && users.map(user =>
        //                 <tr key={user.id}>
        //                     <td>{user.title} {user.firstName} {user.lastName}</td>
        //                     <td>{user.email}</td>
        //                     <td>{user.role}</td>
        //                     <td style={{ whiteSpace: 'nowrap' }}>
        //                         <Link to={`${path}/edit/${user.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
        //                         <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={user.isDeleting}>
        //                             {user.isDeleting 
        //                                 ? <span className="spinner-border spinner-border-sm"></span>
        //                                 : <span>Delete</span>
        //                             }
        //                         </button>
        //                     </td>
        //                 </tr>
        //             )}
        //             {!users &&
        //                 <tr>
        //                     <td colSpan="4" className="text-center">
        //                         <span className="spinner-border spinner-border-lg align-center"></span>
        //                     </td>
        //                 </tr>
        //             }
        //         </tbody>
        //     </table>
        // </div>
    );
}

export { List };