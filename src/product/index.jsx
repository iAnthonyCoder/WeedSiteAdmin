import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Table } from './table';
import { Create } from './create';

function Product({ match }) {
    const { path } = match;

    return (
        <div className="content">
            <div className="container-xl">
                <Switch>
                    <Route exact path={path} component={Table} />
                    <Route path={`${path}/create`} component={Create} />
                </Switch>
            </div>

        </div>
    );
}

export { Product };