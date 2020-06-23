import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { SingleSelect, NoResults, LoaderBounce } from '../../_components'
import { history } from '../../_helpers'
import * as Yup from 'yup';
import { productService, alertService, strainService, categoryService, brandService } from '../../_services';

function Create(props) {
	const brandGetAll = brandService.getAll;
	const categoryGetAll = categoryService.getAll;
	const strainGetAll = strainService.getAll;
	const createModeInitialValue=true;
	const fetchedInitialState=false;
	const itemInitialState={}
	const picturesInitialState=[];
	const [ createMode, setCreateMode ] = useState(createModeInitialValue)
	const [pictures, setPictures] = useState(picturesInitialState)
	const [ fetched, setFetched ] = useState(fetchedInitialState)
	const [ item, setItem ] = useState(itemInitialState)
	const [ matchedNames, setMatchedNames ] = useState(false)
	const fetchIdRef = React.useRef(0)
	const [ loadingMatches, setLoadingMatches ] = useState(false)

	const checkMatches =  (e, brand) => {
		if(createMode){
			const fetchId = ++fetchIdRef.current
			const { value, name } = e.target
			setLoadingMatches(true)
				setTimeout(() => {
					if (fetchId === fetchIdRef.current && value && brand ) {
						
						productService.getAll(`?size=10&page=0&brand=${brand._id}&search=${value}`)
						.then(res=>{
							setMatchedNames(res.totalData);
						})
						.finally(()=>{setLoadingMatches(false)})
					} else {
						
					}
				}, 1000);
		}
		
		

	}
		

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

    // const initialValues = {
    //     name: '',
    //     category: '',
	// 	brand: '',
	// 	strain: '',
    //     description: '',
	// };
	
	
	function showWidget(){
        widget.open()
    }

	const fetchItem = (id) => {
		productService.getById(id).then( res => {
			setItem(res.product);
			setPictures(res.product.picture);
			setFetched(true);
		} )
	}

    useEffect(() => {
		if(props.match.params.id){
			setCreateMode(false)
			fetchItem(props.match.params.id)
		}
	}, [])


    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
     	category: Yup.string()
     	    .required('Category is required'),
     	brand: Yup.string()
			 .required('Brand is required'),
		strain: Yup.string(),
     	    // .required('Strain is required'),
        description: Yup.string()
            .required('Description is required'),
	});
	
	const initialValues = {
        name: createMode?'':item.name,
        description: createMode?'':item.description,
        category: createMode?'':item.category,
		brand: createMode?'':item.brand,
		strain: createMode?'':item.strain,
		description: createMode?'':item.description,
	};

	const clearFields = (fields) => {
		fields.picture=pictures;
		if(fields.strain){
			fields.strain = fields.strain._id
		} else {
			delete fields.strain
		}
		
		fields.category = fields.category._id
		fields.brand = fields.brand._id
		return fields
	}
	

    function onSubmit(fields, { setStatus, setSubmitting, resetForm }) {
		setStatus();
		const clearedFields = clearFields(fields);
		(createMode)?
			create(clearedFields,setSubmitting,resetForm):
			update(clearedFields,setSubmitting,resetForm)
		
	}
	
	function create(fields, setSubmitting,resetForm) {
        productService.create(fields)
            .then(() => {
				alertService.success('Item added!', { keepAfterRouteChange: true });
				setPictures(picturesInitialState)
				setSubmitting(false);
				resetForm({});
            })
            .catch(() => {
				setSubmitting(false);
				resetForm({});
				setPictures(picturesInitialState)
				
                // alertService.error(error);
            });
    }

    function update(fields, setSubmitting, resetForm) {
		const id = item._id;
        productService.update(id, fields)
            .then(() => {
                alertService.success('Update successful', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(error => {
                setSubmitting(false);
				resetForm({});
				setPictures(picturesInitialState)
                // alertService.error(error);
            });
    }



    return (
        <Formik enableReinitialize  initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ errors, touched, setFieldValue, isSubmitting, setFieldTouched, values, handleChange, handleReset, formikProps }) => (
        	<div className="row">
				<div className="col-8">
					<div className="card">
        				<Form>
						
							<div className="card-header">
							<h5 className="modal-title">{createMode?"New":"Update"} product</h5>
              				</div>
				  			<div className="card-body">
				  				<div className="row">
				  					<div className="col-lg-12">
				  						<div className="row">
            	      						<div className="col-lg-6">
            	        						<div className="mb-3">
													<SingleSelect
      													value={values.category}
      												  	onChange={setFieldValue}
      												  	onBlur={setFieldTouched}
														error={errors.category}
														endPoint={categoryGetAll}
														touched={touched.category}
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
														endPoint={brandGetAll}
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
														endPoint={strainGetAll}
      												  	error={errors.strain}
														touched={touched.strain}
														name={"strain"}
														title={"Strain"}
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
													
															checkMatches(e, values.brand)
														}}
													/>
												)}
												type="text"  
											/>
											<ErrorMessage name="name" component="div" className="invalid-feedback" />
										</div>
										<div className="mb-3" style={{height:"200px"}}>
            	        				
            	          						<label className="form-label">Description</label>
            	            					<Field name="description" as="textarea" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} data-toggle="autosize" placeholder="Enter description" style={{overflow: "hidden", overflowWrap: "break-word", height: "calc( 100% - 5em)"}}></Field>
            	            					<ErrorMessage name="description" component="div" className="invalid-feedback" />
            	        				
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
				{createMode?
				<div class="col-lg-4">
               		<div class="card">
                 		<div class="card-header">
                   			<h5 class="modal-title">Matches with the selected brand</h5>
                 		</div>
						 	<div class="list list-row">
							
							 {	
							 	(loadingMatches)?<LoaderBounce />:

								(!matchedNames||matchedNames.length<1)?<NoResults />:
								matchedNames && matchedNames.map(name => 																					
 									<div class="list-item">												  												  
 									  	<div class="text-truncate">
 											<a href="#" class="text-body d-block">{name.name}</a>
 											<small class="d-block text-muted text-truncate mt-n1">Added the {name.createdAt.substr(0, name.createdAt.indexOf("T"))}</small>
 									  	</div>												  
 									</div>
	
 								)
 							}
							</div>
               		</div>
             	</div>:""}

        	</div>
        )}
        </Formik>
        )
}

