import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from 'pages/home.jsx';
import Session from 'pages/session.jsx';

const App = () => (
  <BrowserRouter>
    <div>
      <Route exact path='/' component={Home} />
      <Route path='/session/:id' component={Session} />
    </div>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('app'));
