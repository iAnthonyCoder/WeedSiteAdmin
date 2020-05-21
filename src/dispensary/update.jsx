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


function Update({ history, match }) {
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
        phone: dispensary.phone,
        city: (dispensary.city)?dispensary.city._id:"",
        schedule: dispensary.schedule
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
            .required('Addres is required'),
        phone: Yup.string()
            .required('Phone number is required'),
        // opens_at: Yup.number()
        //     .required('Opens time is required'),
        // closes_at: Yup.number()
        //     .moreThan(Yup.ref('opens_at'), 'Closes at value should be higher than opens at value')
        //     .required('Closes time is required'),
    });


    
    const fetchElements = async () => {
        await cityService.getAll().then( cities =>
            setCities(cities)
        )
        await dispensaryService.getByUserId(user._id).then( dispensary =>
            {setDispensary(dispensary)
            addMap(dispensary.longitude,dispensary.latitude)}
            
        )
        

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
        if(!latitude){
            alert("Add a place in the map")
            setSubmitting(false);
        }else{
          setStatus();
          dispensaryService.update(dispensary._id,fields)
          
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
        <Formik initialValues={initialValues}  enableReinitialize={true} validationSchema={validationSchema} onSubmit={onSubmit}>
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
                                                    <Field name="name" type="text" placeholder="Input name" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                                </div>
                                                <div className="mb-3">
                                                    <label>City</label>
                                                    <Field name="city" as="select" className={'form-control' + (errors.city && touched.city ? ' is-invalid' : '')} >
                                                        <option value="">Select one</option>
                                                        {cities && cities.map( city => 
                                                            <option value={city._id}>{city.name}</option>
                                                        )}
                                                    </Field>
                                                    <ErrorMessage name="city" component="div" className="invalid-feedback" />
                                                </div>
                                                <div className="mb-3">
                                                    <label>Address</label>
                                                    <Field name="address" type="text" placeholder="Input address" className={'form-control' + (errors.address && touched.address ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="address" component="div" className="invalid-feedback" />
                                                </div>
                                                <div className="mb-3">
                                                    <label>Phone number</label>
                                                    <Field name="phone" data-mask="(00) 0000-0000" data-mask-visible="true" placeholder="(+1) 0000-0000" type="text" className={'form-control' + (errors.phone && touched.phone ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="phone" component="div" className="invalid-feedback" />

                                                    
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
                            </div>
                            <div className="card-footer text-right">
                              <div className="d-flex" style={{justifyContent:"space-between"}}>
                                <a href="#" className="btn btn-link">Cancel</a>
                                
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
                
              
                </>
            )}
        </Formik>
    )
}
export { Update };