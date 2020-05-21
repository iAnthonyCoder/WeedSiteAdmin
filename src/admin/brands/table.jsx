import React,{ useEffect, useState } from 'react';
import { PageHeader, TableCardHeader, SuperTable, LoadingSpinner } from '../../_components';
import { Create } from './create';
import { Update } from './update';
import { brandService, alertService } from '../../_services';
import $ from 'jquery';
const _thisService = brandService;



function Table({ match }) {
    const { path } = match;
    const [scopedItem, setScopedItem] = useState("")
    const [items, setItems] = useState("")
    const [mutatedItems, setMutatedItems] = useState("")
    const [fetched, setFetched] = useState(false);
    const defaultAvatar = "./static/user.png";
    const columns = [{
      dataField: 'name',
      text: 'Name',
      sort: true,
      formatter: (rowContent, row) => {
        return (    
          <div className="d-flex lh-sm py-1 align-items-center">
            <span className="avatar mr-2" style={{backgroundImage: `url("${(row && row.picture)?row.picture:defaultAvatar}")`}}></span>
            <div className="flex-fill"><div className="strong">{row.name}</div></div>
          </div>
        )
      }
    }, {
      dataField: '_id',
      text: 'ID',
      sort: true
    }, {
      dataField: 'description',
      text: 'Description',
      sort: true
    }, {
      dataField: 'slug',
      text: 'Slug',
      sort: true
      }
    ];

    // const firePagination = (length,pageChange, items) => {
    //   setTotalItems(res.length);
    //   _handlePageChange(1)
    //   setPaginatedItems(res.slice(0,itemsPerPage))
    // }


    const fetch = async () => {
    await _thisService.getAll()
        .then((res)=>{
          setItems(res)
          setMutatedItems(res)
          setFetched(true)
        })
    }
    
    useEffect(() => {
        fetch()
    }, [])
    
    const handleSearch = async (e) => {
      	const { value } = e.target;
      	if(value.length < 1){
        	setMutatedItems(items); 
      	}
      	else  {
        	var searchResult = await items.filter((item)=>{
         		return  item.name.toLowerCase().includes(value.toLowerCase()) ||
            	      	item.description.toLowerCase().includes(value.toLowerCase()) ||
            	      	item._id.toLowerCase().includes(value.toLowerCase())
        	});
        	setMutatedItems(searchResult); 
      	}
    }

    function addNew(item){
      	setItems([...items, item])
      	setMutatedItems([...items, item]); 
	}
	
    function updateOne(_id, newItem){
      	setItems(items.map(item => (item._id === _id ? newItem : item)))
      	setMutatedItems(items.map(item => (item._id === _id ? newItem : item)));
    }

    function deleteByID(id){
      	if(window.confirm("Are you sure do you want to delete this item?")){
        	_thisService.delete(id).then(()=>{
          		let filteredState = items.filter( item => item._id !== id );
          		setItems(filteredState)
          		setMutatedItems(filteredState)
          		alertService.success('Item deleted successfully', { keepAfterRouteChange: true })
        	});
      	};     
    }

    function scopeItem(object){
      	setScopedItem(object);
      	$("#modal-update").modal("show");
    }

	function renderTable(){
		return  <div className="card">
	        		<TableCardHeader title="Brands" handleSearch={handleSearch} />
	              	<div className="table-responsive">
	                	<SuperTable items={mutatedItems} scopeItem={scopeItem} deleteByID={deleteByID} columns={columns}/>
	              	</div>
	          	</div>
	}

	return (
		<>
	    	<Create addNew={addNew}/>
	    	<Update updateOne={updateOne} object={scopedItem}/>
	    	<PageHeader title="Admin/Brands" link="create" nameButton="Add brand" subtitle="Brands list" toggle="modal" target="#modal-create" />
	    	<div className="box">
	    	{
	    	  (fetched) ? renderTable() : <LoadingSpinner />       
	    	}
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