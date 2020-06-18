import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { productService, alertService, categoryService, brandService } from '../_services';

function Create({ history }) {
   

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
        // picture: Yup
        // .mixed()
        // .required("A file is required")
        // // .test(
        // //   "fileSize",
        // //   "File too large",
        // //   value => value && value.size <= FILE_SIZE
        // // )
        // .test(
        //   "fileFormat",
        //   "Unsupported Format",
        //   value => value && SUPPORTED_FORMATS.includes(value.type)
        // )
    });

    const getSlug = (text) => {
        var lowerText = text.toLowerCase();
        var slug = lowerText.replace(/[^a-zA-Z0-9]+/g,'-');
        return slug;    
    };

    function onSubmit(fields, { setStatus, setSubmitting, resetForm }) {
        setStatus();
        fields.slug=getSlug(fields.name);
      
        productService.create(fields)
            .then(() => {
               resetForm({});
                alertService.success('Request sent!', { keepAfterRouteChange: true });
                history.push('/');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ errors, touched, setFieldValue, handleReset, isSubmitting }) => (
        <div className="row">
        <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Product inclussion request</h3>
              </div>
              <Form>
              <div className="card-body">
                  <div className="form-group mb-3 row">
                    <label className="form-label col-3 col-form-label">Name</label>
                    <div className="col">
                       
                        <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                        <ErrorMessage name="name" component="div" className="invalid-feedback" />
                    </div>
                  </div>
                  <div className="form-group mb-3 row">

                  <label className="form-label col-3 col-form-label">Category</label>
                  <div className="col">
                      <Field name="category" className="form-label col-3 col-form-label" as="select" className={'form-control' + (errors.category && touched.category ? ' is-invalid' : '')} >
                          <option value="">Select</option>
                          {
                            categories && categories.map(category => <option value={category._id}>{category.name}</option>)
                          }
                      </Field>
                      <ErrorMessage name="category" component="div" className="invalid-feedback" />
                      </div>
                  </div>
                  <div className="form-group mb-3 row">
                    <label className="form-label col-3 col-form-label">Brand</label>
                    <div className="col">
                    <Field name="brand" className="form-label col-3 col-form-label" as="select" className={'form-control' + (errors.brand && touched.brand ? ' is-invalid' : '')} >
                          <option value="">Select</option>

                          {
                            brands && brands.map(brand => <option value={brand._id}>{brand.name}</option>)
                          }
                      </Field>
                      <ErrorMessage name="brand" component="div" className="invalid-feedback" />
                    </div>
                  </div>
                  <div className="form-group mb-3 row">
                    <label className="form-label col-3 col-form-label">Picture</label>
           
                    <div className="col">
                          <div className="form-file">

                          <input id="picture" name="picture" type="file" onChange={(event) => {
                    setFieldValue("picture", event.currentTarget.files[0]);
                  }} className="form-label col-3 col-form-label" className={'form-control' + (errors.picture && touched.picture ? ' is-invalid' : '')}/>
                  <ErrorMessage name="brand" component="div" className="invalid-feedback" />
                         
                             {/* <Field name="picture" accept="image/x-png,image/gif,image/jpeg" type="file" id="form-file-input" className={'form-control' + (errors.picture && touched.picture ? ' is-invalid' : '')} />
                              <label className="form-file-label" for="customFile">
                               <span className="form-file-text">Choose file...</span>
                               <span className="form-file-button">Browse</span>
                             </label> 
                             <ErrorMessage name="picture" component="div" className="invalid-feedback" /> */}
                          </div>
                        </div>
                  </div>
                    <div className="form-group mb-3 row">
                        <label className="form-label col-3 col-form-label">Description</label>
                        <div className="col">
                            
                            <Field name="description" as="textarea" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} data-toggle="autosize" placeholder="Enter description" style={{overflow: "hidden", overflowWrap: "break-word", height: "53.9792px"}}></Field>
                            <ErrorMessage name="description" component="div" className="invalid-feedback" />
                        </div>
                    </div>
                    <small className="form-hint">A moderator will review your request as soon as possible. This may takes up to 24h. <br></br>By adding sending this form you agree to all Weedzly.com terms and services.</small>
              </div>
              


              {/* <div className="card-footer text-right">
                      <div className="d-flex">
                        <a href="#" className="btn btn-link">Cancel</a>
                        <button type="submit" className="btn btn-primary ml-auto">Send request</button>
                      </div>
                    </div> */}



                    <div className="card-footer text-right">
                              <div className="d-flex">
                                <button type="button" onClick={handleReset} className="btn btn-link">Reset form</button>
                                
                                <button type="submit" disabled={isSubmitting} className="btn btn-primary ml-auto">
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