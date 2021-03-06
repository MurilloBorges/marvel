/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../services/authentication';

// Pages
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Error from '../pages/404';
import Comics from '../pages/Comics';
import Profile from '../pages/Profile';
import Security from '../pages/Security';
import ComicsDetails from '../pages/ComicsDetails';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

export default function routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/404" exact component={Error} />
        <Route path="/" exact component={Login} />
        <Route path="/login" exact component={Login} />
        <Route path="/sign-up" exact component={SignUp} />
        <PrivateRoute path="/comics" exact component={Comics} />
        <PrivateRoute path="/comics/details" exact component={ComicsDetails} />
        <PrivateRoute path="/profile" exact component={Profile} />
        <PrivateRoute path="/security" exact component={Security} />

        {/* Página not found */}
        <Route path="*" exact component={Error} />
      </Switch>
    </BrowserRouter>
  );
}
