import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { productService, alertService, categoryService, brandService } from '../_services';

function Create({ history }) {
   

    const initialValues = {
        name: '',
        category: '',
        brand: '',
        description: '',
        acceptTerms: false
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

    // const FILE_SIZE = 1000240 * 1024;
    const SUPPORTED_FORMATS = [
      "image/jpg",
      "image/jpeg",
      "image/gif",
      "image/png"
    ];

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
                history.push('.');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ errors, touched, setFieldValue, isSubmitting }) => (
        <div class="row">
        <div class="col-md-6">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Product inclussion request</h3>
              </div>
              <Form>
              <div class="card-body">
                  <div class="form-group mb-3 row">
                    <label class="form-label col-3 col-form-label">Name</label>
                    <div class="col">
                       
                        <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                        <ErrorMessage name="name" component="div" className="invalid-feedback" />
                    </div>
                  </div>
                  <div class="form-group mb-3 row">

                  <label class="form-label col-3 col-form-label">Category</label>
                  <div class="col">
                      <Field name="category" class="form-label col-3 col-form-label" as="select" className={'form-control' + (errors.category && touched.category ? ' is-invalid' : '')} >
                          <option value="">Seleccione</option>
                          {
                            categories && categories.map(category => <option value={category._id}>{category.name}</option>)
                          }
                      </Field>
                      <ErrorMessage name="category" component="div" className="invalid-feedback" />
                      </div>
                  </div>
                  <div class="form-group mb-3 row">
                    <label class="form-label col-3 col-form-label">Brand</label>
                    <div class="col">
                    <Field name="brand" class="form-label col-3 col-form-label" as="select" className={'form-control' + (errors.brand && touched.brand ? ' is-invalid' : '')} >
                          <option value="">Seleccione</option>

                          {
                            brands && brands.map(brand => <option value={brand._id}>{brand.name}</option>)
                          }
                      </Field>
                      <ErrorMessage name="brand" component="div" className="invalid-feedback" />
                    </div>
                  </div>
                  <div class="form-group mb-3 row">
                    <label class="form-label col-3 col-form-label">Picture</label>
           
                    <div class="col">
                          <div class="form-file">

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
                    <div class="form-group mb-3 row">
                        <label class="form-label col-3 col-form-label">Description</label>
                        <div class="col">
                            
                            <Field name="description" as="textarea" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} data-toggle="autosize" placeholder="Enter description" style={{overflow: "hidden", overflowWrap: "break-word", resize: "none", height: "53.9792px"}}></Field>
                            <ErrorMessage name="description" component="div" className="invalid-feedback" />
                        </div>
                    </div>
                    <small class="form-hint">A moderator will review your request as soon as possible. This may takes up to 24h. <br></br>Sending this request you are automatically acepting the terms described in the next card.</small>
              </div>
              


              {/* <div class="card-footer text-right">
                      <div class="d-flex">
                        <a href="#" class="btn btn-link">Cancel</a>
                        <button type="submit" class="btn btn-primary ml-auto">Send request</button>
                      </div>
                    </div> */}



                    <div class="card-footer text-right">
                              <div class="d-flex">
                                <a href="#" class="btn btn-link">Cancel</a>
                                
                                <button type="submit" disabled={isSubmitting} className="btn btn-primary ml-auto">
                            {
                            
                            isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>
                            
                            }
                            Send data
                        </button>
                              </div>
                            </div>







                </Form>
            </div>
        </div>
        <div class="col-md-6">
        <div class="card d-flex flex-column">
          <div class="card-body d-flex flex-column">
            <h3 class="card-title">Terms and condition</h3>
            <div class="text-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit enim voluptatum ratione doloremque atque quasi inventore ipsum harum? Nam, excepturi. Facere voluptate voluptates dolores quasi officia consequatur voluptatem quo repellendus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit sed doloribus dignissimos, ea hic ullam delectus, eligendi suscipit labore numquam ratione! Ea aspernatur rerum quae aperiam officia vel odio aliquid.</div>
          </div>
        </div>
      </div>
      </div>
        )}
        </Formik>
        )
}

export { Create };