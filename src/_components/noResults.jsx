import React from 'react';

function NoResults(props) {
  
    return(
      <div className="empty">
        <div className="empty-icon">
          <img src="/static/illustrations/undraw_quitting_time_dm8t.svg" height="128" className="mb-4" alt=""/>
        </div>
        <p className="empty-title h3">No results found</p>
        <p className="empty-subtitle text-muted">
          Try adjusting your search or filter to find what you're looking for.
        </p>
        <div className="empty-action">
        </div>
      </div>
    )
}
export { NoResults }; 

