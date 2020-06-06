import React from 'react';
import { Link } from 'react-router-dom';

function Overview({ match }) {
    const { path } = match;

    return (
        <div>

            <h1>TAREAS</h1>
            <h2 style={{color:"red"}}>
            <strong>EDEN:</strong> PRODUCTOS POR BRAND DESDE LA A ASCENDENTE <br></br>
            <strong>EDMUNDO:</strong> PRODUCTOS POR BRAND DESDE LA Z DESCENDENTE
            </h2>
            <p><Link to={`${path}/products/create`}><button type="button" class="btn btn-success">AGREGAR PRODUCTOS</button></Link></p>
<hr></hr>
            <h2 style={{color:"red"}}>
            <strong>FELIX:</strong> AGREGAR STRAINS DESDE <a target="_blank" href="https://www.leafly.com/strains?sort=name" style={{color:"blue"}}>AQUI</a><br></br>
            </h2>
            <p><Link to={`${path}/strains/create`}><button type="button" class="btn btn-success">AGREGAR STRAINS</button></Link></p>
            <br></br><br></br>
        </div>
    );
}

export { Overview };