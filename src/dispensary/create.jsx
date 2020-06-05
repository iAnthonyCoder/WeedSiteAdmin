// import React, { useEffect, useRef, useState } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";

// const styles = {
//   width: "100vw",
//   height: "calc(100vh - 80px)",
//   position: "absolute"
// };

// function Create() {
//   const [map, setMap] = useState(null);
//   const mapContainer = useRef(null);

//   useEffect(() => {
//     mapboxgl.accessToken = "pk.eyJ1IjoiYW50aG9ueTk1MiIsImEiOiJjazl2enJuMWswNHJhM21vNHBpZGF3eXp0In0.zIyPl0plESkg395zI-WVsg";
//     const initializeMap = ({ setMap, mapContainer }) => {
//       const map = new mapboxgl.Map({
//         container: mapContainer.current,
//         style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
//         center: [0, 0],
//         zoom: 5
//       });

//       map.on("load", () => {
//         setMap(map);
//         map.resize();
//       });
//     };

//     if (!map) initializeMap({ setMap, mapContainer });
//   }, [map]);

//   return <div ref={el => (mapContainer.current = el)} style={styles} />;
// };

// export { Create };


import React, { useState, useEffect, useRef } from 'react';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { accountService, alertService, dispensaryService, cityService } from '../_services';
import { InputText } from '../_components'


