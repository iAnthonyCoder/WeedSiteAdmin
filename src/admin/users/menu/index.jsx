import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Details } from './details';

function UserMenu({ match }) {
    const { path } = match;
    
    return (
        <Switch>
            <Route path={`${path}/:id`} component={Details} />
        </Switch>
    );
}

export {UserMenu};