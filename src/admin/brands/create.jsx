










import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import $ from 'jquery';
import { brandService, alertService } from '../../_services';

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
      
        brandService.create(fields)
            .then((data) => {
              resetForm({});
                alertService.success('Item saved', { keepAfterRouteChange: true });
                $("#modal-create").modal("hide");
                props.addNew(data.payload);
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ errors, touched, setFieldValue, isSubmitting }) => (
          <Form>
         <div class="modal modal-blur fade" id="modal-team" tabIndex="-1" role="dialog" style={{display: "none"}} aria-hidden="true">
       <div class="modal-dialog modal-dialog-centered" role="document">
         <div class="modal-content">
           <div class="modal-header">
             <h5 class="modal-title">Add a new brand</h5>
             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
               <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
             </button>
           </div>
           <div class="modal-body">
             <div class="row mb-3 align-items-end">
               {/* <div class="col-auto">
                 <a href="#" class="avatar avatar-upload rounded">
                   <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                   <span class="avatar-upload-text">Add</span>
                 </a>
               </div> */}
               <div class="col">
               <label class="form-label">Name</label>
               <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                         <ErrorMessage name="name" component="div" className="invalid-feedback" />
               </div>
             </div>
             <div class="mb-3">
             <div>
             <label class="form-label">Description</label>
                 <Field name="description" as="textarea" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} data-toggle="autosize" placeholder="Enter description" style={{overflow: "hidden", overflowWrap: "break-word", resize: "none", height: "53.9792px"}}></Field>
                 <ErrorMessage name="description" component="div" className="invalid-feedback" />
             </div>
           </div>



           <div class="mb-3 row">
           <div>
           <label class="form-label">Picture</label>
                          <input id="picture" name="picture" type="file" onChange={(event) => {
                    setFieldValue("picture", event.currentTarget.files[0]);
                  }} className="form-label col-3 col-form-label" className={'form-control' + (errors.picture && touched.picture ? ' is-invalid' : '')}/>
                  <ErrorMessage name="brand" component="div" className="invalid-feedback" />
                         
                             {/* <Field name="picture" accept="image/x-png,image/gif,image/jpeg" type="file" id="form-file-input" className={'form-control' + (errors.picture && touched.picture ? ' is-invalid' : '')} />
                              <label class="form-file-label" for="customFile">
                               <span class="form-file-text">Choose file...</span>
                               <span class="form-file-button">Browse</span>
                             </label> 
                             <ErrorMessage name="picture" component="div" className="invalid-feedback" /> */}
                     
                        </div>
                  </div>








        
         </div>
         <div class="card-footer text-right">
   <div class="d-flex">
     <a href="#" class="btn btn-link">Cancel</a>
     <button type="submit" disabled={isSubmitting} className="btn btn-primary ml-auto">
         {   isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span> }
         Send data
     </button>
   </div>
 </div>
       </div>
     </div>
     </div></Form>
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

//         <div class="modal modal-blur fade" id="modal-team" tabIndex="-1" role="dialog" style={{display: "none"}} aria-hidden="true">
//       <div class="modal-dialog modal-dialog-centered" role="document">
//         <div class="modal-content">
//           <div class="modal-header">
//             <h5 class="modal-title">Add a new category</h5>
//             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//               <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
//             </button>
//           </div>
//           <div class="modal-body">
//             <div class="row mb-3 align-items-end">
//               {/* <div class="col-auto">
//                 <a href="#" class="avatar avatar-upload rounded">
//                   <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
//                   <span class="avatar-upload-text">Add</span>
//                 </a>
//               </div> */}
//               <div class="col">
//               <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
//                         <ErrorMessage name="name" component="div" className="invalid-feedback" />
//               </div>
//             </div>
//             <div class="mb-3">
//             <div>
//                 <Field name="description" as="textarea" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} data-toggle="autosize" placeholder="Enter description" style={{overflow: "hidden", overflowWrap: "break-word", resize: "none", height: "53.9792px"}}></Field>
//                 <ErrorMessage name="description" component="div" className="invalid-feedback" />
//             </div>
//           </div>
          
//         </div>
//         <div class="card-footer text-right">
//   <div class="d-flex">
//     <a href="#" class="btn btn-link">Cancel</a>

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


