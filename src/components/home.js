import React, { Component } from 'react';
import {
  HashRouter,
  Route,
  Routes,
  useRouteMatch
} from 'react-router-dom';
import DashboardPage from './dashboardPage';
import ExceptionsPage from './exceptionsPage';
import ReconciliationPage from './reconciliationPage';
import ReportsPage from './reportsPage';
const Home = () => {
  let { path, url } = useRouteMatch();
  console.log(path + ":" + url)
  return (
    <HashRouter>
      <Routes>
        <Route path='/reconciliation' element={<ReconciliationPage/>} />
        <Route path='/reports' element={<ReportsPage/>} />
        <Route path='/exceptions' element={<ExceptionsPage/>} />
        <Route path={path} element={<DashboardPage/>} />
      </Routes>
    </HashRouter>

  );
}

export default Home;
