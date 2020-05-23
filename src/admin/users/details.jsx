import React, { useEffect, useState, useRef }  from 'react';
import mapboxgl from "mapbox-gl";
import { accountService } from '../../_services';
import { PageHeader, BasicInfoCard,ScheduleTableCard, NoDispensary, LoaderBounce } from '../../_components';


function Details(props) {



    const [userDetails, setUserDetails] = useState("")
    const [dispensary, setDispensary] = useState("")
    const [schedule, setSchedule] = useState("")
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);
    const defaultAvatar = "./static/user.png";

    const fetchUserDatails = async () => {
        await accountService.getById(props.match.params.id).then(async (res)=>{
            
            if(res!=null){
       
                (res.last_session)?res.last_session=res.last_session.substr(0,10):res.last_session=""
                await setUserDetails(res)
                if(!res.dispensary)
                {}
                else{

                  
                await setDispensary(res.dispensary);
                
                await setSchedule(res.dispensary.schedule);
           
        
                mapboxgl.accessToken = "pk.eyJ1IjoiYW50aG9ueTk1MiIsImEiOiJjazl2enJuMWswNHJhM21vNHBpZGF3eXp0In0.zIyPl0plESkg395zI-WVsg";
               const initializeMap = async ({ setMap, mapContainer }) => {
                 const map = new mapboxgl.Map({
                   container: mapContainer.current,
                   style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
                   center: [ res.dispensary.longitude,res.dispensary.latitude],
                   zoom: 15,
                   interactive:false
                 });
              
                 var marker = new mapboxgl.Marker({
                   draggable: false
                   })
                   .setLngLat([ res.dispensary.longitude,res.dispensary.latitude])
                   .addTo(map);
                 
                 map.on("load", () => {
                   setMap(map);
                   map.resize();
                
                 });
               };
               if (!map) initializeMap({ setMap, mapContainer });
              }
            }
        })
      }
      //const { handle } = this.props.match.params
      useEffect(() => {
        fetchUserDatails()
      }, [])


      const calculate_age = (dob1) => {
        var today = new Date();
        var birthDate = new Date(dob1);  // create a date object directly from `dob1` argument
        var age_now = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            age_now--;
        }
        return age_now;
      }



      if(!userDetails) return <LoaderBounce />
    return (
        <>
            <PageHeader title="Admin/Users/Profile" edit={false} subtitle={`${userDetails.name}'s details`} />
              
            <div className="row">
            <div className="col-lg-4">
            <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Profile</h3>
                </div>
                <div className="card-body">
                
                    <div className="row mb-3">
                      <div className="col-auto">
                      <span className="avatar" style={{width:"5em", height:"5em", border:"1px solid #ceceff",backgroundImage: `url("${(userDetails && userDetails.picture)?userDetails.picture:defaultAvatar}")`}}></span>
                      </div>
                      <div className="col">
                        <div className="mb-2">
                            <h3><strong>{userDetails.name}</strong></h3>
                            <p style={{fontWeight:"700"}}>{userDetails.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                        
                        
                    <div className="col-lg-6">
                        
                        


                        <div className="mb-2">
                            <p style={{fontWeight:"700"}}>Age:</p>
                        </div>
                        <div className="mb-2">
                            <p style={{fontWeight:"700"}}>User type:</p>
                        </div>
                        <div className="mb-2">
                            <p style={{fontWeight:"700"}}>Email verification:</p>
                        </div>
                        <div className="mb-2">
                            <p style={{fontWeight:"700"}}>Status:</p>
                        </div>
                        <div className="mb-2">
                            <p style={{fontWeight:"700"}}>Last session</p>
                        </div>
                        <div className="mb-2">
                            <p style={{fontWeight:"700"}}>Last IP</p>
                        </div>
                        <div className="mb-2">
                            <p style={{fontWeight:"700"}}>Last payment</p>
                        </div>
                        </div>
                        
                        
                        <div className="col-lg-6 col-sm-6 col-xl-6">
                        
                        


                    <div className="mb-2">
                       <p><strong>{
                           (userDetails)?
                                calculate_age(userDetails.birthdate):""
                       
                       }</strong></p>
                    </div>
                    <div className="mb-2">
                        <p><strong>{userDetails.type}</strong></p>
                    </div>
                    <div className="mb-2">
                        <p><strong>{
                        (userDetails.isVerified)?<span className="badge badge-success">True</span>:<span className="badge badge-danger">False</span>}
                        </strong></p>
                    </div>
                    <div className="mb-2">
                        <p><strong>{
                        (userDetails.isActive)?<span className="badge badge-success">Active</span>:<span className="badge badge-danger">Banned</span>}
                        </strong></p>
                    </div>
                    <div className="mb-2">
                       <p><strong>{userDetails.last_session}</strong></p>
                    </div>
                    <div className="mb-2">
                    
                       <p><strong>{userDetails.last_ip_session}</strong></p>
                    </div>
                    <div className="mb-2">
  
                       <p><strong>last payment</strong></p>
                    </div>
                    </div>

                  






                    </div>

                        {
                          (userDetails && userDetails.type=="DISPENSARY")?(
                            <div className="mb-3">
                        <br></br><br></br>
                        <h3>Subscription status</h3>

                              { (userDetails.subscription)?(
                                <>
                              
                                          <div className="progress mb-2">
                                      <div className="progress-bar" style={{width:`${userDetails.subscription.percentaje}%`}} role="progressbar" aria-valuenow={`${userDetails.subscription.percentaje}%`} aria-valuemin="0" aria-valuemax="100">
                                        <span className="sr-only">`${userDetails.subscription.percentaje}% Complete`</span>
                                      </div>

                                    </div>

                                    <smal>{userDetails.subscription.subscription_start} to {userDetails.subscription.subscription_end}</smal></>

                              ):(<p>NOT SUBSCRIBED</p>) }
                          


                        </div>
                          ):("")
                        }
                    
              </div>

            </div>
                       
            {
                (userDetails && userDetails.dispensary!=null)?(<BasicInfoCard dispensary={dispensary} />):("")
            }
            {
                (schedule.length>1)?(<ScheduleTableCard schedule={schedule}/>):("")
            }
              
            

            </div>




                <div className="col-lg-8">
                    <div className="card">
                    <div className="card-header">
                    <h3 className="card-title">Dispensary location</h3>
                    </div>
                    <div>
                   { (userDetails && userDetails.dispensary==null)?

                      <NoDispensary />:
                      <><div ref={el => (mapContainer.current = el)} style={{width: "100%", position: "relative",height:"400px"}} /><br></br></>
                   
                   }
                    

                    </div>
                    </div>
                </div>

            


            
           
        </div></>
    );
}

export { Details }