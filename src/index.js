import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import App from './App';
import CityDetails from './CityDetails';
import './index.css';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/:id" component={CityDetails} />
        </div>
    </Router>,
    document.getElementById('root'),
);
