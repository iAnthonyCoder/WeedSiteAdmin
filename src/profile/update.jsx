import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
        accountService.update(user._id, fields)
            .then(() => {
                alertService.success('Update successful', { keepAfterRouteChange: true });
                history.push('.');
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
             
                    <div class="row">
                        <div class="col-12">
                            <form class="card">
                                <div class="card-header">
                                  <h2 class="card-title">Update profile</h2>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-2 col-sm-12">
                                        <span className="avatar" style={{width:"8em", height:"8em", border:"1px solid #ceceff",backgroundImage: `url("${(user && user.picture)?user.picture:defaultAvatar}")`}}></span>
                                        </div>
                                        <div class="col-md-4 col-sm-12">
                                            <p class="empty-title h3">Change profile picture</p>
                                            <p class="h4">Leave this empty if you don't want to update it.</p>
                                            <div class="form-file">

                                              <input id="picture" name="picture" class="form-file-input" type="file" onChange={(event) => {
                    setFieldValue("picture", event.currentTarget.files[0]);
                  }} className="form-file-input" className={'form-control' + (errors.picture && touched.picture ? ' is-invalid' : '')}/>
                  <ErrorMessage name="brand" component="div" className="invalid-feedback" />

                                                {/* <input type="file" class="form-file-input" id="customFile"/> */}


                                                {/* <label class="form-file-label" for="picture">
                                                  <span class="form-file-text">Choose file...</span>
                                                  <span class="form-file-button">Browse</span>
                                                </label> */}
                                              </div>
                                        </div>
                                        <div class="col-md-3 col-sm-12">
                                        <div class="mb-3">
                                            {/* <div class="form-label">Custom File Input</div> */}
                                              
                                            </div>
                                        </div>
                                    </div>
                                    <hr></hr>

                                    <div class="row">
                                        <p style={{paddingBottom:"1em"}}class="empty-title h3 text-muted">General informatión</p>
                                        <div class="col-md-4 col-sm-12">
                                            <div className="mb-3">
                                                  <label class="form-label">Email</label>
                                                  <Field name="email" autocomplete="off" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                                  <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-12"> 
                                            <div className="mb-3">
                                                  <label class="form-label">Name</label>
                                                  <Field name="name" autocomplete="off" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                                  <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-4 col-sm-12">
                                            <div className="mb-3">
                                                  <label class="form-label">Birthdate</label>
                                                  <Field name="birthdate" disabled autocomplete="off" type="date" className={'form-control' + (errors.birthdate && touched.birthdate ? ' is-invalid' : '')} />
                                                  <ErrorMessage name="birthdate" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-12">
                                        <div class="row">
                                                <div class="col-md-8 col-sm-12">
                                                    <span class="badge badge-danger">Needs validation</span>
                                                </div>

                                                <div class="col-md-4 col-sm-12">

                                                        <a href="#" class="btn btn-primary btn-block">
                                                                    Resend
                                                         </a>
                                                </div>

                                            </div>
                                        </div>
                                        
                                        
                                    </div>
                                    <br></br><br></br>
                                    <div class="row">
                                    <hr></hr>
                                        <p style={{paddingBottom:"1em"}}class="empty-title h3 text-muted">General informatión</p>
                                        {/* <div class="col-md-4 col-sm-12">
                                            <div className="mb-3">
                                                  <label >Old password</label>
                                                  <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                                  <ErrorMessage name="password" autocomplete="off" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-12"> 
                                            <div className="mb-3">
                                                  <label >New password</label>
                                                  <Field name="newPassword" type="password" className={'form-control' + (errors.newPassword && touched.newPassword ? ' is-invalid' : '')} />
                                                  <ErrorMessage name="name" autocomplete="off" component="div" className="invalid-feedback" />
                                            </div>
                                        </div> */}
                                        <div class="col-md-4 col-sm-12">
                                        <div className="mb-3">
                        <label>Old password</label>
                        <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                  </div>
                  </div>
                  <div class="col-md-4 col-sm-12">
                    <div className="mb-3">
                        <label>New password</label>
                        <Field name="newPassword" type="password" className={'form-control' + (errors.newPassword && touched.newPassword ? ' is-invalid' : '')} />
                        <ErrorMessage name="newPassword" component="div" className="invalid-feedback" />
                    </div>
                  </div>
                                        
                                        <div class="col-md-4 col-sm-12">
                    <div className="mb-3">
                        <label>Confirm new password</label>
                        <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                        <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                    </div></div>
                 
                                        
                                        <div class="col-md-3 offset-md-9 col-sm-12">
                                        <br></br>
                                            <a href="#" class="btn btn-outline-info active btn-block">
                                              Change password
                                            </a>
                                        </div>

                                        
                                    </div>



                                    <br></br>
                                </div>
                                <div class="card-footer text-right">
                                  <div class="d-flex">
                                    <a href="#" class="btn btn-link">Cancel</a>
                                    <button type="submit" class="btn btn-primary ml-auto">Send data</button>
                                  </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* <h1>Update Profile</h1>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Title</label>
                            <Field name="title" as="select" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')}>
                                <option value=""></option>
                                <option value="Mr">Mr</option>
                                <option value="Mrs">Mrs</option>
                                <option value="Miss">Miss</option>
                                <option value="Ms">Ms</option>
                            </Field>
                            <ErrorMessage name="title" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col-5">
                            <label>First Name</label>
                            <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                            <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col-5">
                            <label>Last Name</label>
                            <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                            <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </div>
                    <h3 className="pt-3">Change Password</h3>
                    <p>Leave blank to keep the same password</p>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Password</label>
                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col">
                            <label>Confirm Password</label>
                            <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                            <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary mr-2">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Update
                        </button>
                        <button type="button" onClick={() => onDelete()} className="btn btn-danger" style={{ width: '75px' }} disabled={isDeleting}>
                            {isDeleting
                                ? <span className="spinner-border spinner-border-sm"></span>
                                : <span>Delete</span>
                            }
                        </button>
                        <Link to="." className="btn btn-link">Cancel</Link>
                    </div> */}
                </Form>
            )}
        </Formik>
    )
}

export { Update };