function Create({ history }) {
    const visaImg = "/static/payments/visa.svg"
    const atmImg = "/static/payments/atm.svg"
    const AEImg = "/static/payments/americanexpress.svg"
    const mastercardImg = "/static/payments/mastercard.svg"
    const user = accountService.userValue;
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);
    const latitudeInitialValue=false; 
    const [latitude, setLatitude] = useState(latitudeInitialValue)
    const [longitude, setLongitude] = useState(latitudeInitialValue)
    const [cities, setCities] = useState("")
    const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY','SUNDAY'];
 

    const styles = {
      width: "100%",
      position: "relative",
      height:"500px"
    };
    const initialValues = {
        name: '',
        address: '', 
        addresszip: '', 
        city: '', 
        phone: '',
        license: '',
        licenseType: ''
    };
    const mp = {
        lng: 5,
        lat: 34,
        zoom: 2
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        city: Yup.string()
            .required('City is required'),
        address: Yup.string()
            .required('Address is required'),
        addresszip: Yup.string()
            .required('Zip code is required'),
        phone: Yup.string()
            .required('Phone number is required'),
        license: Yup.string()
            .required('License is required'),
        licenseType: Yup.string()
            .required('License type is required'),
    });


    
    const fetchElements = async () => {
        await cityService.getAll().then( cities =>
            setCities(cities)
        )

    }




    useEffect(() => {

        fetchElements();
      mapboxgl.accessToken = "pk.eyJ1IjoiYW50aG9ueTk1MiIsImEiOiJjazl2enJuMWswNHJhM21vNHBpZGF3eXp0In0.zIyPl0plESkg395zI-WVsg";
      const initializeMap = ({ setMap, mapContainer }) => {
        const map = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
          center: [-119.77548846586623, 36.796441467509496],
          zoom: 4.5
        });
        
        var marker = new mapboxgl.Marker({
            draggable: true
            })
        map.on('click', addMarker);
        function addMarker(e){
            marker.setLngLat([e.lngLat.wrap().lng, e.lngLat.wrap().lat]).addTo(map)
            var lngLat = marker.getLngLat();
            setLatitude(lngLat.lat);
            setLongitude(lngLat.lng);
        }

        map.on("load", () => {
          setMap(map);
          map.resize();
          
        });
      };
      if (!map) initializeMap({ setMap, mapContainer });
    }, [map]);






    function onSubmit(fields, { setStatus, setSubmitting, resetForm }) {
        
        fields.latitude=latitude;
        fields.longitude=longitude;
        if(!latitude){
            alert("Add a place in the map")
            setSubmitting(false);
        }else{
          setStatus();
          fields.user=user._id;
          dispensaryService.create(fields)
          
            .then(() => {
                resetForm({});
                alertService.success('Dispensary created', { keepAfterRouteChange: true });
                history.push('../../home');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
        }
        
    }



    const [isDeleting, setIsDeleting] = useState(false);
    function onDelete() {
        // if (confirm('Are you sure?')) {
            setIsDeleting(true);
            accountService.delete(user.id)
                .then(() => alertService.success('Account deleted successfully'));
        // }
    }


    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting }) => (
                <>
                <div className="page-header">
                    <div className="row align-items-center">
                        <div className="col-auto">
                            <h2 className="page-title">
                                Dyspensary
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="">
                        <Form className="card">
                            <div className="card-header">
                                <h4 className="card-title">New dispensary</h4>
                            </div>
                            <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 col-xl-8">
                                <div className="row">
                                    <div className="col-xl-6 col-md-6">
                                        <div className="row">
                                            <div className="">
                                                <div className="mb-3">
                                                    <label>Name *</label>
                                                    <Field name="name" type="text" placeholder="Input name" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                                </div>
                                                <div className="mb-3">
                                                    <label>Address *</label>
                                                    <Field name="city" as="select" className={'form-control' + (errors.city && touched.city ? ' is-invalid' : '')} >
                                                        <option value="">Select city</option>
                                                        {cities && cities.map( city => 
                                                            <option value={city._id}>{city.name}</option>
                                                        )}
                                                    </Field>
                                                    <ErrorMessage name="city" component="div" className="invalid-feedback" />
                                                </div>
                                                <div className="mb-3">
                                                    
                                                    <Field name="address" type="text" placeholder="Input address" className={'form-control' + (errors.address && touched.address ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="address" component="div" className="invalid-feedback" />
                                                    <br></br>
                                                    <Field name="addresszip" type="text" placeholder="Input zip code" className={'form-control' + (errors.addresszip && touched.addresszip ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="addresszip" component="div" className="invalid-feedback" />
                                                </div>
                                                <div className="mb-3">
                                                    <label>Phone number *</label>
                                                    <Field name="phone" data-mask="(00) 0000-0000" data-mask-visible="true" placeholder="(+1) 0000-0000" type="text" className={'form-control' + (errors.phone && touched.phone ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="phone" component="div" className="invalid-feedback" />

                                                    
                                                </div>
                                                
                                                
                                                <div className="mb-3">
                                                <label>License Type</label>
                                                    <Field name="licenseType" as="select" className={'form-control' + (errors.opens_at && touched.opens_at ? ' is-invalid' : '')} >
                                                        <option value="">Select</option>
                                                        <option value="Recreational Cultivation">Recreational Cultivation</option>
                                                        <option value="Recreational Mfg.">Recreational Mfg.</option>
                                                        <option value="Recreational Nonstorefront">Recreational Nonstorefront</option>
                                                        <option value="Recreational Retail">Recreational Retail</option>
                                                        <option value="Medical Cultivation">Medical Cultivation</option>
                                                        <option value="Medical Mfg.">Medical Mfg.</option>
                                                        <option value="Medical Nonstorefront">Medical Nonstorefront</option>
                                                        <option value="Medical Retail">Medical Retail</option>
                                                        <option value="Microbusiness">Microbusiness</option>
                                                        <option value="Testing Lab">Testing Lab</option>
                                                        <option value="Event">Event</option>
                                                        <option value="Distributor">Distributor</option>
                                                            
                                                    </Field>
                                                    <ErrorMessage name="opens_at" component="div" className="invalid-feedback" />
                                           
                                                    <br></br>
                                                    <Field name="license"  placeholder="Input license" 
                                                    type="text" className={'form-control' + (errors.recreationallicense && touched.recreationallicense ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="recreationallicense" component="div" className="invalid-feedback" /> 
                                                </div>
                                                </div><div className="row">
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-md-6">

                                    <div className="mb-3">
                          <label className="form-label">Select payment methods accepted in your dispensary</label>
                          <div className="form-selectgroup">
                          <label class="form-selectgroup-item flex-fill" style={{width: "100%"}}>
                              <Field type="checkbox" name="form-payment" name="isVisaAcepted" class="form-selectgroup-input" />
                              <div class="form-selectgroup-label d-flex align-items-center p-3">
                                <div class="mr-3">
                                  <span class="form-selectgroup-check"></span>
                                </div>
                                <div>
                                  <img src={visaImg} style={{height:"2em"}}/>
                                  <strong>VISA ACCEPTED</strong> 
                                </div>
                              </div>
                            </label>
                            <label class="form-selectgroup-item flex-fill" style={{width: "100%"}}>
                              <Field type="checkbox" name="form-payment" name="isMastercardAcepted" class="form-selectgroup-input" />
                              <div class="form-selectgroup-label d-flex align-items-center p-3">
                                <div class="mr-3">
                                  <span class="form-selectgroup-check"></span>
                                </div>
                                <div>
                                    <img src={mastercardImg} style={{height:"2em"}}/>
                                    <strong>MASTERCARD ACCEPTED</strong> 
                                </div>
                              </div>
                            </label>
                            <label class="form-selectgroup-item flex-fill" style={{width: "100%"}}>
                              <Field type="checkbox" name="form-payment" name="isAmericanexpressAcepted" class="form-selectgroup-input" />
                              <div class="form-selectgroup-label d-flex align-items-center p-3">
                                <div class="mr-3">
                                  <span class="form-selectgroup-check"></span>
                                </div>
                                <div>
                                    <img src={AEImg} style={{height:"2em"}}/>
                                    <strong>AMERICAN E. ACCEPTED</strong> 
                                </div>
                              </div>
                            </label>
                            <label class="form-selectgroup-item flex-fill" style={{width: "100%"}}>
                              <Field type="checkbox" name="form-payment" name="isAtmAcepted" class="form-selectgroup-input" />
                              <div class="form-selectgroup-label d-flex align-items-center p-3">
                                <div class="mr-3">
                                  <span class="form-selectgroup-check"></span>
                                </div>
                                <div>
                                    <img src={atmImg} style={{height:"2em", width:"3.5em"}}/>
                                    <strong>ATM AVAILABLE</strong> 
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>

                        </div>














                                    <div className=" ">
                                    
                                    <h2>Set the location in the map</h2>
                         
                                         
                                          <div ref={el => (mapContainer.current = el)} style={styles} /><br></br>
                                          <small className="form-hint"><strong>Navigate around the map, search the location of your dispensary, then do LEFT CLICK to mark it.</strong></small>
                                        
                                          {/* <Field id="latitude" onChange={e => Form.setFieldValue('latitude', e)}  name="latitude" type="text" className={'form-control' }/>
                                          
                                            <Field id="longitude" name="longitude" type="text" className={'form-control' }/> */}
                                            
                                    </div>
                                </div>
                            </div>

                            
                            <div className="col-md-6 col-xl-4 ">
                            <fieldset class="form-fieldset" style={{padding:"1em"}}>
                                <h3 className="">Hours of operation</h3>       
                                {
                                    days.map( (name, index) => (
                               
                            //     <label className="form-selectgroup-item flex-fill">
                            //   <span>{name}: </span>
                              <div style={{borderTop: "1px solid rgba(110,117,130,.2)"}} className=" row align-items-center p-3">
                               
                                <h4>{name}: </h4> 
                                {/* <div style={{justifyContent:"flex-end",width:"100%"}} className="form-selectgroup-label-content d-flex align-items-center"> */}
                             
                                    
                                  <div style={{paddingRight:"0em", paddingLeft:"0em"}} className="col-sm-6 col-md-3 col-xl-3">
                                                            <label>Opens at</label>
                                                            <Field name={`opens_at[${name}]`} as="select" className={'form-control' + (errors.opens_at && touched.opens_at ? ' is-invalid' : '')} >
                                                            <option value="">Select</option>
                                                            <option value="12">12:00</option>
                                                                <option value="1">1:00</option>
                                                                <option value="2">2:00</option>
                                                                <option value="3">3:00</option>
                                                                <option value="4">4:00</option>
                                                                <option value="5">5:00</option>
                                                                <option value="6">6:00</option>
                                                                <option value="7">7:00</option>
                                                                <option value="8">8:00</option>
                                                                <option value="9">9:00</option>
                                                                <option value="10">10:00</option>
                                                                <option value="11">11:00</option>
                                                                
                                                            </Field>
                                                            <ErrorMessage name="opens_at" component="div" className="invalid-feedback" />
                                                            
                                                        </div>

                                                        <div style={{paddingRight:"0em", paddingLeft:"0em"}} className="col-sm-6 col-md-2 col-xl-2">
                                                        <label></label>
                                                        <Field  name={`opens_at_type[${name}]`} as="select" className={'form-control' + (errors.opens_at && touched.opens_at ? ' is-invalid' : '')} >
                                                        <option value="">Select</option>
                                                                <option value="AM">AM</option>
                                                                <option value="PM">PM</option>
                                                                
                                                            </Field>
                                                            <ErrorMessage name="opens_at" component="div" className="invalid-feedback" />
                                                      </div>
                                                            
                                                    
                                                      
                                                      <div style={{paddingRight:"0em", paddingLeft:"0em"}} className="col-md-2 col-xl-2"></div>

                             
                                  {/* <div style={{width:"12em"}} className="lh-sm"> */}
                                    
                                  <div style={{paddingRight:"0em", paddingLeft:"0em"}} className="col-sm-6 col-md-3 col-xl-3">
                                                            <label>Closes at</label>
                                                            <Field name={`closes_at[${name}]`} as="select" className={'form-control' + (errors.opens_at && touched.opens_at ? ' is-invalid' : '')} >
                                                            <option value="">Select</option>
                                                            <option value="12">12:00</option>
                                                                <option value="1">1:00</option>
                                                                <option value="2">2:00</option>
                                                                <option value="3">3:00</option>
                                                                <option value="4">4:00</option>
                                                                <option value="5">5:00</option>
                                                                <option value="6">6:00</option>
                                                                <option value="7">7:00</option>
                                                                <option value="8">8:00</option>
                                                                <option value="9">9:00</option>
                                                                <option value="10">10:00</option>
                                                                <option value="11">11:00</option>
                                                                
                                                            </Field>
                                                            <ErrorMessage name="opens_at" component="div" className="invalid-feedback" />
                                                        </div>
                                                        <div style={{paddingRight:"0em", paddingLeft:"0em"}} className="col-sm-6 col-md-2 col-xl-2">
                                                        <label></label>
                                                        <Field  name={`closes_at_type[${name}]`} as="select" className={'form-control' + (errors.opens_at && touched.opens_at ? ' is-invalid' : '')} >
                                                        <option value="">Select</option>
                                                                <option value="AM">AM</option>
                                                                <option value="PM">PM</option>
                                                                
                                                            </Field>
                                                            <ErrorMessage name="opens_at" component="div" className="invalid-feedback" />
                                                      </div>

                                  </div>
                       
                              ) )
                            }</fieldset>
                             </div>

                            <div className="card-footer text-right">
                              <div className="d-flex" style={{justifyContent:"space-between"}}>
                                <a href="#" className="btn btn-link">Cancel</a>
                                
                                <button type="submit" disabled={isSubmitting} className="btn btn-primary ml-aut">


                            {
                            
                            // isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>
                            
                            }
                            Save



                        </button>
                              </div>
                            </div>
                            </div>
                            </div>
                        </Form>
                    </div>
                </div>
                {/* <Form>
                    <h1>Update Profile</h1>
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
                    </div>
                </Form> */}
             
              
                </>
            )}
        </Formik>
    )
}
export { Create };