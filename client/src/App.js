import React, { Fragment, useEffect } from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import Home from './components/pages/Home';
import Restaurant from './components/pages/Restaurant';
import CartBtns from './components/layout/CartBtns';
import Cart from './components/pages/Cart'
import CartHistory from './components/pages/CartHistory';
import AddRestaurant from './components/pages/AddRestaurant';
import AddMenu from './components/pages/AddMenu';
import UpdateUser from './components/pages/UpdateUser';
import PrivateRoute from './components/routing/PrivateRoute';

if (localStorage.token) {
  setAuthToken(localStorage.token)
}


const App = () => {
  useEffect(() => {
    //Initializes materialize js
    M.AutoInit();
  })
  return (
    <Provider store={store}>
      <Fragment>
        <div className="App">
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/restaurant' component={Restaurant} />
                <Route exact path='/cart' component={Cart} />
                <Route exact path='/cartHistory' component={CartHistory} />
                <Route exact path='/addRestaurant' component={AddRestaurant} />
                <Route exact path='/addMenu' component={AddMenu} />
                <Route exact path='/updateUser' component={UpdateUser} />
              </Switch>
            </div>
            <div className='container'>
              <CartBtns />
            </div>
          </Router>
        </div>
      </Fragment>
    </Provider>
  );
}

export default App;
