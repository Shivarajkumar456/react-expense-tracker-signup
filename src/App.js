import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavbarComponent from './Components/Navbar/Navbar';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import UpdatePage from './pages/UpdatePage';

function App() {
  return (
    <Router>
      <NavbarComponent />
      <Switch>
        <Route exact path="/">
          {/* Home page component goes here */}
          <SignUpPage />
        </Route>
        <Route exact path="/home">
          <HomePage />
        </Route>
        <Route exact path="/update">
          <UpdatePage />
        </Route>
        <Route exact path="/products">
          {/* Products page component goes here */}
        </Route>
        <Route exact path="/about-us">
          {/* About Us page component goes here */}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
