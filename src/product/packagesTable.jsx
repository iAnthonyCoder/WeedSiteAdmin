import React, { useState, useRef } from 'react';
import { PageHeader, MainTable  } from '../_components'
import { packageService, alertService } from '../_services';
import { history } from '../_helpers/history'
import { Create } from './createPackage';
import { Update } from './updatePackage';
import $ from 'jquery'
import odds from 'odds-converter'
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
                    <button onClick={()=>{deleteByID(row.original._id)}} class="dropdown-item">
                      Delete
                    </button>
                  </div>
                </span>
            )
        }
    ]

//   const fetchItems = async (id) => {
//     await _thisService.getAllByProductId(id).then(
//       async(res) => {
//         setItems(res);
//       }
//     )
//}

//   useEffect(() => {
//     fetchItems(props.menuProductId)
//   }, [])


    // const validationSchema = Yup.object().shape({
    //     packags: Yup.array()
    //       .of(
    //         Yup.object().shape({
    //           value: Yup.string()
    //             .required('Required'), // these constraints take precedence
    //           price: Yup.string()
    //             .required('Required'), // these constraints take precedence
    //         })
    //       )
    //       .required('Must have a package') // these constraints are shown if and only if inner constraints are satisfied
    //   });

    function scopeItem(object){
        setScopedItem(object);
        $("#modal-update").modal("show");
  }

  
    function deleteByID(id){
      if(window.confirm("Are you sure do you want to delete this item?")){
        _thisService.delete(id).then(()=>{
          alertService.success('Item deleted successfully', { keepAfterRouteChange: true })
          callApiTrigger.current.fetchData();
        });
      };     
    }
    function addNew(){
        callApiTrigger.current.fetchData();
      }

      function updateOne(_id, newItem){
        callApiTrigger.current.fetchData();
  }
    // function onSubmit(fields, { setStatus, setSubmitting, resetForm }) {
    //     setStatus();
    //     packageService.update(props.match.params.id, fields)
    //         .then((newItem) => {
    //             setItems(items.map(item => (item._id === newItem._id ? newItem : item)))
    //             resetForm({});
    //             alertService.success('Items edited!', { keepAfterRouteChange: true });
    //             history.push("/product/mylist")
    //         })
    //         .catch(error => {
    //             setSubmitting(false);
    //             alertService.error(error);
    //         });
    // }

    return (
        <>
        
            <Create menuProduct={props.menuProductId}  addNew={addNew}  />
            <Update menuProduct={props.menuProductId} updateOne={updateOne} object={scopedItem}/>
            <div style={{paddingTop:".75rem", paddingRight:"1.25rem"}} >
            <PageHeader  nameButton="Add variants" toggle="modal" target="#modal-create" /> </div>
	        <div className="box">
	            <MainTable ref={callApiTrigger}  param={props.menuProductId} endPoint={packageService.getAllByProductId} columns={columns} deleteByID={deleteByID}/>
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