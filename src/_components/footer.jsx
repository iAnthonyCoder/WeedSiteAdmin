import React, { useState, useEffect } from 'react';
import { NavLink, Route } from 'react-router-dom';

import { Role } from '../_helpers';
import { accountService } from '../_services';

function Footer() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x));
        return subscription.unsubscribe;
    }, []);

    // only show nav when logged in
    if (!user) return null;

    return (
        <footer className="footer footer-transparent">
        <div className="container">
          <div className="row text-center align-items-center flex-row-reverse">
            <div className="col-lg-auto ml-lg-auto">
              <ul className="list-inline list-inline-dots mb-0">
                <li className="list-inline-item"><a href="./docs/index.html" className="link-secondary">Documentation</a></li>
                <li className="list-inline-item"><a href="./faq.html" className="link-secondary">FAQ</a></li>
                <li className="list-inline-item"><a href="https://github.com/tabler/tabler" target="_blank" className="link-secondary">Source code</a></li>
              </ul>
            </div>
            <div className="col-12 col-lg-auto mt-3 mt-lg-0">
              Copyright © 2020
              <a href="." className="link-secondary">Tabler</a>.
              All rights reserved.
            </div>
          </div>
        </div>
      </footer>

    );
}


export { Footer }; 