import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavbarComponent from './Components/Navbar/Navbar';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import UpdatePage from './pages/UpdatePage';
import ForgotPassword from './Components/ForgotPswd/ForgotPswd';
import Expenses from './Components/Expenses/Expenses';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {/* Home page component goes here */}
          <NavbarComponent />
          <SignUpPage />
        </Route>
        <Route exact path="/home">
        <NavbarComponent />
          <HomePage />
        </Route>
        <Route exact path="/update">
        <NavbarComponent />
          <UpdatePage />
        </Route>
        <Route exact path="/expenses">
        <NavbarComponent />
        <Expenses />
          {/* Products page component goes here */}
        </Route>
        <Route exact path="/about-us">
        <NavbarComponent />
          {/* About Us page component goes here */}
        </Route>
        <Route exact path="/forgot-password">
        <ForgotPassword />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
