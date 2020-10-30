import React from 'react';

function SmallCardP3(props) {
  return(
    <div className="card p-3">
      <div className="d-flex align-items-center">
        <span className={`stamp stamp-md bg-${props.color} mr-3`}>
          {props.children}
        </span>
        <div>
          <div className="h4 m-0">
            <a href="#"><small>{props.name}</small></a>
          </div>
          <small className="sm text-muted">{props.description}</small>
        </div>
      </div>
    </div>
  )
}
export { SmallCardP3 }; 