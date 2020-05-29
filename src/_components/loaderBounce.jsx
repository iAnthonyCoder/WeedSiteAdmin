import React from 'react';
import BounceLoader from "react-spinners/BounceLoader";

function LoaderBounce(props) {
    return(
        <div style={{width:"100%", marginTop:"10em", display:"flex", alignItems:"center", justifyContent:"center"}}>
            <BounceLoader />
        </div>
    )
}

export { LoaderBounce }; 

