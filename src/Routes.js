import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

import Incident from './pages/Incident';
import Incidents from './pages/Incidents';
import DeclareIncident from './pages/DeclareIncident';
import UpdateIncident from './pages/UpdateIncident';
import Dashboard from './pages/Dashboard';

import Navigation from './components/Navigation';
import BreadCrumbNav from './components/BreadCrumbNav';

export default function Routes() {
  return (
    <Router>
      <Flex flexDir="row" minHeight="100%">
        <Navigation />
        <Flex w="100%" flexDir="column">
          <BreadCrumbNav />
          <Switch>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/incidents">
              <Incidents />
            </Route>
            <Route exact path="/incidents/new">
              <DeclareIncident />
            </Route>
            <Route exact path="/incidents/:id">
              <Incident />
            </Route>
            <Route exact path="/incidents/:id/edit">
              <UpdateIncident />
            </Route>
            <Redirect to="/dashboard" />
          </Switch>
        </Flex>
      </Flex>
    </Router>
  );
}
