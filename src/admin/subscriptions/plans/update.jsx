










import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import $ from 'jquery';
import { planService, alertService } from '../../../_services';

function Update(props) {
   

    const initialValues = {
		_id:props.object._id,
        name: props.object.name,
		description: props.object.description,
		days: props.object.days,
		price: props.object.price,
		isEnabled: props.object.isEnabled
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
			.required('Name is required'),
		days: Yup.string()
			.required('Days is required'),
		price: Yup.string()
            .required('Price is required'),
        description: Yup.string()
            .required('Description is required'),
    });



    function onSubmit(fields, { setStatus, setSubmitting, resetForm }) {
        setStatus();
        planService.update(fields._id,fields)
            .then((data) => {
            	resetForm({});
            	alertService.success('Item updated successfully', { keepAfterRouteChange: true });
            	$("#modal-update").modal("hide");
            	props.updateOne(fields._id, fields);
            })
            .catch(error => {
                setSubmitting(false);
                // alertService.error(error);
            });
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} enableReinitialize  onSubmit={onSubmit}>
        {({ errors, touched, setFieldValue, isSubmitting, handleReset }) => (
        	<Form>
         		<div className="modal modal-blur fade" id="modal-update" tabIndex="-1" role="dialog" style={{display: "none"}} aria-hidden="true">
       				<div className="modal-dialog modal-dialog-centered" role="document">
         				<div className="modal-content">
           					<div className="modal-header">
             					<h5 className="modal-title">Add a new plan</h5>
             					<button type="button" className="close" data-dismiss="modal" aria-label="Close">
               						<svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
             					</button>
           					</div>
           					<div className="modal-body">
             					<div className="row mb-3 align-items-end">
               						{/* <div className="col-auto">
               						  <a href="#" className="avatar avatar-upload rounded">
               						    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
               						    <span className="avatar-upload-text">Add</span>
               						  </a>
               						</div> */}
               						<div className="col">
               							<label className="form-label">Name</label>
               							<Field name="name" type="text" placeholder="Enter name" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
               						    <ErrorMessage name="name" component="div" className="invalid-feedback" />
               						</div>
             					</div>
								 <div className="mb-3">
             						<div>
            			 				<label className="form-label">Days</label>
            			 				<Field name="days" type="number" placeholder="Enter number of days" className={'form-control' + (errors.days && touched.days ? ' is-invalid' : '')} ></Field>
            			 				<ErrorMessage name="days" component="div" className="invalid-feedback" />
             						</div>
           						</div>
								   <Field name="_id" type="hidden"></Field>
								   <div className="mb-3">
             						<div>
            			 				<label className="form-label">Price</label>
            			 				<Field name="price" type="number"  placeholder="Enter total price" className={'form-control' + (errors.price && touched.price ? ' is-invalid' : '')} ></Field>
            			 				<ErrorMessage name="price" component="div" className="invalid-feedback" />
             						</div>
           						</div>
             					<div className="mb-3">
             						<div>
            			 				<label className="form-label">Description</label>
            			 				<Field name="description" as="textarea" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} data-toggle="autosize" placeholder="Enter description" style={{overflow: "hidden", overflowWrap: "break-word", resize: "none", height: "53.9792px"}}></Field>
            			 				<ErrorMessage name="description" component="div" className="invalid-feedback" />
             						</div>
           						</div>
								   <div className="mb-3">
                  					  <label className="form-check">
                  					      <Field type="checkbox" name="isEnabled" id="isEnabled" className={'form-check-input ' + (errors.isEnabled && touched.isEnabled ? ' is-invalid' : '')} />
                  					      <label htmlFor="isEnabled" className="form-check-label">Enabled</label>
                  					      <ErrorMessage name="isEnabled" component="div" className="invalid-feedback" />
                  					  </label>
                  					</div>
         					</div>
         					<div className="card-footer text-right">
   								<div className="d-flex">
     								<a href="#" className="btn btn-link"  onClick={handleReset}>Cancel</a>
     								<button type="submit" disabled={isSubmitting} className="btn btn-primary ml-auto">
     								    {   isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span> }
     								    Send data
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

























// import React,{ useEffect, useState } from 'react';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// import { subscriptionService, alertService } from '../../_services';


// function Create({ history }) {
  
//     const initialValues = {
//         name: '',
//         description: '',
//     };

//     const validationSchema = Yup.object().shape({
//         name: Yup.string()
//             .required('Title is required'),
//         description: Yup.string()
//             .required('City is required'),
//     });

//     const getSlug = (text) => {
//         var lowerText = text.toLowerCase();
//         var slug = lowerText.replace(/[^a-zA-Z0-9]+/g,'-');
//         return slug;    
//     };
    
//     function onSubmit(fields, { setStatus, setSubmitting }) {
//         setStatus();
//         fields.slug=getSlug(fields.name);
//         subscriptionService.create(fields)
//             .then(() => {
//                 alertService.success('Registration successful, please check your email for verification instructions', { keepAfterRouteChange: true });
//                 history.push('.');
//             })
//             .catch(error => {
//                 setSubmitting(false);
//                 alertService.error(error);
//             });
//     }


//     return (
//         <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
//         {({ errors, touched, isSubmitting }) => (

//         <div className="modal modal-blur fade" id="modal-team" tabIndex="-1" role="dialog" style={{display: "none"}} aria-hidden="true">
//       <div className="modal-dialog modal-dialog-centered" role="document">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">Add a new category</h5>
//             <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//               <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
//             </button>
//           </div>
//           <div className="modal-body">
//             <div className="row mb-3 align-items-end">
//               {/* <div className="col-auto">
//                 <a href="#" className="avatar avatar-upload rounded">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
//                   <span className="avatar-upload-text">Add</span>
//                 </a>
//               </div> */}
//               <div className="col">
//               <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
//                         <ErrorMessage name="name" component="div" className="invalid-feedback" />
//               </div>
//             </div>
//             <div className="mb-3">
//             <div>
//                 <Field name="description" as="textarea" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} data-toggle="autosize" placeholder="Enter description" style={{overflow: "hidden", overflowWrap: "break-word", resize: "none", height: "53.9792px"}}></Field>
//                 <ErrorMessage name="description" component="div" className="invalid-feedback" />
//             </div>
//           </div>
          
//         </div>
//         <div className="card-footer text-right">
//   <div className="d-flex">
//     <a href="#" className="btn btn-link">Cancel</a>

//     <button type="submit" disabled={isSubmitting} className="btn btn-primary ml-auto">
//         {   isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span> }
//         Send data
//     </button>
//   </div>
// </div>
//       </div>
//     </div>
//     </div>
// )}
// </Formik>
// )
// }

// export { Create };



