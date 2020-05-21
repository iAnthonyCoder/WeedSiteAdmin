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
        initialValues={{ packags: ['jared'], product:props.product._id }}
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
                <h5 className="modal-title">Add PRODUCT to my store</h5>
           
                    <button type="button" onClick={() => arrayHelpers.push('')} className="btn btn-primary">Add another package</button>

      
              </div>
              <div className="modal-body">
              <Field className="form-control" type="hidden" value={values.product} name="product" />
                  {values.packags && values.packags.length > 0 ? (
                    values.packags.map((packag, index) => (
                      <div key={index}>
                        <div style={{paddingTop:"18px",borderTop: "1px solid rgba(110,117,130,.1)"}}className="row">
                        <div className="col-lg-5">
                          <div className="mb-3">
                            <label className="form-label">Weight in Grams </label>
                            <Field className="form-control" type="number" name={`packags.[${index}].value`} />
                            <small>leave empty if it's per each</small>
                            {/* <ErrorMessage component="div" className="invalid-feedback" name={`package.[${index}].value`} /> */}
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">Price</label>
                            <Field className="form-control" type="number" name={`packags.[${index}].price`} />
                            {/* <ErrorMessage component="div" className="invalid-feedback" name={`package.[${index}].price`} /> */}
                            
                            
                          </div>
                        </div>
                        <div className="col-lg-1">
                     
                     <div className="mb-3">
                
                     <button
                     tabIndex="-1" 
                     type="button"
                     className="btn btn-danger"
                     onClick={() => arrayHelpers.remove(index)} // remove a packag from the list
                   >
                     x
                   </button>
                     </div>
                   </div>
                 
                        
                        <div className="col-lg-10">
                          <div className="mb-3">
                            {/* <label className="form-label">Description</label> */}
                            <Field placeholder="Enter description" className="form-control" as="textarea" name={`packags.[${index}].description`} />
                            {/* <ErrorMessage component="div" className="invalid-feedback" name={`package.[${index}].price`} /> */}
                            
                            
                          </div>
                         
                        </div>
                        <div className="col-lg-2">
                        <Field type="checkbox" name={`packags.[${index}].stock`} id="stock" className={'form-check-input'} />
                        <label htmlFor="stock" className="form-check-label">&nbsp;  In stock</label>
                          
                        </div>
                        
                      </div>
                      </div>
                      
                    ))
                  ) : (
                    ""
                  )}
                 
                  </div>
                  <div className="card-footer text-right">
                  <div className="d-flex">
                    <a href="#" className="btn btn-link" data-dismiss="modal"  onClick={handleReset}>Cancel</a>
                    <button type="submit" disabled={isSubmitting} className="btn btn-primary ml-auto">
                        {   isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span> }
                        Send data
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
                            Send data
                        </button>
              </div>
            
          </Form> */}