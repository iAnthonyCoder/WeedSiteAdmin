import React from 'react';
import { Link } from 'react-router-dom';

function PricingCard(props) {


    return (
        <>
       
            <div className="col-sm-6 col-lg-3">
              <div className="card">
                <div className="card-body text-center">
                  <div className="text-uppercase text-muted">{props.plan.name}</div>
                    <div className="h1 my-3">{`$ ${props.plan.price}`}</div>
                    <div className="h2 my-3">{`${props.plan.days} days`}</div>
                    <p>{props.plan.description}</p>
                    <div className="text-center mt-4">
                    <Link to={`subscription/purchase/create/${props.plan._id}`} className="btn btn-secondary btn-block">Choose plan</Link>
                  </div>
                </div>
              </div>
            </div>
        
        </>
    );
}

export { PricingCard };