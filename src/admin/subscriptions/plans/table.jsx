import React,{ useRef, useState } from 'react';
import { PageHeader, NoResults, TableCardHeader, SuperTable, MainTable } from '../../../_components';
import { Create } from './create';
import { Update } from './update';
import { planService, alertService } from '../../../_services';
import $ from 'jquery';


function Table({ match }) {
    const [scopedItem, setScopedItem] = useState("")
    const callApiTrigger = useRef()
    const _thisService=planService

    const columns = [
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Price',
        accessor: 'price'
      },
      {
        Header: 'Priority',
        accessor: 'priority',
      },
      {
        Header: 'Days',
        accessor: 'days',
      },
      {
        Header: 'Status',
        accessor: row => ( row.isEnabled?<span className="badge badge-success">Active</span>:<span className="badge badge-danger">Disabled</span>)
      },
      {
      Header: 'Actions',
      width:"100px",

        Cell:({row})=>(
          <span style={{width:"100px"}} class="dropdown position-static">
            <button class="btn btn-white btn-sm dropdown-toggle align-text-top show" data-boundary="viewport" data-toggle="dropdown" aria-expanded="true">Actions</button>
              <div class="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style={{position: "absolute", willChange: "transform", top: "0px", left: "0px", transform: "translate3d(852px, 181px, 0px)"}}>
                {/* <button onClick={()=>{details(row.original._id)}} class="dropdown-item">
                  Details
                </button> */}
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

    // const details = (id) => {
    //   history.push(`brands/${id}`)
    // }

    function scopeItem(object){
      	setScopedItem(object);
      	$("#modal-update").modal("show");
    }


    return (
      <>
        <Create addNew={addNew}/>
        <Update updateOne={updateOne} object={scopedItem}/>
        <PageHeader title="Admin/Plans" link="create" nameButton="Add plan" subtitle="Plans list" toggle="modal" target="#modal-create" />
        <div className="box">
          <MainTable ref={callApiTrigger} title={"PLANS"} endPoint={planService.getAll} columns={columns} scopeItem={scopeItem} deleteByID={deleteByID}/>
        </div>
      </>
    );
}

export { Table };












































// import React,{ useEffect, useState } from 'react';
// import { PageHeader, NoResults, TableCardHeader } from '../../_components';
// import { Create } from './create';
// import { Update } from './update';
// import { subscriptionService, alertService } from '../../_services';
// import $ from 'jquery';
// import Pagination from "react-js-pagination";

// function Table({ match }) {
//     const { path } = match;
//     const [scopedItem, setScopedItem] = useState("")
//     const [items, setItems] = useState("")
//     const [mutatedItems, setMutatedItems] = useState("")
//     const [activePage, setActivePage] = useState("")
//     const [totalItems, setTotalItems] = useState(1)
//     const [paginatedItems, setPaginatedItems] = useState("");
//     const [itemsPerPage, setItemsPerPage] = useState(8);

//     const fetch = async () => {
//       await subscriptionService.getAll()
//         .then((res)=>{
//           setItems(res)
//           setMutatedItems(res)
//           setTotalItems(res.length);
//           _handlePageChange(1)
//           setPaginatedItems(res.slice(0,itemsPerPage))
//         })
//     }

//     useEffect(() => {
//       setTotalItems(items.length);
//       setPaginatedItems(items.slice(activePage,itemsPerPage))
//     }, [items])

//     useEffect(() => {
//       window.addEventListener('click', changePaginationClass);
//       fetch()
//       return () => {
//         window.removeEventListener('click', changePaginationClass);
//       };
//     }, [])

//     function _handlePageChange(pageNumber) {
//       var start = (pageNumber-1)*itemsPerPage;
//       var end = start + itemsPerPage;
//       setPaginatedItems(items.slice(start,end))
//       setActivePage({activePage: pageNumber});
//     }

//     function changePaginationClass (e) {
//       const el = e.target;
//       var cusid_ele = document.getElementsByClassName('page-item');
//       for (var i = 0; i < cusid_ele.length; ++i) {
//         var item = cusid_ele[i];  
//         if(item.classList.contains("page-item")){item.classList.remove("active")}
//       }
//       (el.classList.contains("page-link"))?el.parentNode.classList.add("active"):console.log("");   
//     }
    
//     const handleSearch = async (e) => {
//       const { value } = e.target;
//       if(value.length < 1){
//         setMutatedItems(items); 
//       }
//       else  {
//         var searchResult = await items.filter((item)=>{
//           return  item.name.toLowerCase().includes(value.toLowerCase()) ||
//                   item.description.toLowerCase().includes(value.toLowerCase()) ||
//                   item._id.toLowerCase().includes(value.toLowerCase())
//         });
//         setMutatedItems(searchResult); 
//       }
//     }

//     function addNew(item){
//       setItems([...items, item])
//       setMutatedItems([...items, item]); 
//     }
//     function updateOne(_id, newItem){
//       setItems(items.map(item => (item._id === _id ? newItem : item)))
//       setMutatedItems(items.map(item => (item._id === _id ? newItem : item)));
//     }

//     function deleteByID(id, name){
//       if(window.confirm("Are you sure do you want to delete "+name+"?")){
//         subscriptionService.delete(id).then(()=>{
//           let filteredState = items.filter( item => item._id !== id );
//           setItems(filteredState)
//           setMutatedItems(filteredState)
//           alertService.success('Item deleted successfully', { keepAfterRouteChange: true })
//         });
//       };     
//     }

//     function scopeItem(object){
//       setScopedItem(object);
//       $("#modal-update").modal("show");
//     }



//     return (
//         <>
//           <Create addNew={addNew}/>
//           <Update updateOne={updateOne} object={scopedItem}/>
//           <PageHeader title="Admin/Categories" link="create" nameButton="Add category" subtitle="Categories list" toggle="modal" target="#modal-create" />
//           <div className="box">
//             <div className="card">
//             <TableCardHeader handleSearch={handleSearch} />
//             <div className="table-responsive">
//               <table className="table table-vcenter card-table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>ID</th>
//                     <th>Description</th>
//                     <th>Slug</th>
//                     <th className="w-1">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                 {
//                   (paginatedItems)?(
//                     (paginatedItems.length>0)?(paginatedItems.map( (item) => 
//                       <tr key={item._id}>
//                         <td>{item.name}</td>
//                         <td className="text-muted">{item._id}</td>
//                         <td className="text-muted"><a href="#" className="text-reset">{item.description}</a></td>
//                         <td className="text-muted">{item.slug}</td>
//                         <td>
//                           <a href="#" onClick={()=>{scopeItem(item)}}>MANAGE</a>&nbsp;&nbsp;
//                           <a href="#" onClick={()=>{deleteByID(item._id, item.name)}}>DELETE</a>
//                         </td>
//                       </tr>)
//                     ):(<tr><td colspan="5" key={"1"}><NoResults /></td></tr>)  
//                   ):(<tr><td colspan="5" key={"1"}><NoResults /></td></tr>)

//                 } 
//                 </tbody>
//               </table>
//             </div>
//             <div className="card-footer d-flex align-items-center">
//                   {/* <p className="m-0 text-muted">Showing <span>{(activePage)?activePage:""}</span> to <span>8</span> of <span>{brands.length}</span> entries</p> */}
//             <Pagination hideDisabled activeLinkClass={"active"} activeClass={"active"} linkClass={"page-link"} 
//                         innerClass={"pagination m-0 ml-auto"} activeLinkClass={"active"} itemClass={"page-item"} 
//                         activePage={activePage} itemsCountPerPage={itemsPerPage} totalItemsCount={totalItems} onChange={_handlePageChange}
//             />
//             </div>
//           </div>
//         </div>
//       </>
//     );
// }

// export { Table };