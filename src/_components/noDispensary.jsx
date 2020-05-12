import React from 'react';
import { Link } from 'react-router-dom';


function NoDispensary(props) {
  


    return(
        
        <div class="empty">
                  <div class="empty-icon">
                    <img src="/static/illustrations/undraw_quitting_time_dm8t.svg" height="128" class="mb-4" alt=""/>
                  </div>
                  <p class="empty-title h3">This user doesn't have a dispensary yet.</p>
                  <p class="empty-subtitle text-muted">
                    
                  </p>
                  <div class="empty-action">
                    
                  </div>
                </div>
    )
}

export { NoDispensary }; 

