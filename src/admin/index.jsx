import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { accountService } from '../_services';
import { Overview } from './overview';
import { history } from '../_helpers';
// import { Categories } from './categories';
import { Brands } from './brands';
// import { Users } from './users';
import { Dispensaries } from './dispensaries';
import { Security } from './security';
import { Products_requests } from './products_requests';
import { Products } from './products';
import { Users } from './users';
import { Categories } from './categories';
import { Subscriptions } from './subscriptions'
import { Parentcategories } from './parentcategories'
import { Strains } from './strains'
import Loadable from 'react-loadable';

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

    const Loading = () => (<div>Loading...</div>);


    return (
            <div className="content">
                <div className="container-xl">
                <Switch>
                    <Route exact path={path} component={Overview} />
                    <Route path={`${path}/users`} component={Users} />
                    <Route path={`${path}/categories`} component={Categories} />
                    <Route path={`${path}/parentcategories`} component={Parentcategories} />
                    <Route path={`${path}/brands`} component={Brands} />
                    <Route path={`${path}/dispensaries`} component={Dispensaries} />
                    <Route path={`${path}/requests/products`} component={Products_requests} />
                    <Route path={`${path}/security`} component={Security} />
                    <Route path={`${path}/products`} component={Products} />
                    <Route path={`${path}/subscriptions`} component={Subscriptions} />
                    <Route path={`${path}/strains`} component={Strains} />
                </Switch>
                </div>
            </div>
    );
}

export { Admin };