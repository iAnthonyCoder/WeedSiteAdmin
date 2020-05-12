import React, {useEffect, useState, Children} from 'react';

function SmallCardP3(props) {


    // const [ dispensary, setDispensary ] = useState(props.dispensary);


    return(
      <div class="card p-3"><div class="d-flex align-items-center">
        
      <span class={`stamp stamp-md bg-${props.color} mr-3`}>
        {props.children}
        </span><div>
        <div class="h4 m-0"><a href="#"><small>{props.name}</small></a></div><small class="sm text-muted">{props.description}</small></div>
      </div></div>
    )
}

export { SmallCardP3 }; 