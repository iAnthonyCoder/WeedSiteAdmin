










import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import $ from 'jquery';
import { productService, categoryService, brandService, alertService } from '../../_services';

function Update(props) {
   

    const initialValues = {
        name: props.object.name,
        description: props.object.description,
        brand: (props.object.brand)?props.object.brand._id:"",
        category: (props.object.category)?props.object.category._id:"",
        _id:props.object._id, 
        pictures:props.object.picture,
    };

    const [categories, setCategories] = useState("");
    const [brands, setBrands] = useState("");

    const [picture, setPicture] = useState("props.object.picture")
 
    const fetchItems = () => {
      categoryService.getAll().then((res) => {
        setCategories(res);
      })
      brandService.getAll().then((res) => {
        setBrands(res);
      })
    }

    useEffect(() => {
     
      fetchItems();
    }, [])
    
    const validationSchema = Yup.object().shape({
      name: Yup.string()
          .required('Name is required'),
      category: Yup.string()
          .required('Category is required'),
      brand: Yup.string()
          .required('Brand is required'),
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
        productService.update(fields._id,fields)
            .then((res) => {
              resetForm({});
                alertService.success('Product is available now!', { keepAfterRouteChange: true });
                $("#modal-update").modal("hide");
                props.updateOne(res.payload._id);
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    return (
      
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize >
        {({ errors, touched, setFieldValue, isSubmitting }) => (
          <Form>
      
         <div className="modal modal-blur fade" id="modal-update" tabIndex="-1" role="dialog" style={{display: "none"}} aria-hidden="true">
       <div className="modal-dialog modal-dialog-centered" role="document">
         <div className="modal-content">
           <div className="modal-header">
             <h5 className="modal-title">Product inclussion request</h5>
             <button type="button" className="close" data-dismiss="modal" aria-label="Close">
               <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
             </button>
            
           </div>
           <div className="modal-body">
             <div className="row mb-3 align-items-end">
                <div className="col-auto">
                 <div   style={{width:"80px", border:"1px solid silver", height:"80px",backgroundSize:"cover", backgroundImage: `url(${initialValues.pictures})`}}></div>
               </div> 
               <div className="col">
               <label className="form-label">Name</label>
               <Field name="name" type="text"  className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                         <ErrorMessage name="name" component="div" className="invalid-feedback" />
               </div>
               



             </div>

             <div className="mb-3">
                    <label className="form-label">Brand</label>
                    <Field name="brand" className="form-label col-3 col-form-label" as="select" className={'form-control' + (errors.brand && touched.brand ? ' is-invalid' : '')} >
                          <option value="">Seleccione</option>
                          {
                            brands && brands.map(brand => <option value={brand._id}>{brand.name}</option>)
                          }
                      </Field>
                      <ErrorMessage name="brand" component="div" className="invalid-feedback" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <Field name="category" className="form-label col-3 col-form-label" as="select" className={'form-control' + (errors.category && touched.category ? ' is-invalid' : '')} >
                          <option value="">Seleccione</option>
                          {
                            categories && categories.map(category => <option value={category._id}>{category.name}</option>)
                          }
                      </Field>
                      <ErrorMessage name="category" component="div" className="invalid-feedback" />
                  </div>

             <div className="mb-3">
             <div>
             <label className="form-label">Description</label>
                 <Field name="description" as="textarea"  className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} data-toggle="autosize" placeholder="Enter description" style={{overflow: "hidden", overflowWrap: "break-word", resize: "none", height: "53.9792px"}}></Field>
                 <ErrorMessage name="description" component="div" className="invalid-feedback" />
             </div>
           </div>




           <div className="mb-3">
             <div>
             <label className="form-label">Picture</label>

           <input id="picturea" name="picture" type="file" onChange={(event) => {
                    setFieldValue("picture", event.currentTarget.files[0]);
                  }} className="form-label col-3 col-form-label" className={'form-control' + (errors.picture && touched.picture ? ' is-invalid' : '')}/>
                  <ErrorMessage name="brand" component="div" className="invalid-feedback" />
                  <small className="form-hint">
              Leave it empty if you don't want to update the preview image.<br></br>
              If you add a new one, you will see changes in the next refresh.
            </small>
                  </div>
           </div>
               <Field name="_id" type="hidden"></Field>

     



        
         </div>
         <div className="card-footer text-right">
   <div className="d-flex">
     <a href="#" className="btn btn-link">Cancel</a>
    
     <button type="submit" disabled={isSubmitting} className="btn btn-primary ml-auto">
         {   isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span> }
         Approve
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

export { Update };

























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
//         Save
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



