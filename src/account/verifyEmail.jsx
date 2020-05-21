import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import { accountService, alertService } from '../_services';

function VerifyEmail({ history }) {
    const EmailStatus = {
        Verifying: 'Verifying',
        Failed: 'Failed'
    }

    const [emailStatus, setEmailStatus] = useState(EmailStatus.Verifying);

    useEffect(() => {
       
        const { token } = queryString.parse(window.location.search);
       
        // remove token from url to prevent http referer leakage
        // history.replace(location.pathname);
        
        accountService.verifyEmail(token)
            .then(() => {
                alertService.success('Verification successful, you can now login.', { keepAfterRouteChange: true });
                history.push('login');
            })
            .catch(() => {
                setEmailStatus(EmailStatus.Failed);
            });
    }, []);

    function getBody() {
        switch (emailStatus) {
            case EmailStatus.Verifying:
                return <div>Verifying...</div>;
            case EmailStatus.Failed:
                return <div>Verification failed, you can also verify your account using the <Link to="forgot-password">forgot password</Link> page.</div>;
        }
    }

    return (
        <div className="card card-md">
            <div className="card-body">
                <h2 className="mb-5 text-center">Verify Email</h2>
                {getBody()}
            </div>
        </div>
    )
}

export { VerifyEmail }; 