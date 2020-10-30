import React from 'react';

function ConfirmModal(props) {
  return(
    <div className="modal modal-blur fade show" id="modal-confirm" tabindex="-1" role="dialog" style="display: block; padding-right: 19px;" aria-modal="true">
      <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <div className="modal-title">Are you sure?</div>
            <div>If you proceed, you will lose all your personal data.</div>
          </div>
          <div className="modal-footer">
            <button onClick={()=>{props.confirmThis(0)}} type="button" className="btn btn-link link-secondary mr-auto" data-dismiss="modal">Cancel</button>
            <button onClick={()=>{props.confirmThis(1)}} type="button" className="btn btn-danger" data-dismiss="modal">Yes, delete all my data</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export { ConfirmModal }; 