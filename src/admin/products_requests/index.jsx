import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Table } from './table';

function Products_requests({ match }) {
    const { path } = match;
        
    return (
     
     <Switch>
         <Route exact path={path} component={Table} />
     </Switch>
            
    );
}

export { Products_requests };