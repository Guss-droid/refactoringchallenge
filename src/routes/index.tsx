import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';

export function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} /> 
    </Switch>
  )
}