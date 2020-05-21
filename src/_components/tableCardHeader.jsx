import React from 'react';

function TableCardHeader(props) {
  
    return(
    	<div className="card-header">
    		<h3 className="card-title">{props.title}</h3>
      			{/* <div className="card-body border-bottom py-3">
              			<div className="d-flex">
                 			<div className="text-muted">
                  				Show
                  				<div className="mx-2 d-inline-block">
                    			<input type="text" className="form-control form-control-sm" value="8" size="3"/>
                  			</div>
                  				entries
                			</div> 
              			</div>
              		</div> 
            	*/}
      		<div className="ml-auto text-muted">
        		Search:
        		<div className="ml-2 d-inline-block">
          			<input type="text" onChange={props.handleSearch} className="form-control form-control-sm"/>
        		</div>
      		</div>
    	</div>    
    )
}

export { TableCardHeader }; 