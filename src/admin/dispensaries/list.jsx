import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { dispensaryService } from '../../_services';
import { PageHeader, NoResults } from '../../_components'

function List({ match }) {
    const { path } = match;
    const [dispensaries, setDispensaries] = useState(null);
    const manipuledDispensariesInitialValue = "";
    const searchModeInitialValue = false;
    const [manipuledDispensaries, setManipuledDispensaries] = useState(manipuledDispensariesInitialValue)
    const [searchMode, setSearchMode] = useState(searchModeInitialValue)

    useEffect(() => {
        dispensaryService.getAll().then(x => setDispensaries(x));
    }, []);

    // function deleteUser(id,name) {
    //     // setUsers(users.map(x => {
    //     //     if (x.id === id) { x.isDeleting = true; }
    //     //     return x;
    //     // }));
    //     if(window.confirm("Are you sure do you want to delete "+name+" ?")){
    //       accountService.delete(id).then(() => {
    //           setUsers(users => users.filter(x => x._id !== id));
    //       });
    //     }
    // }


    const handleSearch = async (e) => {
      const { value } = e.target;
      const lowervalue=value.toLowerCase();
      if (value.length < 1){
        setSearchMode(false)
        setManipuledDispensaries([]); 
      }
      else{
          setSearchMode(true)
          var searchResult = await dispensaries.filter((dispensary)=>{
            return  dispensary.name.toLowerCase().includes(lowervalue) ||
                    dispensary.address.toLowerCase().includes(lowervalue) ||
                    dispensary.phone.toLowerCase().includes(lowervalue) 
          });
          setManipuledDispensaries(searchResult); 
      }
      
    }

    // function setIsActive(id,user,isActive) {
    //     var userUpdated = user;
    //     userUpdated.isActive=isActive
    //     if(window.confirm("Are you sure do you want to change the status of "+user.name+" ?")){
    //         accountService.updateIsActive(id,userUpdated).then((res) => {
    //             setUsers(users.map(user => (user._id === id ? res.payload : user)))
    //         });
    //     }
    // }

    return (


        <div class="box">
          <PageHeader title="Admin/Users" subtitle="Dispensaries list" />
          
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
                      <th>City</th>
                       <th>Address</th>
                      <th>Phone number</th>
                      <th>Owner</th>
                      <th class="w-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      !searchMode?(
                          (dispensaries)?(dispensaries.map(dispensary =>
                        <tr>
                            <td data-label="Name">
                              <div class="d-flex lh-sm py-1 align-items-center">
                        
                                <div class="flex-fill">
                                  <div class="strong">{dispensary.name}</div>
                                  {/* <div class="text-muted text-h5"><a href="#" class="text-reset">{user.email}</a></div> */}
                                </div>
                              </div>
                            </td>
                            <td data-label="City" class="text-muted">{dispensary.city.name}</td>
                            <td data-label="Address" class="text-muted">{dispensary.address}</td>
                            <td data-label="Phone number" class="text-muted">{dispensary.phone}</td>
                            <td data-label="Owner" class="">{dispensary.user.name}</td>
                            {/* <td data-label="Type">
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
                      
                            </td>*/}
                            <td>
                              <div class="btn-list flex-nowrap">
                                <div class="dropdown position-static">
                                  <button class="btn btn-white dropdown-toggle align-text-top" data-boundary="viewport" data-toggle="dropdown" aria-expanded="false">Actions</button>
                                  <div class="dropdown-menu dropdown-menu-right">
                                    <Link class="dropdown-item" to={`/admin/users/${dispensary.user._id}`}>
                                      See full details
                                    </Link>
                                    
                                    {/* <a onClick={()=>{setIsActive(user._id, user, !user.isActive)}} class="dropdown-item">
                                      {(user.isActive)?"Disable":"Enable"}
                                    </a>

                                    <a onClick={()=>{deleteUser(user._id, user.name)}} class="dropdown-item" >
                                      Delete
                                    </a> */}
                                  </div>
                                </div>
                              </div>
                            </td> 
                        </tr>
                    )):(<tr><td colspan="5" key={"1"}><NoResults /></td></tr>)
                    
                    
                    ):(

                      (manipuledDispensaries>0)?(manipuledDispensaries.map(dispensary =>
                        <tr>
                            <td data-label="Name">
                              <div class="d-flex lh-sm py-1 align-items-center">
                        
                                <div class="flex-fill">
                                  <div class="strong">{dispensary.name}</div>
                                  {/* <div class="text-muted text-h5"><a href="#" class="text-reset">{user.email}</a></div> */}
                                </div>
                              </div>
                            </td>
                            <td data-label="City" class="text-muted">{dispensary.city.name}</td>
                            <td data-label="Address" class="text-muted">{dispensary.address}</td>
                            <td data-label="Phone number" class="text-muted">{dispensary.phone}</td>
                            <td data-label="Owner" class="">{dispensary.user.name}</td>
                            {/* <td data-label="Type">
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
                      
                            </td>*/}
                            <td>
                              <div class="btn-list flex-nowrap">
                                <div class="dropdown position-static">
                                  <button class="btn btn-white dropdown-toggle align-text-top" data-boundary="viewport" data-toggle="dropdown" aria-expanded="false">Actions</button>
                                  <div class="dropdown-menu dropdown-menu-right">
                                    <Link class="dropdown-item" to={`/admin/users/${dispensary.user._id}`}>
                                      See full details
                                    </Link>
                                    
                                    {/* <a onClick={()=>{setIsActive(user._id, user, !user.isActive)}} class="dropdown-item">
                                      {(user.isActive)?"Disable":"Enable"}
                                    </a>

                                    <a onClick={()=>{deleteUser(user._id, user.name)}} class="dropdown-item" >
                                      Delete
                                    </a> */}
                                  </div>
                                </div>
                              </div>
                            </td> 
                        </tr>

                    )
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