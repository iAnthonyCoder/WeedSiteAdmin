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
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { accountService, alertService, dispensaryService } from '../_services';
import Marker from './marker';
import Popup from './popup';
import { ReactDOM } from 'react-dom';
import fetchFakeData from "./fetchFakeData";

function Create({ history }) {
    const user = accountService.userValue;
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);
    const latitudeInitialValue=false; 
    const hoursInitialValue="";
    const [latitude, setLatitude] = useState(latitudeInitialValue)
    const [longitude, setLongitude] = useState(latitudeInitialValue)
    const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY','SUNDAY'];
 

    const styles = {
      width: "100%",
      position: "relative",
      height:"500px"
    };
    const initialValues = {
        name: '',
        address: '', 
        phone: '+1'
    };
    const mp = {
        lng: 5,
        lat: 34,
        zoom: 2
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Title is required'),
        city: Yup.string()
            .required('City is required'),
        address: Yup.string()
            .required('Addres is required'),
        phone: Yup.string()
            .required('Phone number is required'),
        // opens_at: Yup.number()
        //     .required('Opens time is required'),
        // closes_at: Yup.number()
        //     .moreThan(Yup.ref('opens_at'), 'Closes at value should be higher than opens at value')
        //     .required('Closes time is required'),
    });


    





    useEffect(() => {

     

      mapboxgl.accessToken = "pk.eyJ1IjoiYW50aG9ueTk1MiIsImEiOiJjazl2enJuMWswNHJhM21vNHBpZGF3eXp0In0.zIyPl0plESkg395zI-WVsg";
      const initializeMap = ({ setMap, mapContainer }) => {
        var coordinates = document.getElementById('coordinates');
        const map = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
          center: [-119.77548846586623, 36.796441467509496],
          zoom: 4.5
        });
        
        var marker = new mapboxgl.Marker({
          draggable: true
          })
          .setLngLat([-119.77548846586623, 36.796441467509496])
          .addTo(map);
           
          function onDragEnd() {
          var lngLat = marker.getLngLat();
          setLatitude(lngLat.lng)
          setLongitude(lngLat.lat)
          }
           
          marker.on('dragend', onDragEnd);



//           map.on('click', addMarker);

// function addMarker(e){
//   if (typeof circleMarker !== "undefined" ){ 
//     map.removeLayer(circleMarker);         
//   }
//   //add marker
//   circleMarker = new  L.circle(e.latlng, 200, {
//                 color: 'red',
//                 fillColor: '#f03',
//                 fillOpacity: 0.5
//             }).addTo(map);
// }

        map.on("load", () => {
          setMap(map);
          map.resize();
          
        });
      };
      if (!map) initializeMap({ setMap, mapContainer });
    }, [map]);






    function onSubmit(fields, { setStatus, setSubmitting }) {
        
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
                alertService.success('Update successful', { keepAfterRouteChange: true });
                // history.push('.');
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
                <div className="row">
                    <div className="col-12">
                        <Form className="card">
                            <div className="card-header">
                                <h4 className="card-title">New dispensary</h4>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-xl-4">
                                        <div className="row">
                                            <div className="col-md-6 col-xl-12">
                                                <div className="mb-3">
                                                    <label>Name</label>
                                                    <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                                </div>
                                                <div className="mb-3">
                                                    <label>City</label>
                                                    <Field name="city" as="select" className={'form-control' + (errors.city && touched.city ? ' is-invalid' : '')} >
                                                        <option value="">Seleccione</option>
                                                        <option value="1">Red</option>
                                                        <option value="5eaf8de157d3fc408c299d63">Green</option>
                                                        <option value="5eaf8de157d3fc408c299d64">Blue</option>
                                                    </Field>
                                                    <ErrorMessage name="city" component="div" className="invalid-feedback" />
                                                </div>
                                                <div className="mb-3">
                                                    <label>Address</label>
                                                    <Field name="address" type="text" className={'form-control' + (errors.address && touched.address ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="address" component="div" className="invalid-feedback" />
                                                </div>
                                                <div className="mb-3">
                                                    <label>Phone number</label>
                                                    <Field name="phone" type="text" className={'form-control' + (errors.phone && touched.phone ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                                                </div>
                                                <label className="form-label">Schedule</label>

                                                









                             {
                              days.map( name => (
                                <label class="form-selectgroup-item flex-fill">
                              <input type="checkbox" name="form-project-manager[]" value="1" class="form-selectgroup-input"/>
                              <div class="form-selectgroup-label d-flex align-items-center p-3">
                                <div class="mr-3">
                                  <span class="form-selectgroup-check"></span>
                                </div>
                                <span>{name}: </span>
                                <div style={{justifyContent:"flex-end",width:"100%"}} class="form-selectgroup-label-content d-flex align-items-center">
                                  
                                  <div style={{width:"6em"}} class="lh-sm">
                                    
                                    <Field name={"opens"+name} type="number" min="0" max="23" class="form-control " placeholder="Opens"/>
                                    
                                      

                                  </div>
                                  <div style={{width:"6em"}} class="lh-sm">
                                    
                                    <input type="text" class="form-control" placeholder="Closes"/>

                                  </div>
                                </div>
                              </div>
                            </label>
                              ) )
                            }
                             


                           








                                                

                                                {/* <fieldset className="form-fieldset">
                                                    <div className="row">
                                                        <div className="col-md-6 col-xl-6">
                                                            <label>Opens at</label>
                                                            <Field name="opens_at" as="select" className={'form-control' + (errors.opens_at && touched.opens_at ? ' is-invalid' : '')} >
                                                                <option value="">Select</option>
                                                                <option value="0">0:00</option>
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
                                                                <option value="12">12:00</option>
                                                                <option value="13">13:00</option>
                                                                <option value="14">14:00</option>
                                                                <option value="15">15:00</option>
                                                                <option value="16">16:00</option>
                                                                <option value="17">17:00</option>
                                                                <option value="18">18:00</option>
                                                                <option value="19">19:00</option>
                                                                <option value="20">20:00</option>
                                                                <option value="21">21:00</option>
                                                                <option value="22">22:00</option>
                                                                <option value="23">23:00</option>
                                                            </Field>
                                                            <ErrorMessage name="opens_at" component="div" className="invalid-feedback" />
                                                        </div>

                                                        

                                                        <div className="col-md-6 col-xl-6">
                                                            <label>Closes at</label>
                                                            <Field name="closes_at" as="select" className={'form-control' + (errors.closes_at && touched.closes_at ? ' is-invalid' : '')} >
                                                            <option value="">Select</option>
                                                                <option value="0">0:00</option>
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
                                                                <option value="12">12:00</option>
                                                                <option value="13">13:00</option>
                                                                <option value="14">14:00</option>
                                                                <option value="15">15:00</option>
                                                                <option value="16">16:00</option>
                                                                <option value="17">17:00</option>
                                                                <option value="18">18:00</option>
                                                                <option value="19">19:00</option>
                                                                <option value="20">20:00</option>
                                                                <option value="21">21:00</option>
                                                                <option value="22">22:00</option>
                                                                <option value="23">23:00</option>
                                                            </Field>
                                                            <ErrorMessage name="closes_at" component="div" className="invalid-feedback" />
                                                        </div>
                                                    
                                                    </div>
                                                    <br></br>
                                                    <div className="form-selectgroup">
                                                    <label className="form-selectgroup-item">
                                                      <input type="checkbox" name="name" value="HTML" className="form-selectgroup-input"  />
                                                      <span className="form-selectgroup-label">MONDAY</span>
                                                    </label>
                                                    <label className="form-selectgroup-item">
                                                      <input type="checkbox" name="name" value="CSS" className="form-selectgroup-input" />
                                                      <span className="form-selectgroup-label">TUESDAY</span>
                                                    </label>
                                                    <label className="form-selectgroup-item">
                                                      <input type="checkbox" name="name" value="PHP" className="form-selectgroup-input" />
                                                      <span className="form-selectgroup-label">WEDNESDAY</span>
                                                    </label>
                                                    <label className="form-selectgroup-item">
                                                      <input type="checkbox" name="name" value="JavaScript" className="form-selectgroup-input" />
                                                      <span className="form-selectgroup-label">THUSRDAY</span>
                                                    </label>
                                                    <label className="form-selectgroup-item">
                                                      <input type="checkbox" name="name" value="CSS" className="form-selectgroup-input" />
                                                      <span className="form-selectgroup-label">FRIDAY</span>
                                                    </label>
                                                    <label className="form-selectgroup-item">
                                                      <input type="checkbox" name="name" value="PHP" className="form-selectgroup-input" />
                                                      <span className="form-selectgroup-label">SATURDAY</span>
                                                    </label>
                                                    <label className="form-selectgroup-item">
                                                      <input type="checkbox" name="name" value="JavaScript" className="form-selectgroup-input" />
                                                      <span className="form-selectgroup-label">SUNDAY</span>
                                                    </label>
                                                  </div>
                                                </fieldset> */}
                                            </div>
                                            <div className="col-md-6 col-xl-12">
                                            
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col xl-8">
                                    <div class="card-title">Set the location in the map</div>
                         
                                         
                                          <div ref={el => (mapContainer.current = el)} style={styles} /><br></br>
                                          <small class="form-hint"><strong>Move the marker to the location of your dispensary, you can also move the map and zoom it.</strong></small>
                                        
                                          {/* <Field id="latitude" onChange={e => Form.setFieldValue('latitude', e)}  name="latitude" type="text" className={'form-control' }/>
                                          
                                            <Field id="longitude" name="longitude" type="text" className={'form-control' }/> */}
                                            
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer text-right">
                              <div class="d-flex" style={{justifyContent:"space-between"}}>
                                <a href="#" class="btn btn-link">Cancel</a>
                                
                                <button type="submit" disabled={isSubmitting} className="btn btn-primary ml-aut">


                            {
                            
                            // isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>
                            
                            }
                            Send data



                        </button>
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