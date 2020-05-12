import React, {useEffect, useState} from 'react';

function BasicInfoCard(props) {


  


    return(
    <div class="card">
     
                <div class="card-header">
                  <h3 class="card-title">
                    Warehouse details
                  </h3>
                  <div class="card-actions">
                    {
                      (props.edit)?(
                        <a href="#">
                      Edit details<svg xmlns="http://www.w3.org/2000/svg" class="icon ml-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"></path><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3"></path><line x1="16" y1="5" x2="19" y2="8"></line></svg>
                    </a>
                      ):("")
                    }
                    
                  </div>
                </div>
                    {
                      (props.dispensary && props.dispensary.name)?(
                        <div class="card-body">
                          <dl class="row">
                            <dt class="col-5">Name: </dt>
                            <dd class="col-7">{props.dispensary.name}</dd>
                            <dt class="col-5">City:</dt>
                            <dd class="col-7">{props.dispensary.city.name}</dd>
                            <dt class="col-5">Address: </dt>
                            <dd class="col-7">{props.dispensary.address}</dd>
                            <dt class="col-5">Latitude:</dt>
                            <dd class="col-7">{props.dispensary.latitude}</dd>
                            <dt class="col-5">Longitude:</dt>
                            <dd class="col-7">{props.dispensary.longitude}</dd>
                            <dt class="col-5">Phone:</dt>
                            <dd class="col-7">{props.dispensary.phone}</dd>
                          </dl>
                        </div>
                      ):("")
                    }
                

              </div>
    )
}

export { BasicInfoCard }; 