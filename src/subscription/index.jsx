import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Overview } from './overview';
import { Purchase } from './purchase'

function Subscription({ match }) {
    const { path } = match;

    return (

                <Switch>
                    <Route exact path={path} component={Overview} />
                    <Route path={`${path}/purchase`} component={Purchase} />
                </Switch>
       
    );
}
export { Subscription };