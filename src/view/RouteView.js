import React from 'react';
import { Route } from 'react-router';
import Main from './Main';
import LoginView from './LoginView';

const RouteView = () => {
  return (
    <div>
      <Route path="/main" component={Main} />
      <Route path={['/login', '/']} component={LoginView} exact={true} />
    </div>
  );
};

export default RouteView;
