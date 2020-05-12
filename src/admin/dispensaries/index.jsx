import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { List } from './list';


function Dispensaries({ match }) {
    const { path } = match;
    
    return (
        <Switch>
            <Route exact path={path} component={List} />
            {/* <Route path={`${path}/:id`} component={Details} /> */}
            {/* <Route path={`${path}/edit/:id`} component={AddEdit} /> */}
        </Switch>
    );
}

export { Dispensaries };