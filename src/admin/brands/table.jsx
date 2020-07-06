import React,{ useEffect, useState,useRef } from 'react';
import { PageHeader, MainTable, SuperTable, LoadingSpinner } from '../../_components';
import { Create } from './create';
import { Update } from './update';
import { brandService, alertService } from '../../_services';
import { history } from '../../_helpers'
import $ from 'jquery';
const _thisService = brandService;



function Table({ match }) {
    const [scopedItem, setScopedItem] = useState("")
    const defaultAvatar = "./static/user.png";
    const callApiTrigger = useRef()

    const columns = [
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'ID',
        accessor: '_id',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Slug',
        accessor: 'slug',
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
                <button onClick={()=>{scopeItem(row.original)}} class="dropdown-item">
                  Edit
                </button>
                <button onClick={()=>{deleteByID(row.original._id)}} class="dropdown-item">
                  Delete
                </button>
              </div>
            </span>
        )
      }
  ]


 

    function addNew(){
      callApiTrigger.current.fetchData();
	}
	
    function updateOne(_id, newItem){
      	callApiTrigger.current.fetchData();
    }

    function deleteByID(id){
      	if(window.confirm("Are you sure do you want to delete this item?")){
        	_thisService.delete(id).then(()=>{
            alertService.success('Item deleted successfully', { keepAfterRouteChange: true })
            callApiTrigger.current.fetchData();
        	});
      	};     
    }

    const details = (id) => {
      history.push(`brands/${id}`)
    }

    function scopeItem(object){
      	setScopedItem(object);
      	$("#modal-update").modal("show");
    }



	return (
		<>
	    	<Create addNew={addNew}/>
	    	<Update updateOne={updateOne} object={scopedItem}/>
	    	<PageHeader title="Admin/Brands" link="create" nameButton="Add brand" subtitle="Brands list" toggle="modal" target="#modal-create" />
	    	<div className="box">
	    	  <MainTable ref={callApiTrigger} details={details} title={"BRANDS"} endPoint={brandService.getAll} columns={columns} scopeItem={scopeItem} deleteByID={deleteByID}/>
	    	</div>
		</>
	)
}
export { Table };


















//     return (
      
//         <>
    
//           <Create addNew={addNew} />
//           <Update updateOne={updateOne} object={objectScoped}/>
//             <PageHeader title="Admin/Brands" link="create" nameButton="Add brand" subtitle="Brands list" toggle="modal" target="#modal-team" />
//             <div className="box">
//             <div className="card">
//             <div className="card-header">
//               <h3 className="card-title">Brands</h3>
//               <div className="ml-auto text-muted">
//                   Search:
//                   <div className="ml-2 d-inline-block">
//                     <input type="text" onChange={handleSearch} className="form-control form-control-sm"/>
//                   </div>
//                 </div>
//             </div>
//             {/* <div className="card-body border-bottom py-3">
//               <div className="d-flex">
//                  <div className="text-muted">
//                   Show
//                   <div className="mx-2 d-inline-block">
//                     <input type="text" className="form-control form-control-sm" value="8" size="3"/>
//                   </div>
//                   entries
//                 </div> 
                
//               </div>
//             </div> */}
//               <div className="table-responsive">
//                 <table className="table table-vcenter card-table">
//                   <thead>
//                     <tr>
//                       <th>Name</th>
//                       <th>ID</th>
//                       <th>Description</th>
//                       <th>Slug</th>
//                       <th className="w-1">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {
//                       searchMode?(
//                         manipuledBrands?(
//                           (manipuledBrands.length>0)?(manipuledBrands.map( (brand) => 
//                               <tr key={brand._id}>
//                               <td>
//                               <div className="d-flex lh-sm py-1 align-items-center">
//                                 <span className="avatar mr-2" style={{backgroundImage: `url(${brand.picture})`}}></span>
//                                 {brand.name}
//                                 </div>
//                                 </td>


//                               <td className="text-muted">
//                                 {brand._id}
//                               </td>
//                               <td className="text-muted"><a href="#" className="text-reset">{brand.description}</a></td>
//                               <td className="text-muted">
//                                 {brand.slug}
//                               </td>
//                               <td>
//                                 <a href="#" onClick={()=>{scopeObject(brand)}}>MANAGE</a>&nbsp;&nbsp;
//                                 <a href="#" onClick={()=>{deleteByID(brand._id, brand.name)}}>DELETE</a>
//                               </td>
//                             </tr>)):(<tr><td colspan="5" key={"1"}><NoResults /></td></tr>)
//                         ):("")
//                       ):(
//                         paginatedItems?(

//                           (paginatedItems.length>0)?(paginatedItems.map( (brand) => 
//                               <tr key={brand._id}>
//                               <td><div className="d-flex lh-sm py-1 align-items-center">
//                                 <span className="avatar mr-2" style={{backgroundImage: `url(${brand.picture})`}}></span>
//                                 {brand.name}
//                                 </div></td>
//                               <td className="text-muted">
//                                 {brand._id}
//                               </td>
//                               <td className="text-muted"><a href="#" className="text-reset">{brand.description}</a></td>
//                               <td className="text-muted">
//                                 {brand.slug}
//                               </td>
//                               <td>
//                                 <a href="#" onClick={()=>{scopeObject(brand)}}>MANAGE</a>&nbsp;&nbsp;
//                                 <a href="#" onClick={()=>{deleteByID(brand._id, brand.name)}}>DELETE</a>
//                               </td>
//                             </tr>)):(<tr><td colspan="5" key={"1"}><NoResults /></td></tr>)
                        
                        
//                         ):("")
//                       )
//                     } 
//                   </tbody>
                  
//                 </table>
//               </div>
//               <div className="card-footer d-flex align-items-center">
//                   {/* <p className="m-0 text-muted">Showing <span>{(activePage)?activePage:""}</span> to <span>8</span> of <span>{brands.length}</span> entries</p> */}
//               <Pagination
//                hideDisabled
//               activeLinkClass={"active"}
//               activeClass={"active"}
//               linkClass={"page-link"}
//               innerClass={"pagination m-0 ml-auto"}
//               activeLinkClass={"active"}
//               itemClass={"page-item"}
//               activePage={activePage}
//               itemsCountPerPage={itemsPerPage}
//               totalItemsCount={totalItems}
//               onChange={_handlePageChange}
//               />
//             </div>
//             </div>
//           </div>
//         </>
//     );
// }