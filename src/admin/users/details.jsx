import React, { useEffect, useState, useRef }  from 'react';
import mapboxgl from "mapbox-gl";
import { accountService, menuproductService } from '../../_services';
import { history } from '../../_helpers'
import { PageHeader, BasicInfoCard,ScheduleTableCard, NoDispensary, LoaderBounce, MainTable } from '../../_components';


function Details(props) {
	const [userDetails, setUserDetails] = useState("")
    const [dispensary, setDispensary] = useState("")
    const [schedule, setSchedule] = useState("")
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);
    const defaultAvatar = "./static/user.png";
    const columns = [
    	{
    	    Header: 'Name',
    	    accessor: 'name'
    	},
    	{
    	    Header: 'Category',
    	    accessor: row => row.category.name
    	},
    	{
    	    Header: 'Brand',
    	    accessor: row => (row.brand)?(row.brand.name):"",
    	},
    	{
    	    Header: 'Strain',
    	    accessor: row => (row.strain)?(row.strain.name):(<p style={{color:"red"}}>MISSING</p>)
    	},
    	{
    	  	Header: 'Actions',
    		width:"100px",

    	    Cell:({row})=>(
    	    	<span style={{width:"100px"}} class="dropdown position-static">
    	        	<button class="btn btn-white btn-sm dropdown-toggle align-text-top show" data-boundary="viewport" data-toggle="dropdown" aria-expanded="true">Actions</button>
    	          	<div class="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style={{position: "absolute", willChange: "transform", top: "0px", left: "0px", transform: "translate3d(852px, 181px, 0px)"}}>
    	            	<button onClick={()=>{details(row.original._id)}} class="dropdown-item">
    	            		Details
    	            	</button>
    	          	</div>
    	    	</span>
    	    )
    	}
  	]

	const enableStaticImageMap = ( _longitude, _latitude) => {
      	return `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-commercial+285A98(${_longitude},${_latitude})/${_longitude},${_latitude},13,0/600x300@2x?access_token=pk.eyJ1IjoiYW50aG9ueTk1MiIsImEiOiJjazl2enJuMWswNHJhM21vNHBpZGF3eXp0In0.zIyPl0plESkg395zI-WVsg`;
    }

    const fetchUserDatails = async () => {
    	await accountService.getById(props.match.params.id).then(async (res)=>{
            
            if(res!=null){
       
				(res.last_session)
					?	res.last_session=res.last_session.substr(0,10)
					:	res.last_session=""

				await setUserDetails(res)
				
				if(!res.dispensary){}
				
                else {
                	await setDispensary(res.dispensary);
                	await setSchedule(res.dispensary.schedule);
              	}
            }
        })
    }

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
	
    const details = (id) => {
    	history.push(`${props.match.params.id}/menu/${id}`)
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
                       					<p><strong>{(userDetails)?calculate_age(userDetails.birthdate):""}</strong></p>
                   	 				</div>
                    				<div className="mb-2">
                    				    <p><strong>{userDetails.type}</strong></p>
                    				</div>
                    				<div className="mb-2">
                    				    <p>
											<strong>{
                    				    		(userDetails.isVerified)?<span className="badge badge-success">True</span>:<span className="badge badge-danger">False</span>}
                    				    	</strong>
										</p>
                    				</div>
                    				<div className="mb-2">
                        				<p>
											<strong>{
                        						(userDetails.isActive)?<span className="badge badge-success">Active</span>:<span className="badge badge-danger">Banned</span>}
                        					</strong>
										</p>
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
										{ 
										  	(userDetails.subscription)?(
                                				<>
                                          			<div className="progress mb-2">
                                      					<div className="progress-bar" style={{width:`${userDetails.subscription.percentaje}%`}} role="progressbar" aria-valuenow={`${userDetails.subscription.percentaje}%`} aria-valuemin="0" aria-valuemax="100">
                                        					<span className="sr-only">`${userDetails.subscription.percentaje}% Complete`</span>
                                      					</div>
                                    				</div>
                                    				<smal>{userDetails.subscription.subscription_start} to {userDetails.subscription.subscription_end}</smal></>
                              				):(
												  <p>NOT SUBSCRIBED</p>
											)}
                        			</div>
                          		):("")
                        	}
              			</div>
            		</div>  
            		{
            		    (userDetails && userDetails.dispensary!=null)?(<BasicInfoCard dispensary={dispensary} />):("")
            		}
            		{
            		    (schedule.length>1)?(<ScheduleTableCard noEdit={true} dispensaryId={dispensary._id}/>):("")
            		}
            	</div>

                <div className="col-lg-8">

					<div class="card-tabs">
                		<ul class="nav nav-tabs">
                	  		<li class="nav-item"><a href="#tab-disp-1" class="nav-link active" data-toggle="tab">Map</a></li>
                	  		<li class="nav-item"><a href="#tab-disp-2" class="nav-link" data-toggle="tab">About</a></li>
							<li class="nav-item"><a href="#tab-disp-3" class="nav-link" data-toggle="tab">Deals</a></li>
							<li class="nav-item"><a href="#tab-disp-4" class="nav-link" data-toggle="tab">Announcement</a></li>
							<li class="nav-item"><a href="#tab-disp-5" class="nav-link" data-toggle="tab">Introduction</a></li>
                		</ul>
                		<div class="tab-content">
                	  		<div id="tab-disp-1" class="card tab-pane show active">
                	    		<div class="card-body">
								{ (userDetails && userDetails.dispensary==null)
									?	<NoDispensary />
									:	<img src={enableStaticImageMap(userDetails.dispensary.longitude, userDetails.dispensary.latitude)}></img>
                	    		}
                	    		</div>
                	  		</div>
							<div id="tab-disp-2" class="card tab-pane show">
                	    		<div class="card-body">
									<p>{dispensary.about}</p>
                	    		</div>
                	  		</div>
							<div id="tab-disp-3" class="card tab-pane show">
                	    		<div class="card-body">
									<p>{dispensary.firstpatient}</p>
                	    		</div>
                	  		</div>
							<div id="tab-disp-4" class="card tab-pane show">
                	    		<div class="card-body">
									<p>{dispensary.announcement}</p>
                	    		</div>
                	  		</div>
							<div id="tab-disp-5" class="card tab-pane show">
							  	<div class="card-body">
									<p>{dispensary.introduction}</p>
                	    		</div>
                	  		</div>
						</div>
					</div>
                 


                    { (userDetails && userDetails.dispensary==null) ?(
						""
					):(
						<div className="col-lg-12">
							<div className="box">
   								<MainTable  details={details} param={userDetails.dispensary._id} title={"MENU"} columns={columns} endPoint={menuproductService.getMenu} /> 
							</div>
						</div>
					)}


                </div>
        	</div>
		</>
    );
}

export { Details }