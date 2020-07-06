import React, { useState, useRef } from 'react';
import { accountService, alertService } from '../../_services';
import { PageHeader, MainTable, SuperTable, LoadingSpinner } from '../../_components'
import { history } from "../../_helpers";
const _thisService = accountService



function List() {
    // const [scopedItem, setScopedItem] = useState("")
    const [items, setItems] = useState("")
    const [mutatedItems, setMutatedItems] = useState(null)
    const [fetched, setFetched] = useState(false);
    const defaultAvatar = "/static/user.png";



    const callApiTrigger = useRef()
	const columns = [
		{
		  Header: 'Name',
		  accessor: 'name',
		},
		{
		  Header: 'Type',
		  accessor: row => (
        <>
           <div>{(row.type==="DISPENSARY")?"Dispensary owner":"Customer"}</div>
        </>
      )
		},
		{
		  Header: 'Email',
		  accessor: 'email',
		},
		{
		  Header: 'Status',
		  cell:({row})=>(
        ( row.original.isActive===true)?(<span className="badge badge-success">Active</span>):(<span className="badge badge-danger">Banned</span>)
      )
		},
		{
		  Header: 'Subscription',
		  accessor: row=>(
          (row.subscriptions)?(<span className="badge badge-success">{row.subscriptions.subscription_start} - {row.subscriptions.subscription_end}</span>):<span className="badge badge-danger">UNSUBSCRIBED</span>
      )
		},
		{
		Header: 'Actions',
		width:"100px",
		  Cell:({row})=>(
			<span style={{width:"100px"}} class="dropdown position-static">
			  <button class="btn btn-white btn-sm dropdown-toggle align-text-top show" data-boundary="viewport" data-toggle="dropdown" aria-expanded="true">Actions</button>
				<div class="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style={{position: "absolute", willChange: "transform", top: "0px", left: "0px", transform: "translate3d(852px, 181px, 0px)"}}>
				  <button onClick={()=>{details(row.original._id)}} class="dropdown-item">
					Details
				  </button>
				</div>
			  </span>
		  )
		}
	]


    // const columns = [{
    //   dataField: 'name',
    //   text: 'Name',
    //   sort: true,
    //   formatter: (rowContent, row) => {
    //     return (    
    //       <div className="d-flex lh-sm py-1 align-items-center">
    //         <span className="avatar mr-2" style={{backgroundImage: `url("${(row && row.picture)?row.picture:defaultAvatar}")`}}></span>
    //         <div className="flex-fill"><div className="strong">{row.name}</div></div>
    //       </div>
    //     )
    //   }
    // }, {
    //   dataField: 'dispensary',
    //   text: 'Dispensary',
    //   sort: true, 
    //   formatter: (rowContent, row) => {
    //     return(
    //       <>
    //        <div>{(row.type==="DISPENSARY")?"Dispensary owner":"Customer"}</div>
    //        <div className="text-muted text-h5">{row.dispensary && row.dispensary.name}</div>
    //       </>
    //     )
    //   }
      
    // }, {
    //   dataField: 'email',
    //   text: 'Email',
    //   sort: true, 
    //   formatter: (rowContent, row) => {
    //     return(
    //       <>
    //       {row.email}
    //       </>
    //     )
    //   }
    // }, {
    //   dataField: 'isActive',
    //   text: 'Status',
    //   sort: true,
    //   formatter: (rowContent, row) => {
    //     return ( row.isActive?<span className="badge badge-success">Active</span>:<span className="badge badge-danger">Banned</span>)}
    // }, {
    //   dataField: 'subscription',
    //   text: 'Subscription',
    //   sort: true,
    //   formatter: (rowContent, row) => {
        
    //     return (
    //       (row.subscriptions)?(<p>{row.subscriptions.subscription_start} to {row.subscriptions.subscription_end}</p>):"Unsubscribed"
    //     )
      
    //   }
    //   }
    // ];

   


    // function deleteByID(id){
    //   console.log(id);
    //   if(window.confirm("Are you sure do you want to delete this item?")){
    //     _thisService.delete(id).then(()=>{
    //       let filteredState = items.filter( item => item._id !== id );
    //       setItems(filteredState)
    //       setMutatedItems(filteredState)
    //       alertService.success('Item deleted successfully', { keepAfterRouteChange: true })
    //     });
    //   };     
    // }

    const details = (id) => {
 
      history.push(`users/${id}`)
    }
    
     function changeStatus(id,item,isActive) {
      var itemUpdated = item;
      itemUpdated.isActive=isActive
      if(window.confirm("Are you sure do you want to change the status of "+item.name+" ?")){
          accountService.updateIsActive(id,itemUpdated).then((res) => {
              alertService.success('Updated Sucessfully', { keepAfterRouteChange: true });
              callApiTrigger.current.fetchData();
          });
      }
  }

  return (
    <>
    		<PageHeader title="Admin/Users" link="create" subtitle="Users list" subtitle="Users list" toggle="modal" target="#modal-create" />
    		<div className="box">
				<MainTable items={mutatedItems} title={'USERS'} details={details} endPoint={accountService.getAll}  changeStatus={changeStatus}  columns={columns}/>
    		</div>
    </>
  )}

export { List };



















