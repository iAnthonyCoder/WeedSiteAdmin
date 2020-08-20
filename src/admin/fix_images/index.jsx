import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Table } from './table';
import { Create } from './create';
import { Details } from './details';
import { List } from './list';

function Fix_images({ match }) {
    const { path } = match;

    return (
                <Switch>
                    <Route exact path={path} component={Table} />
                    {/* <Route path={`${path}/listbeta`} component={List} /> */}
                    <Route path={`${path}/create`} component={Create} />
                    <Route path={`${path}/update/:id`} component={Create} />
                    <Route path={`${path}/:id`} component={Details} />
                </Switch>
    );
}
export { Fix_images };