import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { accountService } from '../_services';
import { Overview } from './overview';
import { history } from '../_helpers';
import { Categories } from './categories';
import { Brands } from './brands';
import { Users } from './users';
import { Dispensaries } from './dispensaries';
import { Products_requests } from './products_requests';

function Admin({ match }) {
    const { path } = match;
    const user = accountService.userValue;

    const checkIsAdmin = async ()=>{
        if(user.type!="ADMIN")
        {
        history.push('.');}
    }

    useEffect(() => {
        checkIsAdmin();

    }, [])


    return (
            <div className="content">
                <div className="container-xl">
                <Switch>
                    <Route exact path={path} component={Overview} />
                    <Route path={`${path}/users`} component={Users} />
                    <Route path={`${path}/categories`} component={Categories} />
                    <Route path={`${path}/brands`} component={Brands} />
                    <Route path={`${path}/dispensaries`} component={Dispensaries} />
                    <Route path={`${path}/requests/products`} component={Products_requests} />
                    {/* <Route path={`${path}/details`} component={Brands} /> */}
                </Switch>
                </div>
            </div>
    );
}

export { Admin };