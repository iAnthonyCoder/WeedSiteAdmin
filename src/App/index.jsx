import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import { Role } from '../_helpers';
import { accountService } from '../_services';
import { Nav, PrivateRoute, Alert, Footer } from '../_components';
import { Home } from '../home';
import { Profile } from '../profile';
import { Dispensary } from '../dispensary';
// import { Admin } from '../admin';
import { Account } from '../account';

function App() {
    const { pathname } = useLocation();  
    const [user, setUser] = useState({});

    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x));
        return subscription.unsubscribe;
    }, []);

    return (
        <div className={'antialiased ' + (user && ' ')}>
            <div classNAme="page">
            <Nav />
            <Alert />
            <Switch>
                <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute path="/profile" component={Profile} />
                {/* <PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} /> */}
                <PrivateRoute path="/dispensary" component={Dispensary} />
                <Route path="/account" component={Account} />
                <Redirect from="*" to="/" /> 
            </Switch>
            
            </div> 
        </div>
    );
}

export { App }; 