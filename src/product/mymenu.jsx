import React, {useState, useRef} from 'react';
import { Link } from 'react-router-dom';

import { menuproductService } from '../_services';
import { PageHeader, TableCardHeader, MainTable, LoadingSpinner } from '../_components';
import { alertService } from '../_services'
import { Create } from './createPackage'
import { history } from "../_helpers";
import $ from 'jquery';
const _thisService = menuproductService;

function Mymenu({ match }) {
  const callApiTrigger = useRef()
  const [scopedItem, setScopedItem] = useState("")

  const columns = [
    {
      Header: 'Name',
      accessor: 'name'
    },
    {
      Header: 'Category',
      accessor: row => (row.category)?row.category.name:""
    },
    {
      Header: 'Brand',
      accessor: row => (row.brand)?row.brand.name:"NONE"
    },
    // {
    //   Header: 'Brand',
    //   accessor: row => row.brand.name
    // },
    {
      Header: 'Strain',
      accessor: row => (row.strain)?(row.strain.name):(<p style={{color:"red"}}>MISSING</p>)
    },
    {
    Header: 'Actions',
    width:"100px",

      Cell:({row})=>(
        <span style={{width:"100px"}} class="dropdown ml-1 position-static">
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

   
function deleteByID(id){
  if(window.confirm("Are you sure do you want to delete this item?")){
    _thisService.delete(id).then(()=>{
      alertService.success('Item deleted successfully', { keepAfterRouteChange: true })
      callApiTrigger.current.fetchData();
    });
  };     
}

function scopeItem(object){
  history.push(`mymenu/update/${object._id}`)
}


const details = (id) => {
  history.push(`mymenu/${id}`)
}

  
    return (
      <>
        <Create product={scopedItem} />
        <PageHeader title="USER/MYLIST" link="mymenu/create" nameButton="Add product" subtitle="Products list"  />
        <div className="box">
          <MainTable ref={callApiTrigger} details={details} title={"MY MENU"} endPoint={_thisService.getMyList} columns={columns} scopeItem={scopeItem} deleteByID={deleteByID}/>
        </div>
      </>
    );


    }
export { Mymenu };