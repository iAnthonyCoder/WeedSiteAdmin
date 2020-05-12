import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Table } from './table';

function Categories({ match }) {
    const { path } = match;
    
    return (
            
                <Switch>
                    <Route exact path={path} component={Table} />
                </Switch>
            
    );
}

export { Categories };