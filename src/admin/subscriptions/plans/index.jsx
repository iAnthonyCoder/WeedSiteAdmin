import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Table } from './table';

function Plans({ match }) {
    const { path } = match;
    
    return (
        <Switch>
            <Route exact path={path} component={Table} />
        </Switch>    
    );
}

export {Plans};