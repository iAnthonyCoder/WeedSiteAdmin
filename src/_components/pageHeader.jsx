import React from 'react';
import { Link } from 'react-router-dom';

function PageHeader(props) {
  
    return(
      
      <div class="page-header">
    
      <div class="row align-items-center">
        <div class="col-auto">
          <div class="page-pretitle">
            {props.title}
          </div>
          <h2 class="page-title">
            {props.subtitle}
          </h2>
        </div>
        <div class="col-auto ml-auto d-print-none">
          {
            (props.nameButton)?(
              <Link to={props.link} class="btn btn-primary ml-3 d-none d-sm-inline-block" data-toggle={props.toggle} data-target={props.target} >
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            {props.nameButton}
          </Link>
            ):""
          }
          
         
        </div>
      </div>
    </div>
    )
}

export { PageHeader }; 