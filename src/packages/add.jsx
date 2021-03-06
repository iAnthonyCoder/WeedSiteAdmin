import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, FieldArray, ErrorMessage, validationSchema  } from 'formik';
import $ from 'jquery'
import * as Yup from 'yup';
import { alertService, packageService } from '../_services';

function Add(props) {
  const [product, setProduct] = useState("")
   
  useEffect(() => {
    setProduct(props.product)
  }, [])

    const initialValues = {
        value: '0',
        price: '',
        stock: false,
        description: '',
    }

    const validationSchema = Yup.object().shape({
        value: Yup.number()
            .required('Value is required'),
        price: Yup.number()
            .required('Value is required'),
        description: Yup.string()
			
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
        setStatus();
  
        packageService.create(fields)
            .then((data) => {
               resetForm({});
                alertService.success('Item added!', { keepAfterRouteChange: true });
                $("#modal-new-package").modal("hide");
                props.addNew(data.payload);
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    return (
      
        
   

      <Formik initialValues={initialValues} validationSchema={validationSchema}  onSubmit={onSubmit}>
        {({ errors, touched, setFieldValue, isSubmitting, handleReset }) => (
        	<Form>
                {alert("a")}
         		<div className="modal modal-blur fade" id="modal-create" tabIndex="-1" role="dialog" style={{display: "none"}} aria-hidden="true">
       				<div className="modal-dialog modal-dialog-centered" role="document">
         				<div className="modal-content">
           					<div className="modal-header">
             					<h5 className="modal-title">Add a new variant</h5>
             					<button type="button" className="close" data-dismiss="modal" aria-label="Close">
               						<svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
             					</button>
           					</div>
           					<div className="modal-body">
                            <div className="mb-3">
               					<label className="form-label">Weight</label>
               					<Field name="name" type="text" placeholder="Enter name" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
               					<ErrorMessage name="name" component="div" className="invalid-feedback" />
                                <small>Leave this field empty if the variant is sold per each</small>
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
     								<a href="#" className="btn btn-link"  onClick={handleReset}>Cancel</a>
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