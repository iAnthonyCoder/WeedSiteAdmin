import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Table } from './table';
import { Details } from './details';

function Brands({ match }) {
    const { path } = match;
        
    return (
            
        <Switch>
            <Route exact path={path} component={Table} />
            <Route path={`${path}/:id`} component={Details} />
        </Switch>
            
    );
}

export { Brands };