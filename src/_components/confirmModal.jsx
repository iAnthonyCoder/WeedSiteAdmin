import React from 'react';
import { Link } from 'react-router-dom';

function ConfirmModal(props) {
  


    return(
        
        <div class="modal modal-blur fade show" id="modal-confirm" tabindex="-1" role="dialog" style="display: block; padding-right: 19px;" aria-modal="true">
        <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <div class="modal-title">Are you sure?</div>
              <div>If you proceed, you will lose all your personal data.</div>
            </div>
            <div class="modal-footer">
              <button onClick={()=>{props.confirmThis(0)}} type="button" class="btn btn-link link-secondary mr-auto" data-dismiss="modal">Cancel</button>
              <button onClick={()=>{props.confirmThis(1)}} type="button" class="btn btn-danger" data-dismiss="modal">Yes, delete all my data</button>
            </div>
          </div>
        </div>
      </div>
    )
}

export { ConfirmModal }; 