export { Create };


// import React, { useState, useEffect } from 'react';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import { SingleSelect } from '../../_components'
// import { history } from '../../_helpers'
// import * as Yup from 'yup';
// import { productService, alertService, strainService, categoryService, brandService } from '../../_services';

// function Create(props) {
// 	const brandGetAll = brandService.getAll;
// 	const categoryGetAll = categoryService.getAll;
// 	const strainGetAll = strainService.getAll;
// 	const createModeInitialValue=true;
// 	const fetchedInitialState=false;
// 	const itemInitialState={}
// 	const picturesInitialState=[];
// 	const [ createMode, setCreateMode ] = useState(createModeInitialValue)
// 	const [pictures, setPictures] = useState(picturesInitialState)
// 	const [ fetched, setFetched ] = useState(fetchedInitialState)
// 	const [ item, setItem ] = useState(itemInitialState)
// 	const [ matchedNames, setMatchedNames ] = useState(itemInitialState)

// 	const removePicture = (pictureObj) => {
// 		let filteredState = pictures.filter( picture => pictureObj !== picture );
//         setPictures(filteredState)
// 	}
	
// 	const widget = window.cloudinary.createUploadWidget({
//         cloudName: 'timj111',
// 		cropping: true,
// 		multiple: false,
// 		showSkipCropButton:true,
// 		croppingAspectRatio: 1,
//         uploadPreset: 'ymhijlld'}, 
//         (error, result) => { 
//             if (!error && result && result.event === "success") { 
// 				let url = result.info.url
// 				setPictures(pictures.concat(url))
// 			}
//         });

//     // const initialValues = {
//     //     name: '',
//     //     category: '',
// 	// 	brand: '',
// 	// 	strain: '',
//     //     description: '',
// 	// };
	
	
// 	function showWidget(){
//         widget.open()
//     }

