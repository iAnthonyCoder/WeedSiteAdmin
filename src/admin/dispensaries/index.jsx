import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { List } from './list';
import { Create } from './create';
import Fixpassword from './fixpassword';

function Dispensaries({ match }) {
    const { path } = match;
    
    return (
        <Switch>
            <Route exact path={path} component={List} />
            <Route path={`${path}/create`} component={Create} />
            <Route path={`${path}/fixpassword`} component={Fixpassword} />
            {/* <Route path={`${path}/edit/:id`} component={AddEdit} /> */}
        </Switch>
    );
}

export { Dispensaries };