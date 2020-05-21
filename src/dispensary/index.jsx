import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Details } from './details';
import { Update } from './update';
import { Create } from './create';

function Dispensary({ match }) {
    const { path } = match;
    
    return (
        <div className="content">
            <div className="container-xl">
                <Switch>
                    <Route exact path={path} component={Details} />
                    <Route path={`${path}/update/:id`} component={Update} />
                    <Route path={`${path}/create`} component={Create} />
                </Switch>
            </div>
        </div>
    );
}

export { Dispensary };