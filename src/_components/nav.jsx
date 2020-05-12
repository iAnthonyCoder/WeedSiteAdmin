import React, { useState, useEffect } from 'react';
import { NavLink, Route, Link } from 'react-router-dom';

import { Role } from '../_helpers';
import { accountService } from '../_services';

function Nav() {

    const UserType = {
      None: 'None',
      Dispensary: 'Dispensary',
      Admin: 'Admin',
    }
    const [user, setUser] = useState({});
    const userDetails = accountService.userValue;
    const defaultAvatar = "./static/user.png";

    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x));
        return subscription.unsubscribe;
    }, []);

    // only show nav when logged in
    if (!user) {return null};



    function getAdminNav(){
      
      
      return (
        <header id="navbar" className="navbar navbar-expand-md navbar-dark">
          
        <div className="container-xl">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-menu">
            <span className="navbar-toggler-icon"></span>
          </button>
          <NavLink className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pr-0 pr-md-3" to={`/`}>
          
            <img src="../static/logo-white.svg" alt="Tabler" className="navbar-brand-image" />
            </NavLink>
          <div className="navbar-nav flex-row order-md-last">
            <div className="nav-item dropdown d-none d-md-flex mr-3">
              <a href="#" className="nav-link px-0" data-toggle="dropdown" tabIndex="-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /></svg>
                <span className="badge bg-red"></span>
              </a>
              <div className="dropdown-menu dropdown-menu-right dropdown-menu-card">
              <a class="dropdown-item d-flex bg-light"><span class="avatar mr-3 align-self-center" style={{backgroundImage: "url(&quot;demo/faces/female/1.jpg&quot;)"}}></span><div><strong>Alice</strong> started new task: Tabler UI design.<div class="small">1 hour ago</div></div></a>
              </div>
            </div>
            <div className="nav-item dropdown">
              <a href="#" className="nav-link d-flex lh-1 text-reset p-0" data-toggle="dropdown">
                <span className="avatar" style={{backgroundImage: `url({"./static/avatars/000m.jpg"})`}}></span>
                <div className="d-none d-xl-block pl-2">
                  <div>{(userDetails)?userDetails.name:""}</div>
                  <div className="mt-1 small text-muted">{(userDetails)?userDetails.type:""}</div>
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-right">
  
                <NavLink className="dropdown-item"  to={`/profile/update`}>
                
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon dropdown-item-icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><circle cx="12" cy="12" r="3" /></svg>
                  Update Profile
                  </NavLink>
                {/* <a className="dropdown-item" href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon dropdown-item-icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg>
                  Another action
                </a> */}
                <div className="dropdown-divider"></div>
           
                <a onClick={accountService.logout} className="dropdown-item" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-md" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path><path d="M7 12h14l-3 -3m0 6l3 -3"></path></svg>
                &nbsp;Logout</a>
              </div>
            </div>
          </div>
  
  
          <div className="collapse navbar-collapse" id="navbar-menu">
            <div className="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center">
              <ul className="navbar-nav">

              <li class="nav-item dropdown">
                          <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" role="button" aria-expanded="false">
                            <span class="nav-link-title">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-md" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><rect x="5" y="3" width="14" height="18" rx="2"></rect><line x1="9" y1="7" x2="15" y2="7"></line><line x1="9" y1="11" x2="15" y2="11"></line><line x1="9" y1="15" x2="13" y2="15"></line></svg>
                            &nbsp;Data
                            </span>
                          </a>
                          <ul class="dropdown-menu">
                            <li>
                              <Link className="dropdown-item" to={'/admin/users'}>
                              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-md" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><circle cx="12" cy="7" r="4"></circle><path d="M5.5 21v-2a4 4 0 0 1 4 -4h5a4 4 0 0 1 4 4v2"></path></svg>
                              &nbsp;Users
                              </Link>
                            </li>
                            <li>
                              <Link className="dropdown-item" to={'/admin/dispensaries'}>
                              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-md" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><line x1="3" y1="21" x2="21" y2="21"></line><path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4"></path><path d="M5 21v-10.15"></path><path d="M19 21v-10.15"></path><path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4"></path></svg>
                              &nbsp;
                                Dispensaries
                              </Link>
                            </li>
                            <li>
                              <Link className="dropdown-item" to={'/admin/products'}>
                              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-md" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3"></polyline><line x1="12" y1="12" x2="20" y2="7.5"></line><line x1="12" y1="12" x2="12" y2="21"></line><line x1="12" y1="12" x2="4" y2="7.5"></line><line x1="16" y1="5.25" x2="8" y2="9.75"></line></svg>

                                &nbsp;Products
                              </Link>
                            </li>
                            <li>
                              <Link className="dropdown-item" to={'/admin/categories'}>
                              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-md" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><path d="M11 3L20 12a1.5 1.5 0 0 1 0 2L14 20a1.5 1.5 0 0 1 -2 0L3 11v-4a4 4 0 0 1 4 -4h4"></path><circle cx="9" cy="9" r="2"></circle></svg>
                              &nbsp;Categories
                              </Link>
                            </li>
                            <li>
                              <Link className="dropdown-item" to={'/admin/brands'}>
                              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-md" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><polyline points="12 4 4 8 12 12 20 8 12 4"></polyline><polyline points="4 12 12 16 20 12"></polyline><polyline points="4 16 12 20 20 16"></polyline></svg>
                              &nbsp;Brands
                              </Link>
                            </li>
                            {/* <li>
                              <Link className="dropdown-item" to={'/admin/cities'}>
                              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-md" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><rect x="7" y="9" width="14" height="10" rx="2"></rect><circle cx="14" cy="14" r="2"></circle><path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2"></path></svg>
                                &nbsp;Cities
                              </Link>
                            </li> */}
                          </ul>
                        </li>

                  

                  <li class="nav-item">
                          <a class="nav-link " href="#" >
                         
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-md" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><rect x="7" y="9" width="14" height="10" rx="2"></rect><circle cx="14" cy="14" r="2"></circle><path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2"></path></svg>&nbsp;Payments
                           
                          </a>
                  </li>



                  <li class="nav-item dropdown">
                          <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" role="button" aria-expanded="false">
                            <span class="nav-link-title">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-md" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><circle cx="6" cy="18" r="2"></circle><circle cx="6" cy="6" r="2"></circle><circle cx="18" cy="18" r="2"></circle><line x1="6" y1="8" x2="6" y2="16"></line><path d="M11 6h5a2 2 0 0 1 2 2v8"></path><polyline points="14 9 11 6 14 3"></polyline></svg>&nbsp;Requests
                            </span>
                          </a>
                          <ul class="dropdown-menu">
                            <li>
                              <Link className="dropdown-item" to={'/admin/requests/products'}>
                              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-md" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><polyline points="14 3 14 8 19 8"></polyline><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>
                              &nbsp;Products inclussion
                              </Link>
                            </li>
                           
                            <li>
                              <Link className="dropdown-item" to={'/admin/features'}>
                              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-md" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><polyline points="7 8 3 12 7 16"></polyline><polyline points="17 8 21 12 17 16"></polyline><line x1="14" y1="4" x2="10" y2="20"></line></svg>
                               &nbsp;&nbsp;Features
                              </Link>
                            </li>

                            <li>
                              <Link className="dropdown-item" to={'/admin/bugfix'}>
                              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-md" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><path d="M9 9v-1a3 3 0 0 1 6 0v1"></path><path d="M8 9h8a6 6 0 0 1 1 3v3a5 5 0 0 1 -10 0v-3a6 6 0 0 1 1 -3"></path><line x1="3" y1="13" x2="7" y2="13"></line><line x1="17" y1="13" x2="21" y2="13"></line><line x1="12" y1="20" x2="12" y2="14"></line><line x1="4" y1="19" x2="7.35" y2="17"></line><line x1="20" y1="19" x2="16.65" y2="17"></line><line x1="4" y1="7" x2="7.75" y2="9.4"></line><line x1="20" y1="7" x2="16.25" y2="9.4"></line></svg>
                               &nbsp;&nbsp;Bug fix
                              </Link>
                            </li>
                          </ul>
                        </li>







                  <li class="nav-item dropdown">
                          <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" role="button" aria-expanded="false">
                            <span class="nav-link-title">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-md" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><rect x="5" y="11" width="14" height="10" rx="2"></rect><circle cx="12" cy="16" r="1"></circle><path d="M8 11v-4a4 4 0 0 1 8 0v4"></path></svg>
                            &nbsp;Security
                            </span>
                          </a>
                          <ul class="dropdown-menu">
                            <li>
                              <Link className="dropdown-item" to={'/admin/users'}>
                              &nbsp;Users
                              </Link>
                            </li>
                           
                            <li>
                              {/* <Link className="dropdown-item" to={'/admin/cities'}>
                              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-md" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><rect x="7" y="9" width="14" height="10" rx="2"></rect><circle cx="14" cy="14" r="2"></circle><path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2"></path></svg>
                                &nbsp;&nbsp;Cities
                              </Link> */}
                            </li>
                          </ul>
                        </li>











                  </ul>
            <div className="ml-md-auto pl-md-4 py-2 py-md-0 mr-md-4 order-first order-md-last flex-grow-1 flex-md-grow-0">
              <form action="." method="get">
                <div className="input-icon">
                  <span className="input-icon-addon">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><circle cx="10" cy="10" r="7"></circle><line x1="21" y1="21" x2="15" y2="15"></line></svg>
                  </span>
                  <input type="text" className="form-control" placeholder="Search…" />
                </div>
              </form>
            </div>
          </div>
        </div>


      </div>
    </header>
        
                  
                
   
    );
  }

    function getDispensaryNav(){
    return (
      <header id="navbar" className="navbar navbar-expand-md navbar-light" >
      
      <div className="container-xl">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-menu">
          <span className="navbar-toggler-icon"></span>
        </button>
        <NavLink className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pr-0 pr-md-3" to={`/`}>
        
          <img src="../static/logo.svg" alt="Tabler" className="navbar-brand-image" />
          </NavLink>
        <div className="navbar-nav flex-row order-md-last">
          <div className="nav-item dropdown d-none d-md-flex mr-3">
            <a href="#" className="nav-link px-0" data-toggle="dropdown" tabIndex="-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /></svg>
              <span className="badge bg-red"></span>
            </a>
            <div className="dropdown-menu dropdown-menu-right dropdown-menu-card">
            <a class="dropdown-item d-flex bg-light"><span class="avatar mr-3 align-self-center" style={{backgroundImage: "url(&quot;demo/faces/female/1.jpg&quot;)"}}></span><div><strong>Alice</strong> started new task: Tabler UI design.<div class="small">1 hour ago</div></div></a>
            </div>
          </div>
          <div className="nav-item dropdown">
            <a href="#" className="nav-link d-flex lh-1 text-reset p-0" data-toggle="dropdown">
              <span className="avatar" style={{backgroundImage: `url("${(userDetails && userDetails.picture)?userDetails.picture:defaultAvatar}")`}}></span>
              <div className="d-none d-xl-block pl-2">
                <div>{(userDetails)?userDetails.name:""}</div>
                <div className="mt-1 small text-muted">{(userDetails)?userDetails.type:""}</div>
              </div>
            </a>
            <div className="dropdown-menu dropdown-menu-right">

              <NavLink className="dropdown-item"  to={`/profile/update`}>
              
                <svg xmlns="http://www.w3.org/2000/svg" className="icon dropdown-item-icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><circle cx="12" cy="12" r="3" /></svg>
                Update Profile
                </NavLink>
              {/* <a className="dropdown-item" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon dropdown-item-icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg>
                Another action
              </a> */}
              <div className="dropdown-divider"></div>
         
              <a onClick={accountService.logout} className="dropdown-item" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-md" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path><path d="M7 12h14l-3 -3m0 6l3 -3"></path></svg>
               &nbsp;&nbsp;Logout</a>
            </div>
          </div>
        </div>


        <div className="collapse navbar-collapse" id="navbar-menu">
          <div className="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center">
            <ul className="navbar-nav">
                  <li className="nav-item dropdown">
              
                <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" role="button" aria-expanded="false">
                  <span className="nav-link-icon d-md-none d-lg-inline-block">
                  
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3"></polyline><line x1="12" y1="12" x2="20" y2="7.5"></line><line x1="12" y1="12" x2="12" y2="21"></line><line x1="12" y1="12" x2="4" y2="7.5"></line><line x1="16" y1="5.25" x2="8" y2="9.75"></line></svg>
                  </span>
                  <span className="nav-link-title">
                    Products
                  </span>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink className="dropdown-item" to={`/product/user/${user._id}`}>
                  
                      My product list
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to={`/product`}>
                  
                      Add products into my store
                    </NavLink>
                  </li>
                </ul>
              </li>
                  <li className="nav-item">
                <a className="nav-link" href="./form-elements.html">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-md" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><rect x="7" y="9" width="14" height="10" rx="2"></rect><circle cx="14" cy="14" r="2"></circle><path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2"></path></svg>
                  <span className="nav-link-title">
                    &nbsp;Subscription
                  </span>
                  </a>
                </li>
                </ul>
            <div className="ml-md-auto pl-md-4 py-2 py-md-0 mr-md-4 order-first order-md-last flex-grow-1 flex-md-grow-0">
              <form action="." method="get">
                <div className="input-icon">
                  <span className="input-icon-addon">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><circle cx="10" cy="10" r="7"></circle><line x1="21" y1="21" x2="15" y2="15"></line></svg>
                  </span>
                  <input type="text" className="form-control" placeholder="Search…" />
                </div>
              </form>
            </div>
          </div>
        </div>
        </div>
    </header>
                )
    }
              


              
              
            
 
  







    function getBody() {
      switch (user.type) {
          case "DISPENSARY":
              return getDispensaryNav();
          case "ADMIN":
              return getAdminNav();
      }
  }


   




    return (
       <>

               {
               
               getBody()
               
               } 

            </>

    )}


export { Nav }; 