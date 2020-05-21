import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import $ from 'jquery';
import { categoryService, alertService } from '../../_services';

function Create(props) {
   

    const initialValues = {
        name: '',
        description: '',
    };



    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        description: Yup.string()
            .required('Description is required'),
    });

    const getSlug = (text) => {
        var lowerText = text.toLowerCase();
        var slug = lowerText.replace(/[^a-zA-Z0-9]+/g,'-');
        return slug;    
    };


    function onSubmit(fields, { setStatus, setSubmitting, resetForm }) {
        setStatus();
        fields.slug=getSlug(fields.name);
      
        categoryService.create(fields)
            .then((data) => {
              resetForm({});
                alertService.success('Item saved successfully', { keepAfterRouteChange: true });
                $("#modal-create").modal("hide");
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
         		<div className="modal modal-blur fade" id="modal-create" tabIndex="-1" role="dialog" style={{display: "none"}} aria-hidden="true">
       				<div className="modal-dialog modal-dialog-centered" role="document">
         				<div className="modal-content">
           					<div className="modal-header">
             					<h5 className="modal-title">Add a new category</h5>
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
            			 				<label className="form-label">Description</label>
            			 				<Field name="description" as="textarea" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} data-toggle="autosize" placeholder="Enter description" style={{overflow: "hidden", overflowWrap: "break-word", resize: "none", height: "53.9792px"}}></Field>
            			 				<ErrorMessage name="description" component="div" className="invalid-feedback" />
             						</div>
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
export { Create };

























// import React,{ useEffect, useState } from 'react';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// import { categoryService, alertService } from '../../_services';


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
//         categoryService.create(fields)
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



