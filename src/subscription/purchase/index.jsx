import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Create } from './create';

function Purchase({ match }) {
    const { path } = match;

    return (
        <Switch>
            <Route path={`${path}/create/:id`} component={Create} />
        </Switch>
    );
}
export { Purchase };