import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Table } from './table';
import { Create } from './create';
import { Mymenu } from './mymenu';
import { Details } from './details';

function Product({ match }) {
    const { path } = match;

    return (

                <Switch>
                    {/* <Route exact path={path} component={Table} /> */}
                    <Route path={`${path}/list`} component={Table} />
                    <Route path={`${path}/mymenu/create`} component={Create} />
                    <Route path={`${path}/mymenu/update/:id`} component={Create} />
                    <Route path={`${path}/mymenu/:id`} component={Details} />
                    <Route path={`${path}/mymenu`} component={Mymenu} />
                </Switch>

    );
}

export { Product };