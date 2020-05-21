import React from 'react';
import BarLoader from "react-spinners/BarLoader";

function LoadingSpinner(props) {

  return(
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Fetching data...</h3>
      </div>
      <div className="empty" style={{height:"300px", marginLeft:"20px"}}>
        <BarLoader />
      </div>
    </div>
  )
}

export { LoadingSpinner }; 

