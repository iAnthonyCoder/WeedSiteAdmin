import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import $ from 'jquery';
import { categoryService, alertService, brandService,productService } from '../../_services';

function Update(props) {
   

    const initialValues = {
        name: props.object.name,
        description: props.object.description,
        slug: props.object.slug,
        category:(props.object.category)?props.object.category._id:"",
        brand:(props.object.brand)?props.object.brand._id:"",
        _id:props.object._id
    };

    
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        description: Yup.string()
            .required('Description is required'),
    });

    const [categories, setCategories] = useState("");
    const [brands, setBrands] = useState("");

    const picturesInitialState=[];
	const [pictures, setPictures] = useState(picturesInitialState)

	const removePicture = (pictureObj) => {
	  	let filteredState = pictures.filter( picture => pictureObj !== picture );
        setPictures(filteredState)
	}
  
    const widget = window.cloudinary.createUploadWidget({
            cloudName: 'timj111',
            cropping: true,
            multiple: false,
            showSkipCropButton:false,
            croppingAspectRatio: 1,
            uploadPreset: 'ymhijlld'}, 
            (error, result) => { 
              if (!error && result && result.event === "success") { 
	  			let url = result.info.url
	  			setPictures([pictures.concat(url)])
	  		}
    });

    function showWidget(){
      widget.open()
    }
  

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

    useEffect(() => {
        props.object.picture?setPictures(props.object.picture):setPictures("")
    }, [props])


    const getSlug = (text) => {
        var lowerText = text.toLowerCase();
        var slug = lowerText.replace(/[^a-zA-Z0-9]+/g,'-');
        return slug;    
    };

    function onSubmit(fields, { setStatus, setSubmitting, resetForm }) {
        setStatus();
        fields.picture = pictures
        fields.slug=getSlug(fields.name);
        productService.update(fields._id,fields)
            .then((data) => {
      
              resetForm({});
                alertService.success('Item updated successfully', { keepAfterRouteChange: true });
                $("#modal-update").modal("hide");
                props.updateOne(fields._id, data.payload);
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    return (
      
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize >
        {({ errors, touched, setFieldValue, isSubmitting,values, handleChange, }) => (
          <div className="modal modal-blur fade show" id="modal-update-product" tabindex="-1" role="dialog" aria-modal="true" style={{paddingRight: "15px; display: block"}}>
            <Form>
                {console.log(props.object.picture)}
              <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Update product</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      </button>
                  </div>
                  <div className="modal-body">
                    <div className="row mb-3 align-items-end">
                      <div className="col">
                        <label className="form-label">Name</label>
                        <Field  name="name"
                          render={({ field, form }) => (
                            <input  className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} 
                              {...field}
                              onChange={e => {
                                handleChange(e)
                                var lowerText = e.target.value.toLowerCase();
                                var sluga = lowerText.replace(/[^a-zA-Z0-9]+/g,'-');
                                form.setFieldValue('slug', sluga)
                              }}
                            />
                          )}
              
                        type="text"  /> 
                       <ErrorMessage name="name" component="div" className="invalid-feedback" />
                     </div>
                   </div>
                   <div className="row">
                       <div className="mb-3">
                         <label className="form-label">Product url</label>
                         <div className="input-group input-group-flat">
                           <span className="input-group-text">
                              https://domain.name/products/
                           </span>
                             <Field type="text" name="slug"  className="form-control pl-0" />
                              
                         </div>
                     </div>
                   </div>
                   <div class="row">

								<label className="form-label">Product pictures</label>
								{
                                    
                                    pictures && pictures.map( picture =>
                                       
										<div className="col-auto">
                                            { console.log(picture)}
											<span style={{position: "absolute",color: "red",zIndex: "1",borderRadius: "20px",margin: "-10px"}}>
												<button onClick={()=>{removePicture(picture)}} type="button" style={{borderRadius:"20px",width:"30px", height:"30px"}} class="btn btn-danger">x</button>
											</span>
               						  		<a style={{width:"80px", border:"1px solid silver", height:"80px",backgroundSize:"cover",backgroundPositionX: "center", backgroundImage: `url(${picture})`}} className="avatar avatar-upload rounded">
               						  		</a>
               							</div> 
									)
								}
            	    			<div className="col-auto">
               						  <a href="#" onClick={showWidget} style={{width:"80px", border:"1px solid silver", height:"80px",backgroundSize:"cover", backgroundImage: `url(${""})`}} className="avatar avatar-upload rounded">
               						    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
               						    <span className="avatar-upload-text">Add</span>
               						  </a>
               						</div> 
								</div>   
                  </div>


                  <div className="modal-body">
                    <div className="row">
                      <div className="col-lg-6">
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
                  </div>
                  <div className="col-lg-6">
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
                  </div>
                  <div className="col-lg-12">
                    <div>
                      <label className="form-label">Description</label>
                        <Field name="description" as="textarea" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} data-toggle="autosize" placeholder="Enter description" style={{overflow: "hidden", overflowWrap: "break-word", resize: "none", height: "53.9792px"}}></Field>
                        <ErrorMessage name="description" component="div" className="invalid-feedback" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" disabled={isSubmitting}  className="btn btn-primary ml-auto">
                {
                
                  isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>
                
                }
                Save
                </button>
              </div>
            </div>
          </div>
          </Form>
        </div>
        )}
        </Formik>
        )
}

export { Update };




