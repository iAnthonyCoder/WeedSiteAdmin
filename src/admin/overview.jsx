import React from 'react';
import { Link } from 'react-router-dom';
import { MainTable } from '../_components'

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
            <h2 style={{color:"red"}}>
            <strong>FELIX:</strong> LA DESCRIPTION SE TOMARA DESDE <a target="_blank" href="https://www.wikileaf.com" style={{color:"blue"}}>WWW.WIKILEAF.COM</a> Y SE COLOCARA EN LA REFERENCIA "WWWW.WIKILEAF.COM"<br></br>
            </h2>
            <p><Link to={`${path}/strains/create`}><button type="button" class="btn btn-success">AGREGAR STRAINS</button></Link></p>
            <hr></hr>
            <h2 style={{color:"red"}}>
            <strong>SERVER MANTENIANCE ON 15/6/2020:</strong> 11:00PM GTM-4:30 - EXPECTED TIME 30 MINUTES<br></br>
            <p>Adding async table: the example can be tested bellow.</p>
            </h2>

            <br></br><br></br>

            <MainTable />
        </div>
    );
}

export { Overview };