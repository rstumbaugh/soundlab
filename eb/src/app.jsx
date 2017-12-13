import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from 'pages/home.jsx';
import Session from 'pages/session.jsx';
import styleVars from 'styles/variables';

const App = () => (
  <BrowserRouter>
    <div>
      <Route exact path='/' component={Home} />
      <Route path='/session/:id' component={Session} />

      <style type='text/css'>
        { `html, body { height: 100%; background-color: ${styleVars.lightGray}` }
      </style>
    </div>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('app'));
