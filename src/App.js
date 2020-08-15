import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import 'fontsource-roboto';
import './App.css';

import { store } from './Redux';

import Draw from './Pages/Draw';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' children={<Draw />} />
          <Route exact path='/draw' children={<Draw />} />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
};

export default App;
