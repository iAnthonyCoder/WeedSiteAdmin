import React,{ useRef, useState } from 'react';
import { PageHeader, NoResults, TableCardHeader, SuperTable, MainTable } from '../../_components';
import { brandService, alertService, dispensaryService } from '../../_services';
import $ from 'jquery';
import {history} from '../../_helpers';
const _thisService = dispensaryService;



function List() {
	const callApiTrigger = useRef()
	const columns = [
		{
		  Header: 'Name',
		  accessor: 'name',
		},
		{
		  Header: 'City',
		  accessor: 'city.name',
		},
		{
		  Header: 'Address',
		  accessor: 'address',
		},
		{
		  Header: 'Phone number',
		  accessor: 'phone',
		},
		{
		  Header: 'Owner',
		  accessor: 'user.name',
		},
		{
		  Header: 'Owner Email',
		  accessor: 'user.email',
		},
		{
		Header: 'Actions',
		width:"100px",
		  Cell:({row})=>(
			<span style={{width:"100px"}} class="dropdown position-static">
			  <button class="btn btn-white btn-sm dropdown-toggle align-text-top show" data-boundary="viewport" data-toggle="dropdown" aria-expanded="true">Actions</button>
				<div class="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style={{position: "absolute", willChange: "transform", top: "0px", left: "0px", transform: "translate3d(852px, 181px, 0px)"}}>
				  <button onClick={()=>{details(row.original.user._id)}} class="dropdown-item">
					Details
				  </button>
				  <button onClick={()=>{deleteThis(row.original._id)}} class="dropdown-item">
					Delete
				  </button>
				</div>
			  </span>
		  )
		}
	]





	const deleteThis = (id) => {
		dispensaryService.delete(id)
			.then(response => alert('DELETED'))
			.catch(alert('ERROR TRYING TO DELETE'))
	}
    
    const details = (id) => {
    	history.push(`users/${id}`)
    }

    // function deleteByID(id){
    //   	if(window.confirm("Are you sure do you want to delete this item?")){
    //     	_thisService.delete(id).then(()=>{
    //       		let filteredState = items.filter( item => item._id !== id );
    //       		setItems(filteredState)
    //       		setMutatedItems(filteredState)
    //       		alertService.success('Item deleted successfully', { keepAfterRouteChange: true })
    //     	});
    //   	};     
    // }


	return (
  		<>
    		<PageHeader title="Admin/Dispensaries" link="create" subtitle="Dispensaries list" />
    		<div className="box">
				<MainTable ref={callApiTrigger} details={details} title={"DISPENSARIES"} endPoint={dispensaryService.getAll} columns={columns}/>
    		</div>
  		</>
	);
}
export { List };



// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// import { dispensaryService } from '../../_services';
// import { PageHeader, NoResults } from '../../_components'

// function List({ match }) {
//     const { path } = match;
//     const [dispensaries, setDispensaries] = useState(null);
//     const manipuledDispensariesInitialValue = "";
//     const searchModeInitialValue = false;
//     const [manipuledDispensaries, setManipuledDispensaries] = useState(manipuledDispensariesInitialValue)
//     const [searchMode, setSearchMode] = useState(searchModeInitialValue)

//     useEffect(() => {
//         dispensaryService.getAll().then(x => setDispensaries(x));
//     }, []);

//     // function deleteUser(id,name) {
//     //     // setUsers(users.map(x => {
//     //     //     if (x.id === id) { x.isDeleting = true; }
//     //     //     return x;
//     //     // }));
//     //     if(window.confirm("Are you sure do you want to delete "+name+" ?")){
//     //       accountService.delete(id).then(() => {
//     //           setUsers(users => users.filter(x => x._id !== id));
//     //       });
//     //     }
//     // }


//     const handleSearch = async (e) => {
//       const { value } = e.target;
//       const lowervalue=value.toLowerCase();
//       if (value.length < 1){
//         setSearchMode(false)
//         setManipuledDispensaries([]); 
//       }
//       else{
//           setSearchMode(true)
//           var searchResult = await dispensaries.filter((dispensary)=>{
//             return  dispensary.name.toLowerCase().includes(lowervalue) ||
//                     dispensary.address.toLowerCase().includes(lowervalue) ||
//                     dispensary.phone.toLowerCase().includes(lowervalue) 
//           });
//           setManipuledDispensaries(searchResult); 
//       }
      
