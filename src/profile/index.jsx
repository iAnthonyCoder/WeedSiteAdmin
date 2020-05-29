import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Details } from './details';
import { Update } from './update';

function Profile({ match }) {
    const { path } = match;
    
    return (
        <div className="content">
            <div className="container-xl">
                <Switch>
                    <Route exact path={path} component={Details} />
                    <Route path={`${path}/update`} component={Update} />
                </Switch>
            </div>
        </div>
    );
}

export { Profile };