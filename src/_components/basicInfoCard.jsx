import React from 'react';

function BasicInfoCard(props) {
  return(
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Location details</h3>
        <div className="card-actions"></div>
      </div>
      {
        (props.dispensary && props.dispensary.name)?(
          <div className="card-body">
            <dl className="row">
              <dt className="col-5">Name: </dt>
              <dd className="col-7">{props.dispensary.name}</dd>
              <dt className="col-5">City:</dt>
              <dd className="col-7">{props.dispensary.city.name}</dd>
              <dt className="col-5">Address: </dt>
              <dd className="col-7">{props.dispensary.address}</dd>
              <dt className="col-5">Latitude:</dt>
              <dd className="col-7">{props.dispensary.latitude}</dd>
              <dt className="col-5">Longitude:</dt>
              <dd className="col-7">{props.dispensary.longitude}</dd>
              <dt className="col-5">Phone:</dt>
              <dd className="col-7">{props.dispensary.phone}</dd>
            </dl>
          </div>
        ):("")
      }
    </div>
  )
}
export { BasicInfoCard }; 