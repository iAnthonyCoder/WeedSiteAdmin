import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { List } from './list';
import { Details } from './details';
import { UserMenu } from './menu'

function Users({ match }) {
    const { path } = match;
    
    return (
        <Switch>
            <Route exact path={path} component={List} />
            <Route path={`${path}/:id/menu`} component={UserMenu} />
            <Route path={`${path}/:id`} component={Details} />
            {/* <Route path={`${path}/edit/:id`} component={AddEdit} /> */}
        </Switch>
    );
}

export {Users};