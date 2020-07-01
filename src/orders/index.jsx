import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Table } from './table';
import { Details } from './details';

function Orders({ match }) {
    const { path } = match;

    return (
        <Switch>
            <Route exact path={path} component={Table} /> 
            {/* <Route path={`${path}/list`} component={Table} /> */}
            <Route path={`${path}/:id`} component={Details} />
        </Switch>
    );
}

export { Orders };