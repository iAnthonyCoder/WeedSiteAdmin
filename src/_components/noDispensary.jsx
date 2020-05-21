import React from 'react';


function NoDispensary(props) {

    return(
      <div className="empty">
        <div className="empty-icon">
          <img src="/static/illustrations/undraw_quitting_time_dm8t.svg" height="128" className="mb-4" alt=""/>
        </div>
        <p className="empty-title h3">This user doesn't have a dispensary yet.</p>
        <p className="empty-subtitle text-muted"></p>
        <div className="empty-action"></div>
      </div>
    )
}
export { NoDispensary }; 

