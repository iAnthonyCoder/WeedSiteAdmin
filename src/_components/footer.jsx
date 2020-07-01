import React, { useState, useEffect } from 'react';
import { accountService } from '../_services';

function Footer() {

  const [user, setUser] = useState({});

  useEffect(() => {
    const subscription = accountService.user.subscribe(x => setUser(x));
    return subscription.unsubscribe;
  }, []);

  if (!user) return null;

  return (
    <footer className="footer footer-transparent">
      <div className="container">
        <div className="row text-center align-items-center flex-row-reverse">
          <div className="col-lg-auto ml-lg-auto">
            <div className="col-12 col-lg-auto mt-3 mt-lg-0">
              Made with <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-md" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><path d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7"></path></svg> 
              and <a href="https://preview-dev.tabler.io/" className="link-secondary"> Tabler</a> by <a href="https://icodit.net/" style={{color:"blue"}} className="link-secondary"> iAnthonyCoder</a>
  
            </div>
            
          </div>
          <div className="col-12 col-lg-auto mt-3 mt-lg-0">
            Copyright © 2020
            <a href="https://weedzly.com/" className="link-secondary"> Weedzly</a>.
            All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
export { Footer }; 