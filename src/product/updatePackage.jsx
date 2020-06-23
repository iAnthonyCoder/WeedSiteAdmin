import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage  } from 'formik';
import $ from 'jquery'
import * as Yup from 'yup';
import { alertService, packageService } from '../_services';

function Update(props) {

    const initialValues = {
        value: props.object.value,
        price: props.object.price,
        stock: props.object.stock,
        description: props.object.description,
    }

    const validationSchema = Yup.object().shape({
        value: Yup.number(),
        price: Yup.number()
            .required('Price is required'),
        description: Yup.string()
            .required('Description is required'),
        stock: Yup.bool(),		
    });

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
        console.log(fields);
        setStatus();
        fields.menuProduct = props.menuProduct
        packageService.update(props.object._id, fields)
            .then((data) => {
               resetForm({});
                alertService.success('Item added!', { keepAfterRouteChange: true });
                $("#modal-update").modal("hide");
                props.updateOne();
            })
            .catch(error => {
                setSubmitting(false);
                // alertService.error(error);
            });
    }

    return (
      
        
   

      <Formik initialValues={initialValues} validationSchema={validationSchema}  onSubmit={onSubmit} enableReinitialize>
        {({ errors, touched, isSubmitting, handleReset }) => (
        	<Form>
         		<div className="modal modal-blur fade" id="modal-update" tabIndex="-1" role="dialog" style={{display: "none"}} aria-hidden="true">
       				<div className="modal-dialog modal-dialog-centered" role="document">
         				<div className="modal-content">
           					<div className="modal-header">
             					<h5 className="modal-title">Edit variant</h5>
             					<button type="button" className="close" data-dismiss="modal" aria-label="Close">
               						<svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
             					</button>
           					</div>
           					<div className="modal-body">
                            <div className="mb-3">
               					<label className="form-label">Weight (GR)</label>
               					<Field name="value" type="text" placeholder="Enter value" className={'form-control' + (errors.value && touched.value ? ' is-invalid' : '')} />
               					<ErrorMessage name="value" component="div" className="invalid-feedback" />
                                <small>Leave this field with 0 value if it's sold per each</small>
               			    </div>
                            <div className="mb-3">
               					<label className="form-label">Price</label>
               					<Field name="price" type="text" placeholder="Enter price" className={'form-control' + (errors.price && touched.price ? ' is-invalid' : '')} />
               					<ErrorMessage name="price" component="div" className="invalid-feedback" />
               			    </div>
             				<div className="mb-3">
            			 	    <label className="form-label">Description</label>
            			 		<Field name="description" as="textarea" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} data-toggle="autosize" placeholder="Enter description" style={{overflow: "hidden", overflowWrap: "break-word", resize: "none", height: "53.9792px"}}></Field>
            			 		<ErrorMessage name="description" component="div" className="invalid-feedback" />
           					</div>
                            <div className="mb-3">
                                <Field type="checkbox" name="stock" id="stock" className={'form-check-input'} />
                                <label for="stock" class="form-check-label">&nbsp;  In stock</label>
                                <ErrorMessage name="stock" component="div" className="invalid-feedback" />
                            </div>
         					</div>
         					<div className="card-footer text-right">
   								<div className="d-flex">
     								<a href="#" className="btn btn-link"  onClick={handleReset}>Reset</a>
     								<button type="submit" disabled={isSubmitting} className="btn btn-primary ml-auto">
     								    {   isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span> }
     								    Save
     								</button>
   								</div>
 							</div>
       					</div>
     				</div>
     			</div>
			  </Form>
        )}
        </Formik>
   
 
        )
}

export { Update };



















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