//     }

//     // function setIsActive(id,user,isActive) {
//     //     var userUpdated = user;
//     //     userUpdated.isActive=isActive
//     //     if(window.confirm("Are you sure do you want to change the status of "+user.name+" ?")){
//     //         accountService.updateIsActive(id,userUpdated).then((res) => {
//     //             setUsers(users.map(user => (user._id === id ? res.payload : user)))
//     //         });
//     //     }
//     // }

//     return (


//         <div className="box">
//           <PageHeader title="Admin/Users" subtitle="Dispensaries list" />
          
//             <div className="card">
//             <div className="card-header">
//               <h3 className="card-title">Users</h3>
//               <div className="ml-auto text-muted">
//                   Search:
//                   <div className="ml-2 d-inline-block">
//                     <input type="text" onChange={handleSearch} className="form-control form-control-sm"/>
//                   </div>
//                 </div>
//             </div>
//               <div className="table-responsive">
//                 <table className="table table-vcenter table-mobile-md card-table">
//                   <thead>
//                     <tr>
//                       <th>Name</th>
//                       <th>City</th>
//                        <th>Address</th>
//                       <th>Phone number</th>
//                       <th>Owner</th>
//                       <th className="w-1"></th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {
//                       !searchMode?(
//                           (dispensaries && dispensaries.length > 0)?(dispensaries.map(dispensary =>
//                         <tr>
//                             <td data-label="Name">
//                               <div className="d-flex lh-sm py-1 align-items-center">
                        
//                                 <div className="flex-fill">
//                                   <div className="strong">{dispensary.name}</div>
//                                   {/* <div className="text-muted text-h5"><a href="#" className="text-reset">{user.email}</a></div> */}
//                                 </div>
//                               </div>
//                             </td>
//                             <td data-label="City" className="text-muted">{dispensary.city.name}</td>
//                             <td data-label="Address" className="text-muted">{dispensary.address}</td>
//                             <td data-label="Phone number" className="text-muted">{dispensary.phone}</td>
//                             <td data-label="Owner" className="">{dispensary.user.name}</td>
//                             {/* <td data-label="Type">
//                               <div>{(user.type==="DISPENSARY")?"Dispensary owner":"Customer"}</div>
//                               <div className="text-muted text-h5">{user.dispensary && user.dispensary.name}</div>
//                             </td>
//                             <td className="text-muted" data-label="Status">
//                                 {user.isActive?<span className="badge badge-success">Active</span>:<span className="badge badge-danger">Banned</span>}
//                             </td>
//                             <td className="text-muted" data-label="Subscription">
                       
//                             <div className="progress progress-sm">
//                     <div className="progress-bar bg-blue" style={{width: "75%"}} role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
//                       <span className="sr-only">75% Complete</span>
//                     </div>
//                   </div>
                      
//                             </td>*/}
//                             <td>
//                               <div className="btn-list flex-nowrap">
//                                 <div className="dropdown position-static">
//                                   <button className="btn btn-white dropdown-toggle align-text-top" data-boundary="viewport" data-toggle="dropdown" aria-expanded="false">Actions</button>
//                                   <div className="dropdown-menu dropdown-menu-right">
//                                     <Link className="dropdown-item" to={`/admin/users/${dispensary.user._id}`}>
//                                       See full details
//                                     </Link>
                                    
//                                     {/* <a onClick={()=>{setIsActive(user._id, user, !user.isActive)}} className="dropdown-item">
//                                       {(user.isActive)?"Disable":"Enable"}
//                                     </a>

//                                     <a onClick={()=>{deleteUser(user._id, user.name)}} className="dropdown-item" >
//                                       Delete
//                                     </a> */}
//                                   </div>
//                                 </div>
//                               </div>
//                             </td> 
//                         </tr>
//                     )):(<tr><td colspan="5" key={"1"}><NoResults /></td></tr>)
                    
                    
//                     ):(

