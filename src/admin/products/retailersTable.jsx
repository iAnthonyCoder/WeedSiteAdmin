import React, { useState, useRef } from 'react';
import { PageHeader, MainTable  } from '../../_components'
import { packageService, alertService, menuproductService } from '../../_services';
import { history } from '../../_helpers/history'
import $ from 'jquery'
const _thisService = packageService;


function RetailersTable(props) {
    const callApiTrigger = useRef()
    const [scopedItem, setScopedItem] = useState("")
    const [items, setItems] = useState("")
    const [product, setProduct] = useState("")

    const columns =  [
        {
          Header: 'dispensary',
          accessor: 'dispensary.name'
        },
        {
          Header: 'city',
          accessor: 'dispensary.city.name'
        },
        {
          Header: 'email',
          accessor: 'dispensary.email'
        },
        {
          Header: 'Actions',
          width:"100px",
    
            Cell:({row})=>(
              <span style={{width:"100px"}} class="dropdown position-static">
                <button class="btn btn-white btn-sm dropdown-toggle align-text-top show" data-boundary="viewport" data-toggle="dropdown" aria-expanded="true">Actions</button>
                  <div class="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style={{position: "absolute", willChange: "transform", top: "0px", left: "0px", transform: "translate3d(852px, 181px, 0px)"}}>
                    <button onClick={()=>{seeDetails(row.original.dispensary.user)}} class="dropdown-item">
                      Details
                    </button>
                  </div>
                </span>
            )
          }
      ]

    const seeDetails = (id) => {
      history.push(`../users/${id}`)
    }

    return (
        <>
	        <div className="box">
	            <MainTable ref={callApiTrigger}  param={props.itemId} endPoint={menuproductService.getRetailers} columns={columns} />
	        </div>
        </>
    )
}

export { RetailersTable };



















    {/* <Form>
          
              <div className="modal-body">
                  <
                
                </div>
              <div className="modal-footer">
                
               
                <button type="submit" disabled={isSubmitting}  className="btn btn-primary ml-auto">
                            {
                            
                            isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>
                            
                            }
                            Save
                        </button>
              </div>
            
          </Form> */}