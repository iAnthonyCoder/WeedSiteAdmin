import React, { useState, useEffect } from 'react';
import { Nav, Alert, Footer } from '../_components';
import { accountService } from '../_services';


function Layout(props) {
    const [user, setUser] = useState({});


    useEffect(() => {

        const subscription = accountService.user.subscribe(x => setUser(x));
   
        return subscription.unsubscribe;
    }, []);


    return(
        <div className={'antialiased ' + (user && ' ')}>
            <div className="page">
                <Nav />
                <Alert />
                <div className="content">
                    <div className="container-xl">
                        {props.children}
                    </div>
                    <Footer ></Footer>
                </div>
            </div> 
        </div>
    
  )
}
export { Layout }; 