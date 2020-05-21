import React from 'react';
import { Router } from 'react-router-dom';
import { render } from 'react-dom';
import './assets/css/demo.css';
import './assets/css/tabler.min.css';
import './assets/css/custom.css';
import $ from 'jquery';
// import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';






import { history } from './_helpers';
import { App } from './App/index';

import './styles.less';
let a = process.env.REACT_APP_SOME_VARIABLE
// setup fake backend
// import { configureFakeBackend } from './_helpers';
// configureFakeBackend();

render(
    <Router history={history}>
       {console.log(a)}
        <App />
    </Router>,
    document.getElementById('root')
);