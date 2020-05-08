import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import { accountService } from '../_services';

import { Login } from './login';
import { Register } from './register';
import { VerifyEmail } from './verifyEmail';
import { ForgotPassword } from './forgotPassword';
import { ResetPassword } from './resetPassword';

function Account({ history, match }) {
    const { path } = match;

    useEffect(() => {
        // redirect to home if already logged in
        if (accountService.userValue) {
            history.push('/');
        }
    }, []);

    return (
        <div className="flex-fill d-flex flex-column justify-content-center">
            <div className="container-tight py-6">
                <div className="text-center mb-4">
                    <img src="../../../app/assets/img/flags/ad.svg" height="36" alt="" />
                </div>
                <Switch>
                    <Route path={`${path}/login`} component={Login} />
                    <Route path={`${path}/register`} component={Register} />
                    <Route path={`${path}/verify-email`} component={VerifyEmail} />
                    <Route path={`${path}/forgot-password`} component={ForgotPassword} />
                    <Route path={`${path}/reset-password`} component={ResetPassword} />
                </Switch>
            </div>
        </div>
    );
}

export { Account };