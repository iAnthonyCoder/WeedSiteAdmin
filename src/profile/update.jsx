import React, {useState, useEffect} from 'react';
import { PageHeader } from '../_components'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import { accountService, alertService } from '../_services';
import $ from 'jquery';
const Moment = require('moment');



function Update({ history }) {

    const [user, setUser] = useState(accountService.userValue)

    const setUserValue = () => {
        setUser(accountService.userValue)
    }


  
    const widget = window.cloudinary.createUploadWidget({
        cloudName: 'timj111',
        multiple: false, 
        croppingAspectRatio: 1,
        cropping: true,
        showSkipCropButton:false,
        uploadPreset: 's9zss5g9'}, 
        (error, result) => { 
            if (!error && result && result.event === "success") { 
        
                setPicture(result.info.url)

                accountService.updateOwn(user._id, {picture:result.info.url})
                .then(() => {
                    alertService.success('Update successful', { keepAfterRouteChange: true });
                    setUserValue()
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


    const widget2 = window.cloudinary.createUploadWidget({
        cloudName: 'timj111',
        multiple: false, 
        cropping: true,
        showSkipCropButton:true,
        uploadPreset: 's9zss5g9'}, 
        (error, result) => { 
            if (!error && result && result.event === "success") { 


                accountService.updateOwn(user._id, {picture_id:result.info.url})
                .then(() => {
                    alertService.success('Update successful', { keepAfterRouteChange: true });
                    setUserValue()
                })
                .catch(error => {
                    alertService.error(error);
                });
            }
        }
    );

    function showWidget2(){
        widget2.open()
    }

    

    const initialValues = {
        name: user.name,
        email: user.email,
        birthdate: user.birthdate.split('T')[0],
        picture: user.picture,
        picture_id: user.picture_id,
    };

    const formTitleInitialState = {name:"", type:"" }
    const [picture, setPicture] = useState(user.picture)
    const [formTitle, setFormTitle] = useState(formTitleInitialState)

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
        fields.birthdate = Moment(fields.birthdate).toISOString();
        accountService.updateOwn(user._id, fields)
            .then(() => {
                alertService.success('Update successful', { keepAfterRouteChange: true });
                // history.push('/');
                $("#modal-update-profile").modal("hide");
                setUserValue()
                
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

     function resendToken(email){
        alertService.success('Trying to send...', { keepAfterRouteChange: true });
        
        var json = {'email':email}
        accountService.resendToken(json)
             .then(() => {
                history.push('/');
                 alertService.success('Check your email inbox', { keepAfterRouteChange: true });
             })
             .catch(error => {
                 console.log(error)
                //  alertService.error(error);
             });
     }


     


     function openModal (name, type) {
        setFormTitle({name, type})
        $("#modal-update-profile").modal("show");
     }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting,handleReset, setFieldValue }) => (
                <Form >
                    <PageHeader title="User/Profile" subtitle="Profile details"  />
	    	
                {console.log(user)}


                    <div className="modal modal-blur fade" id="modal-update-profile" tabIndex="-1" role="dialog" style={{display: "none"}} aria-hidden="true">
       				    <div className="modal-dialog modal-dialog-centered" role="document">
         			    	<div className="modal-content">
           			    		<div className="modal-header">
                                    <h5 className="modal-title">{`${formTitle.type} ${formTitle.name}`}</h5>
            		    			<button type="button" className="close" data-dismiss="modal" aria-label="Close">
            		    			   <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            		    			</button>
           			    		</div>
                                <div className="modal-body">
                                    {
                                        formTitle.name==="name" && 
                                        <div className="col">
                                            <label className="form-label">Name</label>
                                            <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                            <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                        </div>  
                                    }

                                    {
                                        formTitle.name==="email" && 
                                        <div className="mb-3">
                                              <label className="form-label">Email</label>
                                              <Field name="email" autocomplete="off" autocomplete="chrome-off" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                              <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                        </div>
                                    }

                                    {
                                        formTitle.name==="password" && 
                                        <> 
                                            <div className="mb-3">
                                                <label>Old password</label>
                                                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                             </div>

                                            <div className="mb-3">
                                                <label>New password</label>
                                                <Field name="newPassword" type="password" className={'form-control' + (errors.newPassword && touched.newPassword ? ' is-invalid' : '')} />
                                                <ErrorMessage name="newPassword" component="div" className="invalid-feedback" />
                                            </div>
            
                                            <div className="mb-3">
                                                <label>Confirm new password</label>
                                                <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                                <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                                            </div>
                                        </>
                                    }
                                    {
                                        formTitle.name==="birthdate" && 
                                        <div className="mb-3">
                                            <label className="form-label">Birthdate</label>
                                            <Field name="birthdate" autocomplete="off" type="date" className={'form-control' + (errors.birthdate && touched.birthdate ? ' is-invalid' : '')} />
                                            <ErrorMessage name="birthdate" component="div" className="invalid-feedback" />
                                        </div>
                                    }
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
     				        </div>
     			        </div>
                         
                    </div>










                    
                    <div className="row">
                        <div className="col-6">
                            <div class="card">
                                <div class="card-header">
                                    <h3 class="card-title">General info</h3>
                                </div>
                                <div class="list list-row list-hoverable">

                                    <div class="list-item" style={{padding: "1em"}}>
                                        <div class="text-truncate">
                                            Name
                                            <small class="d-block text-muted text-truncate mt-n1">{(user.name)?(user.name):("Add name")}</small>
                                        </div>
                                        <button onClick={()=>openModal("name", (user.name)?("Edit"):("Add")) } type="button" class="btn btn-primary list-item-actions show">{(user.name)?("Edit"):("Add")}</button>
                                    </div>

                                    <div class="list-item" style={{padding: "1em"}}>
                                        <div class="text-truncate">
                                            Email {(!user.isVerified)?<>&nbsp;<span style={{fontSize:"8px"}} className="badge badge-danger">Unverified</span></>:""}
                                            <small class="d-block text-muted text-truncate mt-n1">{(user.email)?(user.email):("Add email")} </small> 
                                            <a href="#" onClick={()=>{resendToken(initialValues.email)}} className="">
                                                        Resend verification email
                                            </a>
                                        </div>
                                        <div>
                                        
                                        </div>
                                        <button onClick={()=>openModal("email", (user.email)?("Edit"):("Add"))} type="button" class="btn btn-primary list-item-actions show">{(user.email)?("Edit"):("Add")}</button>
                                    </div>

                                    <div class="list-item" style={{padding: "1em"}}>
                                        <div class="text-truncate">
                                            Password
                                            <small class="d-block text-muted text-truncate mt-n1">{"**********"}</small>
                                        </div>
                                        <button  onClick={()=>openModal("password", "Change")} type="button" class="btn btn-primary list-item-actions show">Change</button>
                                    </div>

                                    <div class="list-item" style={{padding: "1em"}}>
                                        <div class="text-truncate">
                                            Birthdate
                                            <small class="d-block text-muted text-truncate mt-n1">{(user.birthdate)?(Moment(user.birthdate).format("MMMM Do YYYY")):("Add datebirth")}</small>
                                        </div>
                                        <button onClick={()=>openModal("birthdate", (user.birthdate)?("Edit"):("Add"))} type="button" class="btn btn-primary list-item-actions show">{(user.birthdate)?("Edit"):("Add")}</button>
                                    </div>

                                    {/* <div class="list-item">
                                        <a href="#">
                                            <span class="avatar" style={{backgroundImage: "url(./static/avatars/000m.jpg)"}}></span>
                                        </a>
                                        <div class="text-truncate">
                                            <a href="#" class="text-body d-block">Paweł Kuna</a>
                                            <small class="d-block text-muted text-truncate mt-n1">Change deprecated html tags to text decoration classes (#29604)</small>
                                        </div>
                                        <a href="#" class="list-item-actions"><svg xmlns="http://www.w3.org/2000/svg" class="icon text-muted" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><path d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z"></path></svg>
                                        </a>
                                    </div> */}

                                    

                                </div>
                            </div>
                        </div>
          
                        <div className="col-6">
                            <div class="card">
                                <div class="card-header">
                                    <h3 class="card-title">Media</h3>
                                </div>
                                <div class="list list-row list-hoverable">

                                    <div class="list-item" style={{padding: "1em"}}>
                                        <div style={{display:"flex", justifyContent:"center", flexDirection:"column"}}>
                                            <div class="text-truncate" style={{marginBottom:"1em"}}>
                                                Profile picture

                                            </div>
                                            <img src={user.picture} style={{ height:"100px"}}></img>
                                        </div>
                                        <button type="button" onClick={()=>{showWidget()}} class="btn btn-primary list-item-actions show">{(user.picture)?("Edit"):("Add")}</button>
                                    </div>

                                    <div class="list-item" style={{padding: "1em"}}>
                                        <div style={{display:"flex",  justifyContent:"center", flexDirection:"column"}}>
                                            <div class="text-truncate" style={{marginBottom:"1em"}}>
                                                ID picture

                                            </div>
                                            <img src={user.picture_id} style={{height:"80px"}}></img>
                                        </div>
                                        <button type="button" onClick={()=>{showWidget2()}} class="btn btn-primary list-item-actions show">{(user.picture_id)?("Edit"):("Add")}</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>


{/*              
             
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
                                                        Resend verification email
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
                    </div> */}

                    
                </Form>
            )}
        </Formik>
    )
}

export { Update };