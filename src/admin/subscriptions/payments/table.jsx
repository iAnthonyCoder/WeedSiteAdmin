import React,{ useEffect, useState, useRef } from 'react';
import { PageHeader, NoResults, TableCardHeader, SuperTable, MainTable } from '../../../_components';
import { purchaseService, alertService } from '../../../_services';
import { Update } from './update';
import $ from 'jquery';
const _thisService = purchaseService;
const _thisSection = "Purchase";
const _thisSectionPl = "Purchases";



function Table({ match }) {
  const [scopedItem, setScopedItem] = useState("")
  const callApiTrigger = useRef()
  const _thisService=purchaseService


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
        accessor: row => ( row.status=="ACCEPTED"?<span className="badge badge-success">ACCEPTED</span>:row.status=="PENDING"?(<span className="badge badge-alertw">PENDING</span>):<span className="badge badge-danger">REJECTED</span>)
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
 
    function scopeItem(object){
      setScopedItem(object);
      $("#modal-update").modal("show");
    }

return (
  <>
    <Update object={scopedItem}/>
    <PageHeader title={`Admin/Requests/${_thisSection}`} link="create" subtitle={`${_thisSectionPl} list`} toggle="modal" target="#modal-create" />
    <div className="box">
      <MainTable ref={callApiTrigger} title={"PURCHASES"} endPoint={purchaseService.getAll} columns={columns} />  
    </div>
  </>
);
}

export { Table };