import React, { useState, useEffect, useRef } from 'react';
import { NavLink , Link} from 'react-router-dom';
import { accountService, dispensaryService } from '../_services';
import mapboxgl from "mapbox-gl";
import { BasicInfoCard,ScheduleTableCard, PageHeader, LoaderBounce } from '../_components';
import { history } from '../_helpers';


function Home() {

  const DispensaryStatus = {
    Validating: 'Validating',
    Valid: 'Valid',
    Invalid: 'Invalid'
}
    const user = accountService.userValue;
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);
    const [dispensary, setDispensary] = useState()
    const [dispensaryStatus, setDispensaryStatus] = useState(DispensaryStatus.Loading)

   


    const checkIsAdmin = async ()=>{
      if(user.type==="ADMIN")
      {history.push('/admin');}
      }
      


    
    useEffect(() => {
      // if (localStorage.getItem("dispensary") === null){
      //   dispensaryService.getByUserId(user._id);
      // }
      // else{
      //   setDispensary(JSON.parse(localStorage.getItem("dispensary")))
      // }
      checkIsAdmin();
      fetchDispensary();

      

    }, [])
    
    async function fetchDispensary() {
      await dispensaryService.getByUserId(user._id)
      .then(async (res) => {
        if(res!=null){
          
        await setDispensary(res);
        await setDispensaryStatus(DispensaryStatus.Valid);
        console.log(res);

        mapboxgl.accessToken = "pk.eyJ1IjoiYW50aG9ueTk1MiIsImEiOiJjazl2enJuMWswNHJhM21vNHBpZGF3eXp0In0.zIyPl0plESkg395zI-WVsg";
       const initializeMap = async ({ setMap, mapContainer }) => {
         const map = new mapboxgl.Map({
           container: mapContainer.current,
           style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
           center: [ res.location.coordinates[0],res.location.coordinates[1]],
           zoom: 15,
           interactive:false
         });
      
         var marker = new mapboxgl.Marker({
           draggable: false
           })
           .setLngLat([ res.location.coordinates[0],res.location.coordinates[1]])
           .addTo(map);
         
         map.on("load", () => {
           setMap(map);
           map.resize();
        
         });
       };
       if (!map) initializeMap({ setMap, mapContainer });
      }
      else{
        setDispensaryStatus(DispensaryStatus.Invalid);
      }
    })
    .catch(() => {
        setDispensaryStatus(DispensaryStatus.Invalid);
    });
  
          

         



      
    }
    
 

 
 

    function getOverview(){
      return(
        <>
        {(!dispensary.subscribed)?(<div className="col-lg-12">
            <div className="alert alert-danger" style={{width:"100%"}} role="alert">
              <a className="alert-link" href="https://tabler.github.io/tabler-react/documentation">
                </a><strong>Your dispensary is inactive. &nbsp;</strong>
                To activate it please choose a subscription.</div>
            </div>
          
        ):""}
        <PageHeader title="Overview" subtitle="My dispensary"  />
          <div className="row row-deck row-cards">

          {/* <div className="col col-sm-6 col-lg-3">
            <SmallCardP3 color="blue" icon="icon" name="Available credits" description="8 Credits">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-md" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2"></path><path d="M12 3v3m0 12v3"></path></svg>
            </SmallCardP3>
          </div>
          <div className="col col-sm-6 col-lg-3">
            <SmallCardP3 color="green" icon="icon" name="Total products" description="58 Products">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-md" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3"></polyline><line x1="12" y1="12" x2="20" y2="7.5"></line><line x1="12" y1="12" x2="12" y2="21"></line><line x1="12" y1="12" x2="4" y2="7.5"></line></svg>
           
            </SmallCardP3>
          </div>
          <div className="col col-sm-6 col-lg-3">
            <SmallCardP3 color="blue" icon="icon" name="Available credits" description="8 Credits">
             </SmallCardP3>
           </div>
          <div className="col col-sm-6 col-lg-3">
            <SmallCardP3 color="blue" icon="icon" name="Available credits" description="8 Credits"></SmallCardP3>
          </div> */}

           <div className="col-lg-8">
            <div className="card">
            <div className="card-header" style={{display:"flex", justifyContent:"space-between"}}>
                  <h4 className="card-title">{dispensary.name} 
                        
                      </h4>
                      <Link to={`/dispensary/update/${dispensary._id}`}>
                      Edit details<svg xmlns="http://www.w3.org/2000/svg" className="icon ml-1" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"></path><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3"></path><line x1="16" y1="5" x2="19" y2="8"></line></svg>
                    </Link>
              </div>
              <div ref={el => (mapContainer.current = el)} style={{width: "100%", position: "relative",height:"400px"}} /><br></br>
            </div>
            </div>
            {/* <div className="col-lg-5">
            <TableProductsCard dispensary={dispensary}/>
            </div> */}
           
             <div className="col-md-6 col-lg-4">
              <BasicInfoCard dispensary={dispensary} edit={true}/>
              </div> 

              <div className="col-md-6 col-lg-8">
              {
                dispensary && dispensary.schedule ?
                            <ScheduleTableCard edit dispensaryId={dispensary._id}/>   
                          : " "
              }
            </div>
              {/* <div className="col-md-6 col-lg-4">
              <BasicUserCard user={user} />
              </div> */}
          </div>
          </>
      )
    }


    function getAddDispensary(){
      return(<>
         <div className="empty">
            <div className="empty-icon">
              <img src="./static/illustrations/undraw_printing_invoices_5r4r.svg" height="128" className="mb-4" alt="" />
            </div>
            <p className="empty-title h3">Oh no!</p>
            <p className="empty-subtitle text-muted">
            You haven't added your dispensary yet
            </p>
            <div className="empty-action">
              <NavLink to={`/dispensary/create`} className="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
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
   
              return getOverview();
          case DispensaryStatus.Invalid:
    
              return getAddDispensary();
              
          case DispensaryStatus.Loading:
            
              return <LoaderBounce />;
      }
  }
 



    
    
    return (
      <>
          {getBody()}
          </>
    );
}

export { Home };