import React,{ useRef, useState } from 'react';
import { PageHeader, NoResults, TableCardHeader, MainTable, LoadingSpinner } from '../../../_components';
import { Update } from './update';
import { purchaseService, alertService } from '../../../_services';
import $ from 'jquery';
import Pagination from "react-js-pagination";
const _thisService = purchaseService;
const _thisSection = "Purchase";
const _thisSectionPl = "Purchases";



function Pending({ match }) {
    const callApiTrigger = useRef()
    const { path } = match;
    const [scopedItem, setScopedItem] = useState("")
    const [items, setItems] = useState("")
    const [mutatedItems, setMutatedItems] = useState("")
    const [fetched, setFetched] = useState(false);
    const defaultAvatar = "./static/user.png";
    
    const columns = [
      {
        Header: 'Method',
        accessor: 'method'
      },
      {
        Header: 'Date',
        accessor: 'date'
      },
      {
        Header: 'Plan',
        accessor: 'plan',
      },
      {
        Header: 'Reference',
        accessor: 'reference',
      },
      {
        Header: 'amount',
        accessor: 'amount',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
      Header: 'Actions',
      width:"100px",

        Cell:({row})=>(
          <span style={{width:"100px"}} class="dropdown ml-1 position-static">
            <button class="btn btn-white btn-sm dropdown-toggle align-text-top show" data-boundary="viewport" data-toggle="dropdown" aria-expanded="true">Actions</button>
              <div class="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style={{position: "absolute", willChange: "transform", top: "0px", left: "0px", transform: "translate3d(852px, 181px, 0px)"}}>
                {/* <button onClick={()=>{details(row.original._id)}} class="dropdown-item">
                  Details
                </button> */}
                <button onClick={()=>{scopeItem(row.original)}} class="dropdown-item">
                  Edit
                </button>
                {/* <button onClick={()=>{deleteByID(row.original._id)}} class="dropdown-item">
                  Delete
                </button> */}
              </div>
            </span>
        )
      }
    ]

    // const firePagination = (length,pageChange, items) => {
    //   setTotalItems(res.length);
    //   _handlePageChange(1)
    //   setPaginatedItems(res.slice(0,itemsPerPage))
    // }


    
    
   

    function updateOne(id, newItem){
      let filteredState = items.filter( item => item._id !== id );
      setItems(filteredState)
      setMutatedItems(filteredState)
    }

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

    function scopeItem(object){
      setScopedItem(object);
      $("#modal-update").modal("show");
    }



return (
  <>
    <Update updateOne={updateOne} object={scopedItem}/>
    <PageHeader title={`Admin/Requests/${_thisSection}`} link="create" subtitle={`${_thisSectionPl} list`} toggle="modal" target="#modal-create" />
    <div className="box">
      <MainTable ref={callApiTrigger} title={"PENDING PURCHASES"} endPoint={purchaseService.getAllPending} scopeItem={scopeItem} columns={columns} />  
    </div>
  </>
);
}

export { Pending };