import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Table } from './table';
import { Pending } from './pending';

function Payments({ match }) {
    const { path } = match;
    
    return (
        <Switch>
            <Route exact path={path} component={Table} />
            <Route path={`${path}/pending`} component={Pending} />
        </Switch>    
    );
}

export {Payments};