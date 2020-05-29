import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, FieldArray  } from 'formik';
import { packageService, alertService } from '../_services';
import { history } from '../_helpers/history'
const _thisService = packageService;


function Edit(props) {
  const [items, setItems] = useState("")
  const [product, setProduct] = useState("")

  const fetchItems = async (id) => {
    await _thisService.getAllByProductId(id).then(
      async(res) => {
        setItems(res.packages);
        setProduct(res.product[0]);
      }
    )
    
}

  useEffect(() => {
    fetchItems(props.match.params.id)
  }, [])


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


    function deleteByID(id){
      if(window.confirm("Are you sure do you want to delete this item?")){
        _thisService.delete(id).then(()=>{
          alertService.success('Item deleted successfully', { keepAfterRouteChange: true })
          let filteredState = items.filter( item => item._id !== id );
          setItems(filteredState)
        });
      };     
    }


    function onSubmit(fields, { setStatus, setSubmitting, resetForm }) {
        setStatus();
        packageService.update(props.match.params.id, fields)
            .then((newItem) => {
                setItems(items.map(item => (item._id === newItem._id ? newItem : item)))
                resetForm({});
                alertService.success('Items edited!', { keepAfterRouteChange: true });
                history.push("/product/mylist")
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    return (
      <Formik
      enableReinitialize
      initialValues={{ packags: items }}
      onSubmit={onSubmit}
      render={({ values, handleReset, isSubmitting }) => (
        <Form>
          <div className="row">
            <div className="col">
             
              <div className="card">
                <FieldArray
                  name="packags"
                  render={arrayHelpers => (
                    <>
                      <div className="card-header" style={{display: "flex",justifyContent: "space-between"}}>

                        <h3 className="card-title">Edit packages</h3>
                       

                        <button type="button" onClick={() => arrayHelpers.push('')} className="btn btn-primary">Add another package</button>

                      </div>
                    
                      <div className="card-body">
                      <div className="row">
                               <div  className="col-lg-4">
                                    <div className="mb-3" style={{alignItems: "center",justifyContent: "center",display: "flex"}}>
                                        <img className="object-cover" style={{width:"250px"}} src={product.picture}></img>
                                    </div>  
                               </div>
                         
                               <div className="col-lg-8">
                                    <span className="badge badge-success">{(product.category)?product.category.name:""}</span>
                                    <h1 style={{textTransform: "uppercase"}}>{product.name}</h1>
                                    <h4 className="text-muted">BY {(product.brand)?product.brand.name:""}</h4>
                                    
                                    <div className="row"><div className="col-auto"><p style={{color:"rgb(147, 152, 6)", fontSize:"1em", marginBottom:"0em"}}>★★★★★</p></div><div className="col-auto">500 Ratings</div></div>
                                      

                                   <hr style={{margin: "0 0"}}></hr>
                                     {/* <br></br>
                                    <div className="row">
                                        <div className="col-auto"><h1 style={{marginBottom:"0"}}>$59.59</h1></div><div className="col-auto" style={{display: "flex",alignItems: "flex-end"}}><h4 style={{marginBottom:"2px"}}>per 1g</h4></div></div>
                                     
                                        <hr></hr> */}<br></br>
                                    <p>{product.description}</p>
                               </div>
                           </div>
                        <Field className="form-control" type="hidden" value={values.product} name="product" />
                        <div style={{paddingTop:"18px",borderTop: "1px solid rgba(110,117,130,.1)"}}className="row">
                        {
                          values.packags && values.packags.length > 0 ? (
                            values.packags.map((packag, index) => (

                          <div className="col-lg-3" key={index}>
                            <fieldset className="form-fieldset">
                              <div className="card-header" style={{display: "flex",justifyContent: "space-between", padding:0}}>
                                <h4 className="card-title">Package</h4>
                                <button
                                  tabIndex="-1" 
                                  type="button"
                                  className="btn btn-danger"
                                  style={{marginTop: "-30px",
                                    padding: "5px",
                                    marginRight: "-12px",
                                    lineHeight: "10px",
                                  }}
                                  onClick={() => {deleteByID(packag._id)}} // remove a packag from the list
                                >x</button>
                              </div>
                              <br></br>
                              <div className="mb-3">
                                <label className="form-label">Weight(Gr) </label>  
                                <Field type="hidden" name={`packags.[${index}]._id`}></Field>
                                <Field className="form-control" type="number" name={`packags.[${index}].value`} />
                                <small style={{color:"red"}}>leave empty if it's per each</small>
                                        {/* <ErrorMessage component="div" className="invalid-feedback" name={`package.[${index}].value`} /> */}
                              </div>
                                
                              <div className="mb-3">
                                <label className="form-label">Price</label>
                                <Field className="form-control" type="number" name={`packags.[${index}].price`} />
                                {/* <ErrorMessage component="div" className="invalid-feedback" name={`package.[${index}].price`} /> */}
                              </div>
                                
                              <div className="mb-3">
                                <label className="form-label">Description</label>
                                <Field placeholder="Enter description" className="form-control" as="textarea" name={`packags.[${index}].description`} />
                                {/* <ErrorMessage component="div" className="invalid-feedback" name={`package.[${index}].price`} /> */}
                              </div>
                              <Field type="checkbox" name={`packags.[${index}].stock`} id="stock" className={'form-check-input'} />
                              <label htmlFor="stock" className="form-check-label">&nbsp;  In stock</label>
                            </fieldset>
                            </div>
                          ))
                          ):("")
                        }
                        </div>
                      </div>
                      <div className="card-footer text-right">
                        <div className="d-flex">
                          <a href="#" className="btn btn-link" data-dismiss="modal"  onClick={handleReset}>Cancel</a>
                          <button type="submit" disabled={isSubmitting} className="btn btn-primary ml-auto">
                            {   isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span> }
                            Save
                          </button>
                      </div>
                    </div>
                  </>
                )}/>
              </div>
            </div>
          </div>
        </Form>
       
      )}
    />



  
 
        )
}

export { Edit };



















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