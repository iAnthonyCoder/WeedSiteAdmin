import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, FieldArray  } from 'formik';
import $ from 'jquery'

import { alertService, packageService } from '../_services';

function Add(props) {
  const [product, setProduct] = useState("")
   
  useEffect(() => {
    setProduct(props.product)
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


    function onSubmit(fields, { setStatus, setSubmitting, resetForm }) {
        setStatus();
  
        packageService.create(fields)
            .then((data) => {
               resetForm({});
                alertService.success('Item added!', { keepAfterRouteChange: true });
                $("#modal-new-package").modal("hide");
                // props.addNew(data.payload);
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    return (
      
        
   

      <Formik
        enableReinitialize
        initialValues={{ packags: ['jared'], product:props.product._id, name:props.product.name }}
        onSubmit={onSubmit}
        render={({ values, handleReset, isSubmitting }) => (
          <div className="modal modal-blur fade" id="modal-new-package" tabindex="-1" role="dialog" style={{display: "none", paddingRight:"15px", ariaModal:"true"}} >
          <Form>
            
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div className="modal-content">
            
            <FieldArray
              name="packags"
              render={arrayHelpers => (
                
                <div>
                  <div className="modal-header">
                <h5 className="modal-title">Add {values.name} into my store</h5>
           
                    

      
              </div>
              <div className="modal-body">
                  <div className="row">
              <Field className="form-control" type="hidden" value={values.product} name="product" />
                  {values.packags && values.packags.length > 0 ? (
                        values.packags.map((packag, index) => (
                            <div key={index} class="col-lg-4">
                                <fieldset class="form-fieldset">
                                    <div class="card-header" style={{display: "flex", justifyContent: "space-between", padding: "0px"}}>
                                        <h4 class="card-title">Package</h4>
                                        <button tabindex="-1" type="button" class="btn btn-danger" style={{marginTop: "-30px", padding: "5px", marginRight: "-12px", lineHeight: "10px"}}>
                                            x
                                        </button>
                                    </div>
                                    <br></br>
                                    <div class="mb-3">
                                        <label class="form-label">Weight(Gr) </label>
                                        <Field className="form-control" type="number" name={`packags.[${index}].value`} />
                                        <small style={{color: "red"}}>leave empty if it's per each</small>
                                    </div>
                                    <div class="mb-3"><label class="form-label">Price</label>
                                        <Field className="form-control" type="number" name={`packags.[${index}].price`} />
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Description</label>
                                        <Field placeholder="Enter description" className="form-control" as="textarea" name={`packags.[${index}].description`} />
                                    </div>
                                    <Field type="checkbox" name={`packags.[${index}].stock`} id="stock" className={'form-check-input'} />
                                    <label for="stock" class="form-check-label">&nbsp;  In stock</label>
                                </fieldset>
                            </div>
                     
                     
                     
                //       <div key={index}>
                //         <div style={{paddingTop:"18px",borderTop: "1px solid rgba(110,117,130,.1)"}}className="row">
                //         <div className="col-lg-5">
                //           <div className="mb-3">
                //             <label className="form-label">Weight in Grams </label>
                //             <Field className="form-control" type="number" name={`packags.[${index}].value`} />
                //             <small>leave empty if it's per each</small>
                //             {/* <ErrorMessage component="div" className="invalid-feedback" name={`package.[${index}].value`} /> */}
                //           </div>
                //         </div>
                //         <div className="col-lg-6">
                //           <div className="mb-3">
                //             <label className="form-label">Price</label>
                //             <Field className="form-control" type="number" name={`packags.[${index}].price`} />
                //             {/* <ErrorMessage component="div" className="invalid-feedback" name={`package.[${index}].price`} /> */}
                            
                            
                //           </div>
                //         </div>
                //         <div className="col-lg-1">
                     
                //      <div className="mb-3">
                
                //      <button
                //      tabIndex="-1" 
                //      type="button"
                //      className="btn btn-danger"
                //      onClick={() => arrayHelpers.remove(index)} // remove a packag from the list
                //    >
                //      x
                //    </button>
                //      </div>
                //    </div>
                 
                        
                //         <div className="col-lg-10">
                //           <div className="mb-3">
                //             {/* <label className="form-label">Description</label> */}
                //             <Field placeholder="Enter description" className="form-control" as="textarea" name={`packags.[${index}].description`} />
                //             {/* <ErrorMessage component="div" className="invalid-feedback" name={`package.[${index}].price`} /> */}
                            
                            
                //           </div>
                         
                //         </div>
                //         <div className="col-lg-2">
                //         <Field type="checkbox" name={`packags.[${index}].stock`} id="stock" className={'form-check-input'} />
                //         <label htmlFor="stock" className="form-check-label">&nbsp;  In stock</label>
                          
                //         </div>
                        
                //       </div>
                //       </div>
                      
                    ))
                  ) : (
                    ""
                  )}
                    <div  class="col-lg-4">
                                <fieldset onClick={() => arrayHelpers.push('')} style={{width:"100%", cursor:"pointer"}} class="form-fieldset">
                                    <div style={{display:"flex", alignItems:"center", height:"8em",justifyContent:"center", flexDirection: "column"}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="100" height="100" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                        Add a package more
                                    </div>
                                </fieldset>
                                
                            </div>



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
                </div>
              )}
            />
            </div>
          </div>
          </Form>
          </div>
        )}
      />
   
 
        )
}

export { Add };



















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