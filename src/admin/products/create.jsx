import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import $ from 'jquery'

import { productService, alertService, categoryService, brandService } from '../../_services';

function Create(props) {
   

    const initialValues = {
        name: '',
        category: '',
        brand: '',
        description: '',
    };

    const [categories, setCategories] = useState("");
    const [brands, setBrands] = useState("");

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


    function onSubmit(fields, { setStatus, setSubmitting, resetForm }) {
        setStatus();
      
        productService.create(fields)
            .then((data) => {
               resetForm({});
                alertService.success('Item added!', { keepAfterRouteChange: true });
                $("#modal-new-product").modal("hide");
                props.addNew(data.payload);
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ errors, touched, setFieldValue, isSubmitting, values, handleChange, formikProps }) => (
        	<div className="modal modal-blur fade show" id="modal-new-product" tabindex="-1" role="dialog" aria-modal="true" style={{paddingRight: "15px; display: block"}}>
        		<Form>
            		<div className="modal-dialog modal-lg modal-dialog-centered" role="document">
            	    	<div className="modal-content">
            	      		<div className="modal-header">
            	   	 			<h5 className="modal-title">New product</h5>
            	    			<button type="button" className="close" data-dismiss="modal" aria-label="Close">
            	    			  <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            	    			</button>
            	  			</div>
            	  			<div className="modal-body">
            	    			<div className="mb-3">
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
            	    {/* <label className="form-label">Status</label>
            	    <div className="form-selectgroup-boxes row mb-3">
            	      <div className="col-lg-6">
            	        <label className="form-selectgroup-item">
            	          <input type="radio" name="report-type" value="1" className="form-selectgroup-input" checked="" />
            	          <span className="form-selectgroup-label d-flex align-items-center p-3">
            	            <span className="mr-3">
            	              <span className="form-selectgroup-check"></span>
            	            </span>
            	            <span className="form-selectgroup-label-content">
            	              <span className="form-selectgroup-title strong mb-1">Enabled</span>
            	              <span className="d-block text-muted">Product will be available in the website for everyone</span>
            	            </span>
            	          </span>
            	        </label>
            	      </div>
            	      <div className="col-lg-6">
            	        <label className="form-selectgroup-item">
            	          <input type="radio" name="report-type" value="1" className="form-selectgroup-input" />
            	          <span className="form-selectgroup-label d-flex align-items-center p-3">
            	            <span className="mr-3">
            	              <span className="form-selectgroup-check"></span>
            	            </span>
            	            <span className="form-selectgroup-label-content">
            	              <span className="form-selectgroup-title strong mb-1">Disabled</span>
            	              <span className="d-block text-muted">Product won't be available even if some dispensaries have them in stock</span>
            	            </span>
            	          </span>
            	        </label>
            	      </div>
            	    </div> */}
            	    			<div className="row">
            	      				<div className="">
            	        				<div className="mb-3">
            	          					<label className="form-label">Product url</label>
            	          					<div className="input-group input-group-flat">
            	            					<span className="input-group-text">https://domain.name/products/</span>
            	            					<Field type="text" name="slug" value={values.slug} className="form-control pl-0" />
				
            	          					</div>
            	        				</div>
            	     			 	</div>
            	    			</div>
            	    			<label className="form-label">Product picture</label>
            	    			<input id="picture" name="picture" type="file" onChange={(event) => {
            	    			    setFieldValue("picture", event.currentTarget.files[0]);
            	    			  }} className="form-label col-3 col-form-label" className={'form-control' + (errors.picture && touched.picture ? ' is-invalid' : '')}/>
            	    			  <ErrorMessage name="brand" component="div" className="invalid-feedback" />
							  
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

export { Create };