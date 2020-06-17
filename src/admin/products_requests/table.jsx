import React,{ useRef, useState } from 'react';
import { PageHeader, NoResults, TableCardHeader, MainTable, LoadingSpinner } from '../../_components';
import { Update } from './update';
import { productService, alertService } from '../../_services';
import $ from 'jquery';
import Pagination from "react-js-pagination";
const _thisService = productService;
const _thisSection = "Product";
const _thisSectionPl = "Products";



function Table() {
    const callApiTrigger = useRef()
    const [scopedItem, setScopedItem] = useState("")
    const defaultAvatar = "./static/user.png";
    const columns = [
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Category',
        accessor: row => row.category.name
      },
      {
        Header: 'Brand',
        accessor: row => row.brand.name
      },
      {
        Header: 'Strain',
        accessor: "a",
      },
      {
      Header: 'Actions',
      width:"100px",

        Cell:({row})=>(
          <span style={{width:"100px"}} class="dropdown ml-1 position-static">
            <button class="btn btn-white btn-sm dropdown-toggle align-text-top show" data-boundary="viewport" data-toggle="dropdown" aria-expanded="true">Actions</button>
              <div class="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style={{position: "absolute", willChange: "transform", top: "0px", left: "0px", transform: "translate3d(852px, 181px, 0px)"}}>
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


  function scopeItem(object){
      setScopedItem(object);
      $("#modal-update").modal("show");
  }





return (
  <>
    <Update updateOne={updateOne} object={scopedItem}/>
    <PageHeader title={`Admin/Requests/${_thisSection}`} link="create" subtitle={`${_thisSectionPl} list`} toggle="modal" target="#modal-create" />
    <div className="box">
      <MainTable ref={callApiTrigger} title={"PRODUCT REQUESTS"} endPoint={productService.getAllRequest} scopeItem={scopeItem} deleteByID={deleteByID} columns={columns} />  
    </div>
  </>
);
}

export { Table };