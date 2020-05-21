import React from 'react';
import { Link } from 'react-router-dom';

function PageHeader(props) {


    return(
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col-auto">
            <div div className="page-pretitle">
              {props.title}
            </div>
            <h2 className="page-title">
              {props.subtitle}
            </h2>
          </div>
          <div className="col-auto ml-auto d-print-none">
          {
            (props.nameButton)?(
              <Link to={props.link} className="btn btn-primary ml-3 d-none d-sm-inline-block" data-toggle={props.toggle} data-target={props.target} >
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                {props.nameButton}
              </Link>
            ):("")
          }
          </div>
        </div>
      </div>
    )
}
export { PageHeader }; 