//     const [users, setUsers] = useState(null);
//     const manipuledUsersInitialValue = "";
//     const searchModeInitialValue = false;
//     const [manupiledUsers, setManipuledUsers] = useState(manipuledUsersInitialValue)
//     const [searchMode, setSearchMode] = useState(searchModeInitialValue)
//     const defaultAvatar = "./static/user.png";


    
//     useEffect(() => {
//         accountService.getAll().then(x => setUsers(x));
//     }, []);


//     function confirmThis(){
      
//     }

//     function deleteUser(id,name) {
//         // setUsers(users.map(x => {
//         //     if (x.id === id) { x.isDeleting = true; }
//         //     return x;
//         // }));
        
//         if(window.confirm("Are you sure do you want to delete "+name+" ?")){
//           accountService.delete(id).then(() => {
//               alertService.success('Deleted Sucessfully', { keepAfterRouteChange: true });
//               setUsers(users => users.filter(x => x._id !== id));
//           });
//         }
//     }


//     const handleSearch = async (e) => {
//       const { value } = e.target;
//       const lowervalue=value.toLowerCase();
//       if (value.length < 1){
//         setSearchMode(false)
//         setManipuledUsers([]); 
//       }
//       else{
//           setSearchMode(true)
//           var searchResult = await users.filter((user)=>{
//             return  user.name.toLowerCase().includes(lowervalue) ||
//                     user.email.toLowerCase().includes(lowervalue) 
//           });
//           setManipuledUsers(searchResult); 
//       }
      
//     }

//     function setIsActive(id,user,isActive) {
//         var userUpdated = user;
//         userUpdated.isActive=isActive
//         if(window.confirm("Are you sure do you want to change the status of "+user.name+" ?")){
//             accountService.updateIsActive(id,userUpdated).then((res) => {
//                 alertService.success('Updated Sucessfully', { keepAfterRouteChange: true });
//                 setUsers(users.map(user => (user._id === id ? res.payload : user)))
//             });
//         }
//     }

//     return (

      
//         <div className="box">
//           <PageHeader title="Admin/Users" subtitle="Users list" />
//           {/* <ConfirmModal confirmThis /> */}
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
//                       <th>Type</th>
//                       <th>Status</th>
//                       <th>Subscription</th>
//                       <th className="w-1"></th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {
//                       !searchMode?(
//                     (users)?users.map(user =>
//                         <tr>
//                             <td data-label="Name">
//                               <div className="d-flex lh-sm py-1 align-items-center">
//                                 <span className="avatar mr-2" style={{backgroundImage: `url("${(user && user.picture)?user.picture:defaultAvatar}")`}}></span>
//                                 <div className="flex-fill">
//                                   <div className="strong">{user.name}</div>
//                                   <div className="text-muted text-h5"><a href="#" className="text-reset">{user.email}</a></div>
//                                 </div>
//                               </div>
//                             </td>
//                             <td data-label="Type">
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
                      
//                             </td>
//                             <td>
//                               <div className="btn-list flex-nowrap">
//                                 <div className="dropdown position-static">
//                                   <button className="btn btn-white dropdown-toggle align-text-top" data-boundary="viewport" data-toggle="dropdown" aria-expanded="false">Actions</button>
//                                   <div className="dropdown-menu dropdown-menu-right">
//                                     <Link className="dropdown-item" to={`/admin/users/${user._id}`}>
//                                       Details
//                                     </Link>
                                    
//                                     <a onClick={()=>{setIsActive(user._id, user, !user.isActive)}} className="dropdown-item">
//                                       {(user.isActive)?"Disable":"Enable"}
//                                     </a>

//                                     <a onClick={()=>{deleteUser(user._id, user.name)}} className="dropdown-item" >
//                                       Delete
//                                     </a>
//                                   </div>
//                                 </div>
//                               </div>
//                             </td>
//                         </tr>
//                     ):(<tr><td colspan="5" key={"1"}><NoResults /></td></tr>)
//                     ):(

//                       manupiledUsers>0?manupiledUsers.map(user =>
//                         <tr>
//                             <td data-label="Name">
//                               <div className="d-flex lh-sm py-1 align-items-center">
//                                 <span className="avatar mr-2" style={{backgroundImage: "url(./static/avatars/005f.jpg)"}}></span>
//                                 <div className="flex-fill">
//                                   <div className="strong">{user.name}</div>
//                                   <div className="text-muted text-h5"><a href="#" className="text-reset">{user.email}</a></div>
//                                 </div>
//                               </div>
//                             </td>
//                             <td data-label="Type">
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
                      
//                             </td>
//                             <td>
//                               <div className="btn-list flex-nowrap">
//                                 <div className="dropdown position-static">
//                                   <button className="btn btn-white dropdown-toggle align-text-top" data-boundary="viewport" data-toggle="dropdown" aria-expanded="false">Actions</button>
//                                   <div className="dropdown-menu dropdown-menu-right">
//                                     <Link className="dropdown-item" to={`/admin/users/${user._id}`}>
//                                       Details
//                                     </Link>
                                    
//                                     <a onClick={()=>{setIsActive(user._id, user, !user.isActive)}} className="dropdown-item">
//                                       {(user.isActive)?"Disable":"Enable"}
//                                     </a>

//                                     <a onClick={()=>{deleteUser(user._id, user.name)}} className="dropdown-item" >
//                                       Delete
//                                     </a>
//                                   </div>
//                                 </div>
//                               </div>
//                             </td>
//                         </tr>

//                     ):(<tr><td colspan="5" key={"1"}><NoResults /></td></tr>)
//                     )
                  
//                   }
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
      
//     );
// }

// export { List };