//                       (manipuledDispensaries>0)?(manipuledDispensaries.map(dispensary =>
//                         <tr>
//                             <td data-label="Name">
//                               <div className="d-flex lh-sm py-1 align-items-center">
                        
//                                 <div className="flex-fill">
//                                   <div className="strong">{dispensary.name}</div>
//                                   {/* <div className="text-muted text-h5"><a href="#" className="text-reset">{user.email}</a></div> */}
//                                 </div>
//                               </div>
//                             </td>
//                             <td data-label="City" className="text-muted">{dispensary.city.name}</td>
//                             <td data-label="Address" className="text-muted">{dispensary.address}</td>
//                             <td data-label="Phone number" className="text-muted">{dispensary.phone}</td>
//                             <td data-label="Owner" className="">{dispensary.user.name}</td>
//                             {/* <td data-label="Type">
//                               <div>{(user.type==="DISPENSARY")?"Dispensary owner":"Customer"}</div>
//                               <div className="text-muted text-h5">{user.dispensary && user.dispensary.name}</div>
//                             </td>
//                             <td className="text-muted" data-label="Status">
//                                 {user.isActive?<span className="badge badge-success">Active</span>:<span className="badge badge-danger">Banned</span>}
//                             </td>
//                             <td className="text-muted" data-label="Subscription">
                       
//                             <div className="progress progress-sm">
//                     <div className="progress-bar bg-blue" style={{width: "75%"}} role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
//                       <span className="sr-only">75% Complete</span>
//                     </div>
//                   </div>
                      
//                             </td>*/}
//                             <td>
//                               <div className="btn-list flex-nowrap">
//                                 <div className="dropdown position-static">
//                                   <button className="btn btn-white dropdown-toggle align-text-top" data-boundary="viewport" data-toggle="dropdown" aria-expanded="false">Actions</button>
//                                   <div className="dropdown-menu dropdown-menu-right">
//                                     <Link className="dropdown-item" to={`/admin/users/${dispensary.user._id}`}>
//                                       See full details
//                                     </Link>
                                    
//                                     {/* <a onClick={()=>{setIsActive(user._id, user, !user.isActive)}} className="dropdown-item">
//                                       {(user.isActive)?"Disable":"Enable"}
//                                     </a>

//                                     <a onClick={()=>{deleteUser(user._id, user.name)}} className="dropdown-item" >
//                                       Delete
//                                     </a> */}
//                                   </div>
//                                 </div>
//                               </div>
//                             </td> 
//                         </tr>

//                     )
//                     ):(<tr><td colspan="5" key={"1"}><NoResults /></td></tr>)
//                     )
//                   }
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         // <div>
//         //     <h1>Users</h1>
//         //     <p>All users from secure (admin only) api end point:</p>
//         //     <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add User</Link>
//         //     <table className="table table-striped">
//         //         <thead>
//         //             <tr>
//         //                 <th style={{ width: '30%' }}>Name</th>
//         //                 <th style={{ width: '30%' }}>Email</th>
//         //                 <th style={{ width: '30%' }}>Role</th>
//         //                 <th style={{ width: '10%' }}></th>
//         //             </tr>
//         //         </thead>
//         //         <tbody>
//         //             {users && users.map(user =>
//         //                 <tr key={user.id}>
//         //                     <td>{user.title} {user.firstName} {user.lastName}</td>
//         //                     <td>{user.email}</td>
//         //                     <td>{user.role}</td>
//         //                     <td style={{ whiteSpace: 'nowrap' }}>
//         //                         <Link to={`${path}/edit/${user.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
//         //                         <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={user.isDeleting}>
//         //                             {user.isDeleting 
//         //                                 ? <span className="spinner-border spinner-border-sm"></span>
//         //                                 : <span>Delete</span>
//         //                             }
//         //                         </button>
//         //                     </td>
//         //                 </tr>
//         //             )}
//         //             {!users &&
//         //                 <tr>
//         //                     <td colSpan="4" className="text-center">
//         //                         <span className="spinner-border spinner-border-lg align-center"></span>
//         //                     </td>
//         //                 </tr>
//         //             }
//         //         </tbody>
//         //     </table>
//         // </div>
//     );
// }

// export { List };