// 	const fetchItem = (id) => {
// 		productService.getById(id).then( res => {
// 			setItem(res.product);
// 			setPictures(res.product.picture);
// 			setFetched(true);
// 		} )
// 	}

//     useEffect(() => {
// 		if(props.match.params.id){
// 			setCreateMode(false)
// 			fetchItem(props.match.params.id)
// 		}
// 	}, [])


//     const validationSchema = Yup.object().shape({
//         name: Yup.string()
//             .required('Name is required'),
//      	category: Yup.string()
//      	    .required('Category is required'),
//      	brand: Yup.string()
// 			 .required('Brand is required'),
// 		strain: Yup.string(),
//      	    // .required('Strain is required'),
//         description: Yup.string()
//             .required('Description is required'),
// 	});
	
// 	const initialValues = {
//         name: createMode?'':item.name,
//         description: createMode?'':item.description,
//         category: createMode?'':item.category,
// 		brand: createMode?'':item.brand,
// 		strain: createMode?'':item.strain,
// 		description: createMode?'':item.description,
// 	};

// 	const clearFields = (fields) => {
// 		fields.picture=pictures;
// 		fields.strain = fields.strain._id
// 		fields.category = fields.category._id
// 		fields.brand = fields.brand._id
// 		return fields
// 	}


// 	const checkMatches =  (e) => {
// 		setTimeout(() => {
// 			const { value, name } = e.target
// 			productService.getAll(`?size=10&page=0&search=${value}`)
// 				.then(res=>{
// 					setMatchedNames(res);
// 				})
// 		}, 1000);
// 	}
	

//     function onSubmit(fields, { setStatus, setSubmitting, resetForm }) {
// 		setStatus();
// 		const clearedFields = clearFields(fields);
// 		(createMode)?
// 			create(clearedFields,setSubmitting,resetForm):
// 			update(clearedFields,setSubmitting,resetForm)
		
// 	}
	
// 	function create(fields, setSubmitting,resetForm) {
//         productService.create(fields)
//             .then(() => {
// 				alertService.success('Item added!', { keepAfterRouteChange: true });
// 				setPictures(picturesInitialState)
// 				setSubmitting(false);
// 				resetForm({});
//             })
//             .catch(() => {
// 				setSubmitting(false);
// 				resetForm({});
// 				setPictures(picturesInitialState)
				
//                 // alertService.error(error);
//             });
//     }

//     function update(fields, setSubmitting, resetForm) {
// 		const id = item._id;
//         productService.update(id, fields)
//             .then(() => {
//                 alertService.success('Update successful', { keepAfterRouteChange: true });
//                 history.push('..');
//             })
//             .catch(error => {
//                 setSubmitting(false);
// 				resetForm({});
// 				setPictures(picturesInitialState)
//                 // alertService.error(error);
//             });
//     }



//     return (
//         <Formik enableReinitialize  initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
//         {({ errors, touched, setFieldValue, isSubmitting, setFieldTouched, values, handleChange, handleReset, formikProps }) => (
//         	<div className="row">
// 				<div className="col-8">
// 					<div className="card">
//         				<Form>
				
