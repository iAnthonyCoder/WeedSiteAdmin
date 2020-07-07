import React, {useState, useRef} from 'react';
import { Link } from 'react-router-dom';

import { orderService, alertService } from '../_services';
import {history} from '../_helpers'
import { PageHeader, TableCardHeader, UserTable, LoadingSpinner, MainTable } from '../_components';

// import { Add } from '../packages/create'
import $ from 'jquery';

function Table({ match }) {
    const [scopedItem, setScopedItem] = useState("")
    const callApiTrigger = useRef()

    const columns = [
      {
        Header: 'Status',
        Cell:({row})=>(
          (row.original.status=="PENDING")?<span class="badge badge-info">{row.original.status}</span>:
          (row.original.status=="ACCEPTED")?<span class="badge badge-success">{row.original.status}</span>:
          (row.original.status=="REJECTED")?<span class="badge badge-danger">{row.original.status}</span>:
          (row.original.status=="READY")?<span class="badge badge-success">{row.original.status}</span>:
          (row.original.status=="COMPLETED")?<span class="badge badge-success">{row.original.status}</span>:
          ""
        )
      },
      {
        Header: 'Number',
        accessor: 'number'
      },
      {
        Header: 'Product',
        accessor: 'productName'
      },
      {
        Header: 'Variant',
        accessor: row => row.packageWeight+row.packageType
      },
      {
        Header: 'Quantity',
        accessor: row => row.quantity
      },
      {
        Header: 'Subtotal',
        accessor: row => row.subtotal
      },
      {
        Header: 'Buyer email',
        accessor: row => row.user.email
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

                <button onClick={()=>{details(row.original._id)}} class="dropdown-item">
                  Review
                </button>
              </div>
            </span>
        )
      }
  ]

  
      const details = (id) => {
        history.push(`orders/${id}`)
      }

      const filterParams = [
        {
          value:"",
          label:"ALL",
        },
        {
          value:"&status=PENDING",
          label:"PENDING",
        },
        {
          value:"&status=ACCEPTED",
          label:"ACCEPTED",
        },
        {
          value:"&status=REJECTED",
          label:"REJECTED",
        },
        {
          value:"&status=READY",
          label:"READY",
        },
        {
          value:"&status=COMPLETED",
          label:"COMPLETED",
        }
      ]
  
  
  
    return (
      <>
        {/* <Add product={scopedItem} /> */}
        <PageHeader title="dispensary/orders" 
        // link="/product/create" 
        // nameButton="Request a brand product inclussion" 
        subtitle="Orders"/>
        
        <div className="box">
          
          <MainTable ref={callApiTrigger} filterParams={filterParams} title={"ORDERS"}  endPoint={orderService.getAll} columns={columns} />
        </div>
      </>
    );
}

export { Table };