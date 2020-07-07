import React from 'react';

function BasicInfoCard(props) {
	return(
    	<div className="card">
    		<div className="card-header">
    	    	<h3 className="card-title">Dispensary basic info</h3>
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

    	    	      		{(props.dispensary.phone)?(
								<>
    	    	      		    	<dt className="col-5">Phone:</dt>
    	    	      		    	<dd className="col-7">{props.dispensary.phone}</dd>
								</>
    	    	      		):("")}

    	    	      		{(props.dispensary.email)?(
								<>
    	    	      		    	<dt className="col-5">Email:</dt>
    	    	      		    	<dd className="col-7">{props.dispensary.email}</dd>
								</>
    	    	      		):("")}

							{(props.dispensary.website)?(
								<>
    	    	      		    	<dt className="col-5">Website:</dt>
    	    	      		    	<dd className="col-7">{props.dispensary.website}</dd>
								</>
    	    	      		):("")}

							{(props.dispensary.facebook)?(
								<>
    	    	      		    	<dt className="col-5">Facebook:</dt>
    	    	      		    	<dd className="col-7">{props.dispensary.facebook}</dd>
								</>
    	    	      		):("")}


							{(props.dispensary.twitter)?(
								<>
    	    	      		    	<dt className="col-5">Twitter:</dt>
    	    	      		    	<dd className="col-7">{props.dispensary.twitter}</dd>
								</>
    	    	      		):("")}


							{(props.dispensary.instagram)?(
								<>
    	    	      		    	<dt className="col-5">Instagram:</dt>
    	    	      		    	<dd className="col-7">{props.dispensary.instagram}</dd>
								</>
    	    	      		):("")}



							{(props.dispensary.taxes)?(
								<>
    	    	      		    	<dt className="col-5">Tax rate:</dt>
    	    	      		    	<dd className="col-7">{props.dispensary.taxes}%</dd>
								</>
    	    	      		):("")}





							{(props.dispensary.licenseType)?(
								<>
    	    	      		    	<dt className="col-5">License type:</dt>
    	    	      		    	<dd className="col-7">{props.dispensary.licenseType}</dd>
								</>
    	    	      		):("")}

							{(props.dispensary.license)?(
								<>
    	    	      		    	<dt className="col-5">License:</dt>
    	    	      		    	<dd className="col-7">{props.dispensary.license}</dd>
								</>
    	    	      		):("")}

							{(props.dispensary.isMastercardAcepted)?(
								<>
    	    	      		    	<dt className="col-5">MasterCard Acepted: </dt>
    	    	      		    	<dd className="col-7">Yes</dd>
								</>
    	    	      		):("")}

							{(props.dispensary.isAmericanexpressAcepted)?(
								<>
    	    	      		    	<dt className="col-5">AmericanExpress Acepted: </dt>
    	    	      		    	<dd className="col-7">Yes</dd>
								</>
    	    	      		):("")}

							{(props.dispensary.isVisaAcepted)?(
								<>
    	    	      		    	<dt className="col-5">Visa Acepted: </dt>
    	    	      		    	<dd className="col-7">Yes</dd>
								</>
    	    	      		):("")}

							{(props.dispensary.isAtmAcepted)?(
								<>
    	    	      		    	<dt className="col-5">ATM Available: </dt>
    	    	      		    	<dd className="col-7">Yes</dd>
								</>
    	    	      		):("")}

    	    			</dl>
    	    		</div>
    	    	):("")
    		}
    	</div>
  	)
}
export { BasicInfoCard }; 