// 							<div className="card-header">
// 							<h5 className="modal-title">{createMode?"New":"Update"} product</h5>
//               				</div>
// 				  			<div className="card-body">
// 				  				<div className="row">
// 				  					<div className="col-lg-6">
// 				  						<div className="row">
//             	      						<div className="col-lg-6">
//             	        						<div className="mb-3">
// 													<SingleSelect
//       													value={values.category}
//       												  	onChange={setFieldValue}
//       												  	onBlur={setFieldTouched}
// 														error={errors.category}
// 														endPoint={categoryGetAll}
// 														touched={touched.category}
// 														name={"category"}
// 														title={"Category"}
//       												/>
//             	        						</div>
//             	      						</div> 
//             	      						<div className="col-lg-6">
//             	        						<div className="mb-3">
// 													<SingleSelect
//       												  	value={values.brand}
//       												  	onChange={setFieldValue}
//       												  	onBlur={setFieldTouched}
//       												  	error={errors.brand}
// 														touched={touched.brand}
// 														endPoint={brandGetAll}
// 														name={"brand"}
// 														title={"Brand"}
//       												/>
//             	        						</div>
//             	      						</div>
// 											<div className="col-lg-6">
//             	        						<div className="mb-3">
// 													<SingleSelect
//       													value={values.strain}
//       												  	onChange={setFieldValue}
// 														onBlur={setFieldTouched}
// 														endPoint={strainGetAll}
//       												  	error={errors.strain}
// 														touched={touched.strain}
// 														name={"strain"}
// 														title={"Strain"}
//       												/>
//             	        						</div>
//             	      						</div> 
//             	    					</div>
//             	    					<div className="mb-3">
//             	      						<label className="form-label">Name</label>
// 											  <Field  name="name"
// 												render={({ field, form }) => (
// 													<input  className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} 
// 														{...field}
// 														onChange={e => {
// 															handleChange(e)
// 															checkMatches(e)
// 														}}
// 													/>
// 												)}
// 												type="text"  
// 											/>
// 											<ErrorMessage name="name" component="div" className="invalid-feedback" />
//             	   						</div>
// 									<div class="row">
// 										<label className="form-label">Product pictures</label>
// 										{
// 											pictures && pictures.map( picture =>
// 												<div className="col-auto">
// 													<span style={{position: "absolute",color: "red",zIndex: "1",borderRadius: "20px",margin: "-10px"}}>
// 														<button onClick={()=>{removePicture(picture)}} type="button" style={{borderRadius:"20px", padding: "0",width:"30px", height:"30px"}} class="btn btn-danger">x</button>
// 													</span>
//                								  		<a style={{width:"80px", border:"1px solid silver", height:"80px",backgroundSize:"cover",backgroundPositionX: "center", backgroundImage: `url(${picture})`}} className="avatar avatar-upload rounded">
//                								  		</a>
//                									</div> 
// 											)
// 										}
//             	    					<div className="col-auto">
//                								<a href="#" onClick={showWidget} style={{width:"80px", border:"1px solid silver", height:"80px",backgroundSize:"cover", backgroundImage: `url(${""})`}} className="avatar avatar-upload rounded">
//                									<svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
//                									<span className="avatar-upload-text">Add</span>
//                							  	</a>
//                							</div> 
// 									</div>
//             	    				</div>
// 									<div className="col-lg-6">
// 										<div className="row" style={{height:"100%"}}>
//             	        					<div>
//             	          						<label className="form-label">Description</label>
//             	            					<Field name="description" as="textarea" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} data-toggle="autosize" placeholder="Enter description" style={{overflow: "hidden", overflowWrap: "break-word", height: "calc( 100% - 5em)"}}></Field>
//             	            					<ErrorMessage name="description" component="div" className="invalid-feedback" />
//             	        					</div>
//             	      					</div>
// 									</div>
// 								</div>
//             	  			</div>
// 							<div className="card-footer text-right">
// 								<div className="d-flex">
// 									<button type="button" onClick={()=>{handleReset();setPictures(picturesInitialState)}} className="btn btn-link">Reset Form</button>
//             	    					<button type="submit" disabled={isSubmitting}  className="btn btn-primary ml-auto">
//             	                		{
//             	                			isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>
//             	                		}
//             	                			Save
//             	            			</button>
// 								</div>
//             	  			</div>
//           				</Form>
// 					</div>
// 				</div>


// 				<div class="col-md-4">
//               		<div class="card">
//                 		<div class="card-header">
//                   			<h5 class="modal-title">Matches with the selected brand</h5>
//                 		</div>
// 										{
											
// 											matchedNames>0 && matchedNames.map(name => 
// 												<div class="list list-row">
// 												<div class="list-item">
												  
												  
// 												  <div class="text-truncate">
// 														<a href="#" class="text-body d-block">{name.name}</a>
// 														<small class="d-block text-muted text-truncate mt-n1">Added the {name.created_at}</small>
// 												  </div>
												  
// 												</div>
// 										  </div>
// 												)
// 										}
                		
//               		</div>
//             	</div>

//         	</div>
//         )}
//         </Formik>
//         )
// }

// export { Create };

