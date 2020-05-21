import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, PricingCard } from "../_components"
import { planService, subscriptionService, accountService } from "../_services"

function Overview({ match }) {
    const { path } = match;
    const [plans, setPlans] = useState("")
    const [subscription, setSubscription] = useState("")
    const user = accountService.userValue;
    const [ componentMode, setComponentMode ] = useState("") //0 -> no subscription ---- //1-> subscribed

    const fetch = () => {
        
        subscriptionService.getById(user._id).then(subscription => {
            if(subscription){
                setSubscription(subscription)
                setComponentMode(1)
            }else{
                planService.getAll().then(plans => {
                    setPlans(plans)
                    setComponentMode(0)
                })
            }
            
        })

        
    }


    useEffect(() => {
        fetch();
    }, [])


    function getPlans(){
        return<> <PageHeader title="Subscriptions" subtitle="Select a plan"/>
            <div className="row">
            {
                plans && plans.map( plan => 
                    <PricingCard plan={plan} />
                )
            }
            </div></>
    }

    function getOverview(){
        return<div className="col-sm-6 col-lg-4">
        <div className="card">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <div className="subheader">Subscription status</div>
            </div>
            <div className="h1 mb-3">ACTIVE</div>

            <div className="h3 mb-3"><strong>PLAN: </strong>{(subscription)?subscription.purchase.planDetails.name:""}</div>
            <div className="h3 mb-3"><strong>YOU PAID: $</strong>{(subscription)?subscription.purchase.planDetails.price:""}</div>
            <div className="h3 mb-3"><strong>STARTING: </strong>{(subscription)?subscription.subscription_start:""}</div>
            <div className="h3 mb-3"><strong>ENDING: </strong>{(subscription)?subscription.subscription_end:""}</div>
            <br></br><br></br>
            <div className="h1 mb-3"><strong></strong>{(subscription)?subscription.daysleft:""} Days left</div>
            {/* <div className="d-flex mb-2">
              <div>Conversion rate</div>
              <div className="ml-auto">
                <span className="text-green d-inline-flex align-items-center lh-1">
                  7% <svg xmlns="http://www.w3.org/2000/svg" className="icon ml-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><polyline points="3 17 9 11 13 15 21 7"></polyline><polyline points="14 7 21 7 21 14"></polyline></svg>
                </span>
              </div>
            </div>
            <div className="progress progress-sm">
              <div className="progress-bar bg-blue" style={{width: "75%"}} role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                <span className="sr-only">75% Complete</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    }

    function getBody(){
    	if(componentMode===0){return getPlans()}
    	if(componentMode===1){return getOverview()}
    }


    return (
        <>
            {getBody()}
        </>
    );
}

export { Overview };