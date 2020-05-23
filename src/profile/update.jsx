import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { accountService, alertService } from '../_services';

function Update({ history }) {
    const user = accountService.userValue;
    const initialValues = {
        name: user.name,
        email: user.email,
        birthdate: user.birthdate.split('T')[0],
        password:"",
        newPassword:"",
        confirmPassword:""

    };
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

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting, setFieldValue }) => (
                <Form >
             
                    <div className="row">
                        <div className="col-12">
                            <form className="card">
                                <div className="card-header">
                                  <h2 className="card-title">Update profile</h2>
                                </div>
                                    <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-2 col-sm-12">
                                        <span className="avatar" style={{width:"8em", height:"8em", border:"1px solid #ceceff",backgroundImage: `url("${(user && user.picture)?user.picture:defaultAvatar}")`}}></span>
                                        </div>
                                        <div className="col-md-4 col-sm-12">
                                            <p className="empty-title h3">Change profile picture</p>
                                            <p className="h4">Leave this empty if you don't want to update it.</p>
                                            <div className="form-file">

                                              <input id="picture" name="picture" className="form-file-input" type="file" onChange={(event) => {
                                               setFieldValue("picture", event.currentTarget.files[0]);
                                             }} className="form-file-input" className={'form-control' + (errors.picture && touched.picture ? ' is-invalid' : '')}/>
                                             <ErrorMessage name="brand" component="div" className="invalid-feedback" />

                                                {/* <input type="file" className="form-file-input" id="customFile"/> */}


                                                {/* <label className="form-file-label" for="picture">
                                                  <span className="form-file-text">Choose file...</span>
                                                  <span className="form-file-button">Browse</span>
                                                </label> */}
                                              </div>
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
                                                  <Field name="email" autocomplete="off" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
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
                                        <div className="col-md-4 col-sm-12">
                                        <div className="row">
                                                <div className="col-md-8 col-sm-12">
                                                    <span className="badge badge-danger">Needs validation</span>
                                                </div>
                                                <div className="col-md-4 col-sm-12">
                                                    <a href="#" className="btn btn-primary btn-block">
                                                        Resend
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
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
                                            <a href="#" className="btn btn-outline-info active btn-block">
                                              Change password
                                            </a>
                                        </div>  
                                    </div>
                                    <br></br>
                                </div>
                                <div className="card-footer text-right">
                                  <div className="d-flex">
                                    <a href="#" className="btn btn-link">Cancel</a>
                                    <button type="submit" className="btn btn-primary ml-auto">Send data</button>
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