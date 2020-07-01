import React, { useState, useRef } from 'react';
import { PageHeader, MainTable  } from '../../../_components'
import { packageService, alertService } from '../../../_services';
import $ from 'jquery'
const _thisService = packageService;

function PackagesTable(props) {
    const callApiTrigger = useRef()
    const [scopedItem, setScopedItem] = useState("")
    const [items, setItems] = useState("")
    const [product, setProduct] = useState("")

    const columns =  [
        {
            Header: 'weight',
            accessor: row => ((row.type==="g")?(row.value+"g"):(row.type==="oz")?((row.value==1)?("1/8 oz"):(row.value==2)?("1/4 oz"):(row.value==4)?("1/2 oz"):(row.value==8)?("1 oz"):""):"EACH")
        },
        {
            Header: 'price',
            accessor: row => "$"+row.price
        },
        {
            Header: 'stock',
            accessor: row => (row.stock)?"ENABLED":"DISABLED"
        },
        {
            Header: 'description',
            accessor: 'description',
        }
    ]

    return (
        <>
            <div style={{paddingTop:".75rem", paddingRight:"1.25rem"}} >
            <PageHeader  nameButton="Add variants" toggle="modal" target="#modal-create" /> </div>
	        <div className="box">
	            <MainTable ref={callApiTrigger}  param={props.menuProductId} endPoint={packageService.getAllByProductId} columns={columns}/>
	        </div>
        </>
    )
}

export { PackagesTable };



















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