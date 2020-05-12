import React, { useEffect, useState, useRef }  from 'react';
import { Link } from 'react-router-dom';
import mapboxgl from "mapbox-gl";
import { accountService } from '../../_services';
import { PageHeader, BasicInfoCard,ScheduleTableCard, NoDispensary } from '../../_components';


function Details(props) {
    const DispensaryStatus = {
        Validating: 'Validating',
        Valid: 'Valid',
        Invalid: 'Invalid'
    }

    
    const { path } = props.match;
    const user = accountService.userValue;
    const [userDetails, setUserDetails] = useState("")
    const [dispensary, setDispensary] = useState("")
    const [schedule, setSchedule] = useState("")
    const [dispensaryStatus, setDispensaryStatus] = useState(DispensaryStatus.Loading)
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);
    const defaultAvatar = "./static/user.png";

    const fetchUserDatails = async () => {
        await accountService.getById(props.match.params.id).then(async (res)=>{

            
            if(res!=null){
                await setUserDetails(res)
                if(!res.dispensary)
                {console.log("object");}
                else{

                  
                await setDispensary(res.dispensary);
                
                await setSchedule(res.dispensary.schedule);
                await setDispensaryStatus(DispensaryStatus.Valid);
        
                mapboxgl.accessToken = "pk.eyJ1IjoiYW50aG9ueTk1MiIsImEiOiJjazl2enJuMWswNHJhM21vNHBpZGF3eXp0In0.zIyPl0plESkg395zI-WVsg";
               const initializeMap = async ({ setMap, mapContainer }) => {
                 const map = new mapboxgl.Map({
                   container: mapContainer.current,
                   style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
                   center: [res.dispensary.latitude, res.dispensary.longitude],
                   zoom: 15,
                   interactive:false
                 });
              
                 var marker = new mapboxgl.Marker({
                   draggable: false
                   })
                   .setLngLat([res.dispensary.latitude, res.dispensary.longitude])
                   .addTo(map);
                 
                 map.on("load", () => {
                   setMap(map);
                   map.resize();
                
                 });
               };
               if (!map) initializeMap({ setMap, mapContainer });
              }
            }
              else{
                setDispensaryStatus(DispensaryStatus.Invalid);
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


    return (
        <>
            <PageHeader title="Admin/Users/Profile" edit={false} subtitle={`${userDetails.name}'s details`} />
              
            <div class="row">
            <div class="col-lg-4">
            <div class="card">
                <div class="card-header">
                  <h3 class="card-title">Profile</h3>
                </div>
                <div class="card-body">
                
                    <div class="row mb-3">
                      <div class="col-auto">
                      <span className="avatar" style={{width:"5em", height:"5em", border:"1px solid #ceceff",backgroundImage: `url("${(userDetails && userDetails.picture)?userDetails.picture:defaultAvatar}")`}}></span>
                      </div>
                      <div class="col">
                        <div class="mb-2">
                            <h3><strong>{userDetails.name}</strong></h3>
                            <p style={{fontWeight:"700"}}>{userDetails.email}</p>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                        
                        
                    <div class="col-lg-6">
                        
                        


                        <div class="mb-2">
                            <p style={{fontWeight:"700"}}>Age:</p>
                        </div>
                        <div class="mb-2">
                            <p style={{fontWeight:"700"}}>User type:</p>
                        </div>
                        <div class="mb-2">
                            <p style={{fontWeight:"700"}}>Email verification:</p>
                        </div>
                        <div class="mb-2">
                            <p style={{fontWeight:"700"}}>Status:</p>
                        </div>
                        <div class="mb-2">
                            <p style={{fontWeight:"700"}}>Last session</p>
                        </div>
                        <div class="mb-2">
                            <p style={{fontWeight:"700"}}>Last IP</p>
                        </div>
                        <div class="mb-2">
                            <p style={{fontWeight:"700"}}>Last payment</p>
                        </div>
                        </div>
                        
                        
                        <div class="col-lg-6 col-sm-6 col-xl-6">
                        
                        


                    <div class="mb-2">
                       <p><strong>{
                           (userDetails)?
                                calculate_age(userDetails.birthdate):""
                       
                       }</strong></p>
                    </div>
                    <div class="mb-2">
                        <p><strong>{userDetails.type}</strong></p>
                    </div>
                    <div class="mb-2">
                        <p><strong>{
                        (userDetails.isVerified)?<span class="badge badge-success">True</span>:<span class="badge badge-danger">False</span>}
                        </strong></p>
                    </div>
                    <div class="mb-2">
                        <p><strong>{
                        (userDetails.isActive)?<span class="badge badge-success">Active</span>:<span class="badge badge-danger">Banned</span>}
                        </strong></p>
                    </div>
                    <div class="mb-2">
                       <p><strong>{"last session"}</strong></p>
                    </div>
                    <div class="mb-2">
                       <p><strong>last ip</strong></p>
                    </div>
                    <div class="mb-2">
                       <p><strong>last payment</strong></p>
                    </div>
                    </div>

                  






                    </div>

                        {
                          (userDetails && userDetails.type=="DISPENSARY")?(
                            <div class="mb-3">
                        <br></br><br></br>
                        <h3>Subscription status</h3>
                          <div class="progress mb-2">
                            <div class="progress-bar" style={{width: "38%"}} role="progressbar" aria-valuenow="38" aria-valuemin="0" aria-valuemax="100">
                              <span class="sr-only">38% Complete</span>
                            </div>
                            
                          </div>
                          <smal>date - date</smal>
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




                <div class="col-lg-8">
                    <div class="card">
                    <div class="card-header">
                    <h3 class="card-title">Dispensary location</h3>
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