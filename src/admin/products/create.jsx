import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { SingleSelect } from '../../_components'
import * as Yup from 'yup';
import { productService, alertService, strainService, categoryService, brandService } from '../../_services';

function Create() {

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
		showSkipCropButton:true,
		croppingAspectRatio: 1,
        uploadPreset: 'ymhijlld'}, 
        (error, result) => { 
            if (!error && result && result.event === "success") { 
				let url = result.info.url
				setPictures(pictures.concat(url))
			}
        });

    const initialValues = {
        name: '',
        category: '',
        brand: '',
        description: '',
	};
	
	function showWidget(){
        widget.open()
    }

    const [categories, setCategories] = useState("");
	const [brands, setBrands] = useState("");
	const [strains, setStrains] = useState("");
	

    const fetchItems = () => {
      	categoryService.getAll().then((res) => {
        	setCategories(res);
      	})
      	brandService.getAll().then((res) => {
        	setBrands(res);
		  })
		  strainService.getAll().then((res) => {
        	setStrains(res);
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
		fields.picture=pictures;
		fields.category = fields.category._id
		fields.brand = fields.brand._id
		console.log(fields)
		
        productService.create(fields)
        	.then((data) => {
            	resetForm({});
                alertService.success('Item added!', { keepAfterRouteChange: true });
				// $("#modal-new-product").modal("hide");
				setPictures(picturesInitialState)
                // props.addNew(data.payload);
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
			});
		
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ errors, touched, setFieldValue, isSubmitting, setFieldTouched, values, handleChange, handleReset, formikProps }) => (
        	<div className="row">
				<div className="col-12">
					<div className="card">
        				<Form>
							<div className="card-header">
								<h5 className="modal-title">New product</h5>
              				</div>
				  			<div className="card-body">
				  				<div className="row">
				  					<div className="col-lg-6">
				  						<div className="row">
            	      						<div className="col-lg-6">
            	        						<div className="mb-3">
													<SingleSelect
      													value={values.category}
      												  	onChange={setFieldValue}
      												  	onBlur={setFieldTouched}
      												  	error={errors.category}
														touched={touched.category}
														values={categories}
														name={"category"}
														title={"Category"}
      												/>
            	        						</div>
            	      						</div>
            	      						<div className="col-lg-6">
            	        						<div className="mb-3">
													<SingleSelect
      												  	value={values.brand}
      												  	onChange={setFieldValue}
      												  	onBlur={setFieldTouched}
      												  	error={errors.brand}
														touched={touched.brand}
														values={brands}
														name={"brand"}
														title={"Brand"}
      												/>
            	        						</div>
            	      						</div>
											<div className="col-lg-6">
            	        						<div className="mb-3">
													<SingleSelect
      													value={values.strain}
      												  	onChange={setFieldValue}
      												  	onBlur={setFieldTouched}
      												  	error={errors.strain}
														touched={touched.strain}
														values={strains}
														name={"strain"}
														title={"Strains"}
      												/>
            	        						</div>
            	      						</div>
            	    					</div>
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
            	          								setFieldValue('slug', sluga)
            	        								}}
            	      								/>
            	    							)}
            	      							type="text"  
											/>
            	      						<ErrorMessage name="name" component="div" className="invalid-feedback" />
            	   						</div>
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
									<div class="row">
										<label className="form-label">Product pictures</label>
										{
											pictures && pictures.map( picture =>
												<div className="col-auto">
													<span style={{position: "absolute",color: "red",zIndex: "1",borderRadius: "20px",margin: "-10px"}}>
														<button onClick={()=>{removePicture(picture)}} type="button" style={{borderRadius:"20px", padding: "0",width:"30px", height:"30px"}} class="btn btn-danger">x</button>
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
									<div className="col-lg-6">
										<div className="row" style={{height:"100%"}}>
            	        					<div>
            	          						<label className="form-label">Description</label>
            	            					<Field name="description" as="textarea" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} data-toggle="autosize" placeholder="Enter description" style={{overflow: "hidden", overflowWrap: "break-word", height: "calc( 100% - 5em)"}}></Field>
            	            					<ErrorMessage name="description" component="div" className="invalid-feedback" />
            	        					</div>
            	      					</div>
									</div>
								</div>
            	  			</div>
							<div className="card-footer text-right">
								<div className="d-flex">
									<button type="button" onClick={()=>{handleReset();setPictures(picturesInitialState)}} className="btn btn-link">Reset Form</button>
            	    					<button type="submit" disabled={isSubmitting}  className="btn btn-primary ml-auto">
            	                		{
            	                			isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>
            	                		}
            	                			Save
            	            			</button>
								</div>
            	  			</div>
          				</Form>
					</div>
				</div>
        	</div>
        )}
        </Formik>
        )
}

export { Create };

