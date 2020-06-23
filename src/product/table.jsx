import React, {useState, useRef} from 'react';
import { Link } from 'react-router-dom';

import { menuproductService, productService, alertService } from '../_services';
import {history} from '../_helpers'
import { PageHeader, TableCardHeader, UserTable, LoadingSpinner, MainTable } from '../_components';
// import { Add } from '../packages/create'
import $ from 'jquery';

function Table({ match }) {
    const [scopedItem, setScopedItem] = useState("")
    const callApiTrigger = useRef()

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
                <button onClick={()=>{details(row.original._id)}} class="dropdown-item">
                  Details
                </button>
                <button onClick={()=>{addIntoMyMenu(row.original._id)}} class="dropdown-item">
                  Add into my menu
                </button>
                {/* <button onClick={()=>{scopeItem(row.original)}} class="dropdown-item">
                  Add into my menu
                </button> */}
              </div>
            </span>
        )
      }
  ]

      const details = (id) => {
        history.push(`products/${id}`)
      }
  
      const addIntoMyMenu = (productId) =>{
        menuproductService.create({product: productId})
          .then(() => {
              alertService.success('Item added!', { keepAfterRouteChange: true });
          })
          .catch(() => {

          });
      }
  
    return (
      <>
        {/* <Add product={scopedItem} /> */}
        <PageHeader title="Available products" 
        // link="/product/create" 
        // nameButton="Request a brand product inclussion" 
        subtitle="Right click on an Item and select Add option"/>
        <div className="box">
          <MainTable ref={callApiTrigger} title={"BRAND PRODUCTS"} endPoint={productService.getAll} columns={columns} />
        </div>
      </>
    );
}

export { Table };