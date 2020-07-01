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
import { accountService, alertService, dispensaryService, cityService, stateService } from '../_services';
import { SingleSelect } from '../_components'


function Update({ history, match }) {
    const statesGetAll = stateService.getAll
    const citiesGetAll = cityService.getAll
    const visaImg = "/static/payments/visa.svg"
    const atmImg = "/static/payments/atm.svg"
    const AEImg = "/static/payments/americanexpress.svg"
    const mastercardImg = "/static/payments/mastercard.svg"
    const user = accountService.userValue;
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);
    const latitudeInitialValue=false; 
    const hoursInitialValue="";
    const [latitude, setLatitude] = useState(latitudeInitialValue)
    const [longitude, setLongitude] = useState(latitudeInitialValue)
    const [cities, setCities] = useState("")
    const [dispensary, setDispensary] = useState("")
    const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY','SUNDAY'];
 

    const styles = {
      width: "100%",
      position: "relative",
      height:"500px"
    };

    const initialValues = {
        name: dispensary.name,
        address: dispensary.address, 
        addresszip: dispensary.addresszip, 
        isAmericanexpressAcepted: (dispensary.isAmericanexpressAcepted)?dispensary.isAmericanexpressAcepted:false, 
        isMastercardAcepted: dispensary.isMastercardAcepted?dispensary.isMastercardAcepted:false, 
        isVisaAcepted: (dispensary.isVisaAcepted)?dispensary.isVisaAcepted:false, 
        isAtmAcepted: (dispensary.isAtmAcepted)?dispensary.isAtmAcepted:false, 
        phone: dispensary.phone,
        website: dispensary.website,
        license: dispensary.license,
        email: dispensary.email,
        twitter: dispensary.twitter,
        instagram: dispensary.instagram,
        isPickupable: dispensary.isPickupable,
        facebook: dispensary.facebook,
        licenseType: dispensary.licenseType,
        city: dispensary.city,
        taxes: dispensary.taxes,
        state: (dispensary.city)?(dispensary.city.state):"",
        introduction: dispensary.introduction,
        about: dispensary.about,
        firstpatient: dispensary.firstpatient,
        announcement: dispensary.announcement,
    };

    const mp = {
        lng: 5,
        lat: 34,
        zoom: 2
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        // state: Yup.string()
        //     .required('City is required'),
        city: Yup.string()
            .required('State and city is required'),
        address: Yup.string()
            .required('Address is required'),
        addresszip: Yup.string()
            .required('Zip code is required'),
        phone: Yup.string()
            .required('Phone number is required'),
        license: Yup.string(),
        licenseType: Yup.string(),
        taxes: Yup.number()
            .min(0)
            .max(100),
        website: Yup.string(),
        email: Yup.string(),
        twitter: Yup.string(),
        instagram: Yup.string(),
        facebook: Yup.string(),
        introduction: Yup.string(),
        about: Yup.string(),
        firstpatient: Yup.string(),
        announcement: Yup.string(),
        
    });


    
    const fetchElements = async () => {
        await dispensaryService.getByUserId(user._id).then( dispensary => {
            console.log(dispensary);
            setDispensary(dispensary)
            addMap(dispensary.longitude,dispensary.latitude)
        })
    }

    useEffect(() => {
        fetchElements();
    }, [])

       



    function addMap(longitude, latitude){

      
      mapboxgl.accessToken = "pk.eyJ1IjoiYW50aG9ueTk1MiIsImEiOiJjazl2enJuMWswNHJhM21vNHBpZGF3eXp0In0.zIyPl0plESkg395zI-WVsg";
      const initializeMap = ({ setMap, mapContainer }) => {
        var map = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
          
          center: [longitude, latitude],
          zoom: 15
        });
        
        var marker = new mapboxgl.Marker({
            draggable: true
            })
        map.on('click', addMarker);

        function initializeMarker(e){
         
            var lng = longitude;
            var lat =  latitude;
            setLongitude(longitude);
            setLatitude(latitude);
            marker.setLngLat([lng, lat]).addTo(map)
            var lngLat = marker.getLngLat();
            
        }

        function addMarker(e){
         
            var lng = e.lngLat.wrap().lng;
            var lat =  e.lngLat.wrap().lat;
            marker.setLngLat([lng, lat]).addTo(map)
            var lngLat = marker.getLngLat();


            setLatitude(lngLat.lat);
            setLongitude(lngLat.lng);
        }


        map.on("load", () => {
            initializeMarker();
          setMap(map);
          map.resize();
        });
      };
      if (!map) initializeMap({ setMap, mapContainer });
    };






    function onSubmit(fields, { setStatus, setSubmitting, resetForm }) {
   
        fields.latitude=latitude;
        fields.longitude=longitude;
        fields.city=fields.city._id;
        delete fields.state
        if(!latitude){
            alert("Add a place in the map")
            setSubmitting(false);
        }else{
          setStatus();
          dispensaryService.update(dispensary._id,fields)
          
            .then(() => {
                resetForm({});
                alertService.success('Dispensary updated', { keepAfterRouteChange: true });
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
        <Formik initialValues={initialValues}  enableReinitialize={true} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting, values, setFieldValue, setFieldTouched }) => (
                <>
             
       
                <div className="page-header">
                    {console.log(values)}
                    <div className="row align-items-center">
                        <div className="col-auto">
                            <h2 className="page-title">
                                Dispensary
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Form className="card">
                            <div className="card-header">
                                <h4 className="card-title">Update dispensary</h4>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-xl-12">
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
                                                    {console.log(values)}
                                                    <SingleSelect
      										            value={values.state}
      										            onChange={setFieldValue}
      										            onBlur={setFieldTouched}
      										            error={errors.state}
											        	touched={touched.state}
                                                        endPoint={statesGetAll}
                                                        
											        	name={"state"}
											        	placeholder={"Select state"}
      										        />
                                                    
                                                   {values.state?<SingleSelect
      										            value={values.city}
      										            onChange={setFieldValue}
      										            onBlur={setFieldTouched}
                                                          error={errors.city}
                                                          extraQuery={values.state}
                                                        touched={touched.city}
                                                        endPoint={citiesGetAll}
											        	values={cities}
											        	name={"city"}
                                                        placeholder={"Select city"}
      										        />:""
                                                   }
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
                                                    <Field name="phone" data-mask="(00) 0000-0000" data-mask-visible="true" placeholder="(000) 0000-0000" type="text" className={'form-control' + (errors.phone && touched.phone ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="phone" component="div" className="invalid-feedback" />

                                                    
                                                </div>
                                                <div className="mb-3">
                                                    <label>Dispensary email</label>
                                                    <Field name="email" type="text" placeholder="info@example.com" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                                </div>
                                                
                                               
                                                <div className="mb-3">
                                                <label>License</label>
                                                    <Field name="licenseType" as="select" className={'form-control' + (errors.opens_at && touched.opens_at ? ' is-invalid' : '')} >
                                                        <option value="">Select Type</option>
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
                                                <div className="mb-3">
                                                    <label>Dispensary Taxes %</label>
                                                    <Field name="taxes" type="number" placeholder="Input taxes" className={'form-control' + (errors.taxes && touched.taxes ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="taxes" component="div" className="invalid-feedback" />
                                                </div>
                                                </div><div className="row">
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-md-6">

                                    <div className="mb-3">
                          <label >Select payment methods accepted in your dispensary</label>
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
                            <label class="form-selectgroup-item flex-fill" style={{width: "100%"}}>
                              <Field type="checkbox" name="form-payment" name="isPickupable" class="form-selectgroup-input" />
                              <div class="form-selectgroup-label d-flex align-items-center p-3">
                                <div class="mr-3">
                                  <span class="form-selectgroup-check"></span>
                                </div>
                                <div>
                                    {/* <img src={atmImg} style={{height:"2em", width:"3.5em"}}/> */}
                                    <strong>PICKUP SERVICE</strong> 
                                </div>
                              </div>
                            </label>
                          </div>
                          
                        </div>
                    
                        <div className="mb-3">
                            <label>Website url</label>
                            <Field name="website" type="text" placeholder="https://example.com" className={'form-control' + (errors.website && touched.website ? ' is-invalid' : '')} />
                            <ErrorMessage name="website" component="div" className="invalid-feedback" />
                        </div>

                        <div className="mb-3">
                            <label>Facebook</label>
                            <Field name="facebook" type="text" placeholder="https://www.facebook.com/example" className={'form-control' + (errors.facebook && touched.facebook ? ' is-invalid' : '')} />
                            <ErrorMessage name="facebook" component="div" className="invalid-feedback" />
                        </div>

                        <div className="mb-3">
                            <label>Twitter</label>
                            <Field name="twitter" type="text" placeholder="https://twitter.com/example" className={'form-control' + (errors.twitter && touched.twitter ? ' is-invalid' : '')} />
                            <ErrorMessage name="twitter" component="div" className="invalid-feedback" />
                        </div>

                        <div className="mb-3">
                            <label>Instagram</label>
                            <Field name="instagram" type="text" placeholder="https://www.instagram.com/example" className={'form-control' + (errors.instagram && touched.instagram ? ' is-invalid' : '')} />
                            <ErrorMessage name="instagram" component="div" className="invalid-feedback" />
                        </div>

                        



                    </div>
                                            <div className="col-md-6 col-xl-12">
                                            
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col xl-8">
                                    <div className="card-title">Set the location in the map</div>
                                          <div ref={el => (mapContainer.current = el)} style={styles} /><br></br>
                                          <small className="form-hint"><strong>Navigate around the map, search the location of your dispensary, then do LEFT CLICK to mark it.</strong></small>
                                        
                                          {/* <Field id="latitude" onChange={e => Form.setFieldValue('latitude', e)}  name="latitude" type="text" className={'form-control' }/>
                                          
                                            <Field id="longitude" name="longitude" type="text" className={'form-control' }/> */}
                                            
                                    </div>
                                </div>
                                            <hr></hr>

                            <div className="row">
                                <div className="col-md-3">
                                    <div className="mb-3">
                                        <label>Introduction</label>
                                        <Field name="introduction" as="textarea" className={'form-control' + (errors.introduction && touched.introduction ? ' is-invalid' : '')} data-toggle="autosize" placeholder="Enter introduction" style={{overflow: "hidden", overflowWrap: "break-word", height: "100.9792px"}}></Field>
                                        <ErrorMessage name="introduction" component="div" className="invalid-feedback" />
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="mb-3">
                                        <label>About us</label>
                                        <Field name="about" as="textarea" className={'form-control' + (errors.about && touched.about ? ' is-invalid' : '')} data-toggle="autosize" placeholder="Enter about us" style={{overflow: "hidden", overflowWrap: "break-word", height: "100.9792px"}}></Field>
                                        <ErrorMessage name="about" component="div" className="invalid-feedback" />
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="mb-3">
                                        <label>First-Time Patients Deals</label>
                                        <Field name="firstpatient" as="textarea" className={'form-control' + (errors.firstpatient && touched.firstpatient ? ' is-invalid' : '')} data-toggle="autosize" placeholder="Enter first time patient deals" style={{overflow: "hidden", overflowWrap: "break-word", height: "100.9792px"}}></Field>
                                        <ErrorMessage name="firstpatient" component="div" className="invalid-feedback" />
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="mb-3">
                                        <label>Announcement</label>
                                        <Field name="announcement" as="textarea" className={'form-control' + (errors.announcement && touched.announcement ? ' is-invalid' : '')} data-toggle="autosize" placeholder="Enter announcement" style={{overflow: "hidden", overflowWrap: "break-word", height: "100.9792px"}}></Field>
                                        <ErrorMessage name="announcement" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                                </div>








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
                        </Form>
                    </div>
                </div>
                
              
                </>
            )}
        </Formik>
    )
}
export { Update };