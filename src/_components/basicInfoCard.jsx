import React from 'react';

function BasicInfoCard(props) {

    return(
    <div class="card">
                <div class="card-header">
                  <h3 class="card-title">
                    Basic Indo
                  </h3>
                  <div class="card-actions">
                    <a href="#">
                      Edit configuration<svg xmlns="http://www.w3.org/2000/svg" class="icon ml-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"></path><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3"></path><line x1="16" y1="5" x2="19" y2="8"></line></svg>
                    </a>
                  </div>
                </div>
                <div class="card-body">
                  <dl class="row">
                    <dt class="col-5">Name: </dt>
                    <dd class="col-7">{props.name}</dd>
                    <dt class="col-5">City:</dt>
                    <dd class="col-7">{props.city}</dd>
                    <dt class="col-5">Address: </dt>
                    <dd class="col-7">{props.address}</dd>
                    <dt class="col-5">Latitude:</dt>
                    <dd class="col-7">{props.latitude}</dd>
                    <dt class="col-5">Longitude:</dt>
                    <dd class="col-7">{props.longitude}</dd>
                    <dt class="col-5">Phone:</dt>
                    <dd class="col-7">{props.phone}</dd>
                  </dl>
                </div>
              </div>
    )
}

export { BasicInfoCard }; 