import React from 'react';
import { Link } from 'react-router-dom';
import { purchaseService, alertService, planService, } from '../_services';

function PricingCard(props) {

    const requestFreePlan = () => {
          purchaseService.create({plan:props.plan._id})
              .then(() => {
               
                  alertService.success('Request sent!', { keepAfterRouteChange: true });
                 
              })
              .catch(error => {
                
                  // alertService.error(error);
              });
    }
	

    return (
        <>
       
            <div className="col-sm-6 col-lg-3">
              <div className="card">
                {console.log(props)}
                <div className="card-body text-center">
                  <div className="text-uppercase text-muted">{props.plan.name}</div>
                    <div className="h1 my-3">{`$ ${props.plan.price}`}</div>
                    <div className="h2 my-3">{`${props.plan.days} days`}</div>
                    <ul class="list-unstyled lh-lg">
                   
                  
                    {props.plan.description.map(x=>
                    <li>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon mr-1 text-success" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><path d="M5 12l5 5l10 -10"></path></svg>
                    {x}
                    </li>
                      )}
                      </ul>
                    <div className="text-center mt-4">
                      {
                        props.plan.price!=0 ? <Link to={`subscription/purchase/create/${props.plan._id}`} className="btn btn-secondary btn-block">Choose plan</Link> : <Link onClick={requestFreePlan} className="btn btn-secondary btn-block">Request this now</Link>
                      }
                  </div>
                </div>
              </div>
            </div>
        
        </>
    );
}

export { PricingCard };