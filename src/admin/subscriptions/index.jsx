import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Plans } from './plans';
import { Payments } from './payments';

function Subscriptions({ match }) {
    const { path } = match;
    
    return (
            
                <Switch>
                    {/* <Route exact path={path} component={} /> */}
                    <Route path={`${path}/payments`} component={Payments} />
                    <Route path={`${path}/plans`} component={Plans} />
                </Switch>
            
    );
}

export { Subscriptions };