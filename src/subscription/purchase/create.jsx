import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { purchaseService, alertService, planService, } from '../../_services';
import * as Yup from 'yup';
import { history } from '../../_helpers'

function Create(props) {

    const [plan, setPlan] = useState("")

    const widget = window.cloudinary.createUploadWidget({
      cloudName: 'timj111',
      multiple: false, 
      uploadPreset: 'djfefiwm'}, 
      (error, result) => { 
          if (!error && result && result.event === "success") { 
              setPicture(result.info.url)
          }
      }
  );

  function showWidget(){
      widget.open()
  }

  const pictureInitialState=false;
  const [picture, setPicture] = useState(pictureInitialState)
   
    const initialValues = {
        method: '',
        date: '',
        reference: '',
        picture: '',
        plan: plan._id,
        amount: '',
    };

    const fetchItems = () => {
      planService.getById(props.match.params.id).then((res) => {
    
        setPlan(res);
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
        method: Yup.string()
            .required('Method is required'),
        date: Yup.date()
            .required('Date is required'),
        reference: Yup.string()
            .required('Reference is required'),
        amount: Yup.number()
            .required('Amount is required'),
    });

    function onSubmit(fields, { setStatus, setSubmitting, resetForm }) {
        setStatus();
        fields.picture=picture;
        if(!picture){
          alert("Confirmation of the transaction is required")
          setSubmitting(false);
        }else{
          purchaseService.create(fields)
              .then(() => {
                 resetForm({});
                  alertService.success('Request sent!', { keepAfterRouteChange: true });
                  history.push('/subscription');
              })
              .catch(error => {
                  setSubmitting(false);
                  // alertService.error(error);
              });
        }
    } 

    return (
        <Formik initialValues={initialValues} enableReinitialize validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ errors, touched, setFieldValue, handleReset, isSubmitting }) => (
        <div className="row">
        <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Subscription request</h3>
              </div>
              <Form>
              <div className="card-body">
                  <div className="form-group mb-3 row">
                    <label className="form-label col-3 col-form-label">Date</label>
                    <div className="col">
                        <Field name="date" type="date" className={'form-control' + (errors.date && touched.date ? ' is-invalid' : '')} />
                        <ErrorMessage name="date" component="div" className="invalid-feedback" />
                    </div>
                    </div>
                    <Field name="plan" type="hidden" />
                  <div className="form-group mb-3 row">
                    <label className="form-label col-3 col-form-label">Reference #</label>
                    <div className="col">
                        <Field name="reference" type="reference" placeholder="Input the reference number" className={'form-control' + (errors.reference && touched.reference ? ' is-invalid' : '')} />
                        <ErrorMessage name="reference" component="div" className="invalid-feedback" />
                    </div>
                  </div>
                  <div className="form-group mb-3 row">
                    <label className="form-label col-3 col-form-label">Amount $</label>
                    <div className="col">
                        <Field name="amount" type="amount" placeholder="Input the amount number" className={'form-control' + (errors.amount && touched.amount ? ' is-invalid' : '')} />
                        <ErrorMessage name="amount" component="div" className="invalid-feedback" />
                    </div>
                  </div>
                  <div className="form-group mb-3 row">
                  <label className="form-label col-3 col-form-label">Payment method</label>
                  <div className="col">
                      <Field name="method" className="form-label col-3 col-form-label" as="select" className={'form-control' + (errors.method && touched.method ? ' is-invalid' : '')} >
                        <option value="">Select</option>
                        <option value="BANK TRANSFER">BANK TRANSFER</option>
                        <option value="PAYPAL">PAYPAL</option>
                        <option value="ZELLE">ZELLE</option>
                      </Field>
                      <ErrorMessage name="category" component="div" className="invalid-feedback" />
                      </div>
                  </div>
                  <div className="form-group mb-3 row">
                    <label className="form-label col-3 col-form-label">Transaction confirmation</label>
                    <div className="col-auto">
               						  <a href="#" onClick={showWidget} style={{width:"80px", border:"1px solid silver", height:"80px",backgroundSize:"cover", backgroundImage: `url(${picture})`}} className="avatar avatar-upload rounded">
               						    {!picture?<><svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
               						    <span className="avatar-upload-text">Add</span></>
                               :""}
               						  </a>
               						</div> 
                    
                  </div>
                    <small className="form-hint">A moderator will review your request as soon as possible. This may takes up to 24h. <br></br>Sending this request you are automatically acepting the terms described in the next card.</small>
              </div>
              


              {/* <div className="card-footer text-right">
                      <div className="d-flex">
                        <a href="#" className="btn btn-link">Cancel</a>
                        <button type="submit" className="btn btn-primary ml-auto">Send request</button>
                      </div>
                    </div> */}



                    <div className="card-footer text-right">
                              <div className="d-flex">
                                <a href="#" onClick={handleReset} className="btn btn-link">Cancel</a>
                                
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
        <div className="col-md-6">
        <div className="card d-flex flex-column">
          <div className="card-body d-flex flex-column">
            <h3 className="card-title">Transfer details</h3>
            <div className="text-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit enim voluptatum ratione doloremque atque quasi inventore ipsum harum? Nam, excepturi. Facere voluptate voluptates dolores quasi officia consequatur voluptatem quo repellendus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit sed doloribus dignissimos, ea hic ullam delectus, eligendi suscipit labore numquam ratione! Ea aspernatur rerum quae aperiam officia vel odio aliquid.</div>
          </div>
        </div>
      </div>
      </div>
        )}
        </Formik>
        )
}

export { Create };