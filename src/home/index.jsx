import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { accountService, dispensaryService } from '../_services';
import mapboxgl from "mapbox-gl";
import { BasicInfoCard, TableProductsCard,BasicUserCard,ScheduleTableCard, PageHeader } from '../_components';

function Home() {

  const DispensaryStatus = {
    Validating: 'Validating',
    Valid: 'Valid',
    Invalid: 'Invalid'
}
    const user = accountService.userValue;
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);
    const latitudeInitialValue=false; 
    const dispensaryInitialValue="";
    const [latitude, setLatitude] = useState(latitudeInitialValue)
    const [longitude, setLongitude] = useState(latitudeInitialValue)
    const [dispensary, setDispensary] = useState()
    const [dispensaryStatus, setDispensaryStatus] = useState(DispensaryStatus.Loading)

    useEffect(() => {
      // if (localStorage.getItem("dispensary") === null){
      //   dispensaryService.getByUserId(user._id);
      // }
      // else{
      //   setDispensary(JSON.parse(localStorage.getItem("dispensary")))
      // }
      fetchDispensary();

    }, [])
    
    async function fetchDispensary() {
      const res = await dispensaryService.getByUserId(user._id)
      .then(() => {
        setDispensary(res);
        
        setDispensaryStatus(DispensaryStatus.Valid);
    })
    .catch(() => {
        setDispensaryStatus(DispensaryStatus.Invalid);
    });
        
          

      //   mapboxgl.accessToken = "pk.eyJ1IjoiYW50aG9ueTk1MiIsImEiOiJjazl2enJuMWswNHJhM21vNHBpZGF3eXp0In0.zIyPl0plESkg395zI-WVsg";
      // const initializeMap = async ({ setMap, mapContainer }) => {
      //   const map = new mapboxgl.Map({
      //     container: mapContainer.current,
      //     style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
      //     center: [res.latitude, res.longitude],
      //     zoom: 15,
      //     interactive:false
      //   });
        
      //   var marker = new mapboxgl.Marker({
      //     draggable: false
      //     })
      //     .setLngLat([res.latitude, res.longitude])
      //     .addTo(map);
           
      //   map.on("load", () => {
      //     setMap(map);
      //     map.resize();
          
      //   });
      // };
      // if (!map) initializeMap({ setMap, mapContainer });



      
    }
    
 

 
 

    function getOverview(){
      return(
        <>
        <PageHeader title="Overview" subtitle="My dispensary" buttonName="Add products" />
          <div class="row row-deck row-cards">
            <div class="col-lg-7">
            <div class="card">
            <div class="card-header">
                  <h4 class="card-title">{dispensary.name}</h4>
                </div>
              <div ref={el => (mapContainer.current = el)} style={{width: "100%", position: "relative",height:"400px"}} /><br></br>
            </div>
            </div>
            <div class="col-lg-5">
            <TableProductsCard />
            </div>
            <div class="col-md-6 col-lg-4">
              <ScheduleTableCard />
            </div>
            <div class="col-md-6 col-lg-4">
              <BasicInfoCard dispensary />
              </div>
              <BasicUserCard user />
          </div>
          </>
      )
    }


    function getAddDispensary(){
      return(<>
         <div class="empty">
            <div class="empty-icon">
              <img src="./static/illustrations/undraw_printing_invoices_5r4r.svg" height="128" class="mb-4" alt="" />
            </div>
            <p class="empty-title h3">Oh no!</p>
            <p class="empty-subtitle text-muted">
            You haven't added your dispensary yet
            </p>
            <div class="empty-action">
              <NavLink to={`/dispensary/create`} className="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Add your dispensary
                </NavLink>
            </div>
            
          </div> 
          </>
      )
    }









    function getBody() {
      
      switch (dispensaryStatus) {
          case DispensaryStatus.Valid:
            console.log("object");
              return getOverview();
          case DispensaryStatus.Invalid:
            console.log("object1");
              return getAddDispensary();
          case DispensaryStatus.Loading:
            console.log("object2");
              return <div>Loading...</div>;
      }
  }
 



    
    
    return (
      
        <div class="content">
        <div class="container-xl d-flex flex-column justify-content-center">
          {getBody()}
        </div>
      </div>
    );
}

export { Home };