import React, { useState, useEffect } from 'react';
import { NavLink, Route } from 'react-router-dom';

import { Role } from '../_helpers';
import { accountService } from '../_services';

function Nav() {
    const [user, setUser] = useState({});
    const userDetails = accountService.userValue;

    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x));
        return subscription.unsubscribe;
    }, []);

    // only show nav when logged in
    if (!user) return null;

    return (
       

        <header className="navbar navbar-expand-md navbar-light">
        <div className="container-xl">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-menu">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a href="." className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pr-0 pr-md-3">
            <img src="../static/logo.svg" alt="Tabler" className="navbar-brand-image" />
          </a>
          <div className="navbar-nav flex-row order-md-last">
            <div className="nav-item dropdown d-none d-md-flex mr-3">
              <a href="#" className="nav-link px-0" data-toggle="dropdown" tabIndex="-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /></svg>
                <span className="badge bg-red"></span>
              </a>
              <div className="dropdown-menu dropdown-menu-right dropdown-menu-card">
                <div className="card">
                  <div className="card-body">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad amet consectetur exercitationem fugiat in ipsa ipsum, natus odio quidem quod repudiandae sapiente. Amet debitis et magni maxime necessitatibus ullam.
                  </div>
                </div>
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
                <a className="dropdown-item" href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon dropdown-item-icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><circle cx="12" cy="12" r="3" /></svg>
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon dropdown-item-icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg>
                  Another action
                </a>
                <div className="dropdown-divider"></div>
           
                <a onClick={accountService.logout} className="dropdown-item" href="#"><svg xmlns="http://www.w3.org/2000/svg" className="icon dropdown-item-icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                Logout</a>
              </div>
            </div>
          </div>


          <div className="collapse navbar-collapse" id="navbar-menu">
            <div className="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center">
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#navbar-base" data-toggle="dropdown" role="button" aria-expanded="false">
                    <span className="nav-link-icon d-md-none d-lg-inline-block"><svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3"></polyline><line x1="12" y1="12" x2="20" y2="7.5"></line><line x1="12" y1="12" x2="12" y2="21"></line><line x1="12" y1="12" x2="4" y2="7.5"></line><line x1="16" y1="5.25" x2="8" y2="9.75"></line></svg>
                    </span>
                    <span className="nav-link-title">
                      Interface
                    </span>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-columns  dropdown-menu-columns-2">
                    <li>
                      <a className="dropdown-item" href="./empty.html">
                        Empty page
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./blank.html">
                        Blank page
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./buttons.html">
                        Buttons
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./cards.html">
                        Cards
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./dropdowns.html">
                        Dropdowns
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./icons.html">
                        Icons
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./modals.html">
                        Modals
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./maps.html">
                        Maps
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./maps-vector.html">
                        Vector maps
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./navigation.html">
                        Navigation
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./charts.html">
                        Charts
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./tables.html">
                        Tables
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./calendar.html">
                        Calendar
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./carousel.html">
                        Carousel
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./lists.html">
                        Lists
                      </a>
                    </li>
                    <li className="dropright">
                      <a className="dropdown-item dropdown-toggle" href="#sidebar-authentication" data-toggle="dropdown" role="button" aria-expanded="false">
                        Authentication
                      </a>
                      <div className="dropdown-menu">
                        <a href="./sign-in.html" className="dropdown-item">Sign in</a>
                        <a href="./sign-up.html" className="dropdown-item">Sign up</a>
                        <a href="./forgot-password.html" className="dropdown-item">Forgot password</a>
                        <a href="./terms-of-service.html" className="dropdown-item">Terms of service</a>
                      </div>
                    </li>
                    <li className="dropright">
                      <a className="dropdown-item dropdown-toggle" href="#sidebar-error" data-toggle="dropdown" role="button" aria-expanded="false">
                        Error pages
                      </a>
                      <div className="dropdown-menu">
                        <a href="./400.html" className="dropdown-item">400 page</a>
                        <a href="./401.html" className="dropdown-item">401 page</a>
                        <a href="./403.html" className="dropdown-item">403 page</a>
                        <a href="./404.html" className="dropdown-item">404 page</a>
                        <a href="./500.html" className="dropdown-item">500 page</a>
                        <a href="./503.html" className="dropdown-item">503 page</a>
                        <a href="./maintenance.html" className="dropdown-item">Maintenance page</a>
                      </div>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="./form-elements.html">
                    <span className="nav-link-icon d-md-none d-lg-inline-block"><svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><polyline points="9 11 12 14 20 6"></polyline><path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9"></path></svg>
                    </span>
                    <span className="nav-link-title">
                      Forms
                    </span>
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#navbar-extra" data-toggle="dropdown" role="button" aria-expanded="false">
                    <span className="nav-link-icon d-md-none d-lg-inline-block"><svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><path d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z"></path></svg>
                    </span>
                    <span className="nav-link-title">
                      Extra
                    </span>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="./invoice.html">
                        Invoice
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./blog.html">
                        Blog cards
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./snippets.html">
                        Snippets
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./search-results.html">
                        Search results
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./pricing.html">
                        Pricing cards
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./users.html">
                        Users
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./gallery.html">
                        Gallery
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./profile.html">
                        Profile
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./music.html">
                        Music
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item active dropdown">
                  <a className="nav-link dropdown-toggle" href="#navbar-layout" data-toggle="dropdown" role="button" aria-expanded="false">
                    <span className="nav-link-icon d-md-none d-lg-inline-block"><svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><rect x="4" y="4" width="6" height="5" rx="2"></rect><rect x="4" y="13" width="6" height="7" rx="2"></rect><rect x="14" y="4" width="6" height="7" rx="2"></rect><rect x="14" y="15" width="6" height="5" rx="2"></rect></svg>
                    </span>
                    <span className="nav-link-title">
                      Layout
                    </span>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="./layout-horizontal.html">
                        Horizontal
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./layout-vertical.html">
                        Vertical
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./layout-vertical-right.html">
                        Right vertical
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item active" href="./layout-condensed.html">
                        Condensed
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./layout-condensed-dark.html">
                        Condensed dark
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./layout-combo.html">
                        Combined
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./layout-navbar-dark.html">
                        Navbar dark
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./layout-dark.html">
                        Dark mode
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./layout-fluid.html">
                        Fluid
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./layout-fluid-vertical.html">
                        Fluid vertical
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#navbar-docs" data-toggle="dropdown" role="button" aria-expanded="false">
                    <span className="nav-link-icon d-md-none d-lg-inline-block"><svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><polyline points="14 3 14 8 19 8"></polyline><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path><line x1="9" y1="9" x2="10" y2="9"></line><line x1="9" y1="13" x2="15" y2="13"></line><line x1="9" y1="17" x2="15" y2="17"></line></svg>
                    </span>
                    <span className="nav-link-title">
                      Docs
                    </span>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-columns  dropdown-menu-columns-3">
                    <li>
                      <a className="dropdown-item" href="./docs/index.html">
                        Introduction
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./docs/alerts.html">
                        Alerts
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./docs/autosize.html">
                        Autosize
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./docs/avatars.html">
                        Avatars
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./docs/badges.html">
                        Badges
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./docs/breadcrumb.html">
                        Breadcrumb
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./docs/buttons.html">
                        Buttons
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./docs/cards.html">
                        Cards
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./docs/carousel.html">
                        Carousel
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./docs/colors.html">
                        Colors
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./docs/countup.html">
                        Countup
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./docs/cursors.html">
                        Cursors
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./docs/charts.html">
                        Charts
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./docs/dropdowns.html">
                        Dropdowns
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./docs/divider.html">
                        Divider
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./docs/empty.html">
                        Empty states
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./docs/flags.html">
                        Flags
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./docs/form-elements.html">
                        Form elements
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./docs/form-helpers.html">
                        Form helpers
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./docs/input-mask.html">
                        Form input mask
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./docs/modals.html">
                        Modals
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./docs/progress.html">
                        Progress
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./docs/payments.html">
                        Payments
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./docs/range-slider.html">
                        Range slider
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./docs/ribbons.html">
                        Ribbons
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./docs/spinners.html">
                        Spinners
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./docs/steps.html">
                        Steps
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./docs/tables.html">
                        Tables
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./docs/tabs.html">
                        Tabs
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./docs/timelines.html">
                        Timelines
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./docs/toasts.html">
                        Toasts
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./docs/tooltips.html">
                        Tooltips
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./docs/typography.html">
                        Typography
                      </a>
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

  {/* <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="navbar-nav">
                    <NavLink exact to="/" className="nav-item nav-link">Home</NavLink>
                    <NavLink to="/profile" className="nav-item nav-link">Profile</NavLink>
                    {user.role === Role.Admin &&
                        <NavLink to="/admin" className="nav-item nav-link">Admin</NavLink>
                    }
                    <a onClick={accountService.logout} className="nav-item nav-link">Logout</a>
                </div>
            </nav>
            <Route path="/admin" component={AdminNav} /> */}

        </div>
      </header>
          
   
    );
}

function AdminNav({ match }) {
    const { path } = match;

    return (
        <nav className="admin-nav navbar navbar-expand navbar-light">
            <div className="navbar-nav">
                <NavLink to={`${path}/users`} className="nav-item nav-link">Users</NavLink>
            </div>
        </nav>
    );
}

export { Nav }; 