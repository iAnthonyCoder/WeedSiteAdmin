import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Sessions } from './sessions';
import { Activity } from './activity';

function Security({ match }) {
    const { path } = match;
    
    return (
            
                <Switch>
                    {/* <Route exact path={path} component={} /> */}
                    <Route path={`${path}/activity`} component={Activity} />
                    <Route path={`${path}/sessions`} component={Sessions} />
                </Switch>
            
    );
}

export { Security };