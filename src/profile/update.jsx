import React, {useState} from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

import { accountService, alertService } from '../_services';

function Update({ history }) {
    const user = accountService.userValue;
  
    const widget = window.cloudinary.createUploadWidget({
        cloudName: 'timj111',
        multiple: false, 
        uploadPreset: 's9zss5g9'}, 
        (error, result) => { 
            if (!error && result && result.event === "success") { 
                setPicture(result.info.url)

                accountService.updateOwn(user._id, {picture:result.info.url})
                .then(() => {
                    alertService.success('Update successful', { keepAfterRouteChange: true });
                })
                .catch(error => {
                    alertService.error(error);
                });
            }
        }
    );

    function showWidget(){
        widget.open()
    }

    

    const initialValues = {
        name: user.name,
        email: user.email,
        birthdate: user.birthdate.split('T')[0],
    };

    const [picture, setPicture] = useState(user.picture)

    const defaultAvatar = "./static/user.png";
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters'),
        newPassword: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .when('password', (password, schema) => {
                if (password) return schema.required('Your Current Password is required');
            }),
        confirmPassword: Yup.string()
            .when('newPassword', (newPassword, schema) => {
                if (newPassword) return schema.required('Confirm Password is required');
            })
            .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        accountService.updateOwn(user._id, fields)
            .then(() => {
                alertService.success('Update successful', { keepAfterRouteChange: true });
                history.push('/');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

     function resendToken(email){
      
         var json = {'email':email}
         accountService.resendToken(json)
             .then(() => {
                 alertService.success('Check your email inbox', { keepAfterRouteChange: true });
                 history.push('/');
             })
             .catch(error => {
                 alertService.error(error);
             });
     }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting,handleReset, setFieldValue }) => (
                <Form >
             
                    <div className="row">
                        <div className="col-12">
                            <form className="card">
                                <div className="card-header">
                                  <h2 className="card-title">Update profile</h2>
                                </div>
                                    <div className="card-body">
                                    <div className="row">
                                        {console.log(user)}
                                        <div onClick={showWidget} style={{cursor:"pointer"}} className="col-md-2 col-sm-12">
                                        <span className="avatar" style={{width:"8em", height:"8em", border:"1px solid #ceceff",backgroundImage: `url("${(picture)?picture:defaultAvatar}")`}}></span>
                                        </div>
                                        <div className="col-md-4 col-sm-12">
                                            <p className="empty-title h3">Change profile picture</p>
                                            <p className="h4">Click on the picture to change.</p>
                                        </div>
                                        <div className="col-md-3 col-sm-12">
                                        <div className="mb-3">
                                            {/* <div className="form-label">Custom File Input</div> */}
                                              
                                            </div>
                                        </div>
                                    </div>
                                    <hr></hr>

                                    <div className="row">
                                        <p style={{paddingBottom:"1em"}}className="empty-title h3 text-muted">General informatión</p>
                                        <div className="col-md-4 col-sm-12">
                                            <div className="mb-3">
                                                  <label className="form-label">Email</label>
                                                  <Field name="email" autocomplete="off" autocomplete="chrome-off" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                                  <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-12"> 
                                            <div className="mb-3">
                                                  <label className="form-label">Name</label>
                                                  <Field name="name" autocomplete="off" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                                  <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                          
                                        <div className="col-md-4 col-sm-12">
                                            <div className="mb-3">
                                                  <label className="form-label">Birthdate</label>
                                                  <Field name="birthdate" disabled autocomplete="off" type="date" className={'form-control' + (errors.birthdate && touched.birthdate ? ' is-invalid' : '')} />
                                                  <ErrorMessage name="birthdate" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                         {console.log(user)}
                                        {
                                           (user.isVerified)?(""):<div className="col-md-4 col-sm-12"> <div className="row">
                                                <div className="">
                                                    <a href="#" onClick={()=>{resendToken(initialValues.email)}} className="btn btn-primary btn-block">
                                                        Resend verification mail
                                                    </a>
                                                </div>
                                            </div>
                                            </div>
                                        } 
                                    </div>
                                    <br></br><br></br>
                                    <div className="row">
                                    <hr></hr>
                                        <p style={{paddingBottom:"1em"}}className="empty-title h3 text-muted">General informatión</p>
                                        {/* <div className="col-md-4 col-sm-12">
                                            <div className="mb-3">
                                                  <label >Old password</label>
                                                  <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                                  <ErrorMessage name="password" autocomplete="off" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-12"> 
                                            <div className="mb-3">
                                                  <label >New password</label>
                                                  <Field name="newPassword" type="password" className={'form-control' + (errors.newPassword && touched.newPassword ? ' is-invalid' : '')} />
                                                  <ErrorMessage name="name" autocomplete="off" component="div" className="invalid-feedback" />
                                            </div>
                                        </div> */}
                                        <div className="col-md-4 col-sm-12">
                                        <div className="mb-3">
                                               <label>Old password</label>
                                               <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                               <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                         </div>
                                         </div>
                                         <div className="col-md-4 col-sm-12">
                                           <div className="mb-3">
                                               <label>New password</label>
                                               <Field name="newPassword" type="password" className={'form-control' + (errors.newPassword && touched.newPassword ? ' is-invalid' : '')} />
                                               <ErrorMessage name="newPassword" component="div" className="invalid-feedback" />
                                           </div>
                                         </div>

                                                               <div className="col-md-4 col-sm-12">
                                           <div className="mb-3">
                                               <label>Confirm new password</label>
                                               <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                               <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                                           </div></div>
                                        <div className="col-md-3 offset-md-9 col-sm-12">
                                        <br></br>
                                            {/* <a href="#" className="btn btn-outline-info active btn-block">
                                              Change password
                                            </a> */}
                                        </div>  
                                    </div>
                                    <br></br>
                                </div>
                                <div className="card-footer text-right">
                                  <div className="d-flex">
                                    <button type="button" onClick={handleReset} className="btn btn-link">Reset Form</button>
                                    <button type="submit" className="btn btn-primary ml-auto">
                                        {   isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span> }
                                        Save
                                    </button>
                                  </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export { Update };