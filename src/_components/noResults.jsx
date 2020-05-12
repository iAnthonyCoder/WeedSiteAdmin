import React from 'react';
import { Link } from 'react-router-dom';

function NoResults(props) {
  


    return(
        
        <div class="empty">
                  <div class="empty-icon">
                    <img src="/static/illustrations/undraw_quitting_time_dm8t.svg" height="128" class="mb-4" alt=""/>
                  </div>
                  <p class="empty-title h3">No results found</p>
                  <p class="empty-subtitle text-muted">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                  <div class="empty-action">
                    
                  </div>
                </div>
    )
}

export { NoResults }; 

