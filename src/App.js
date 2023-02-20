import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavbarComponent from './Components/Navbar/Navbar';
import SignUpPage from './pages/SignUpPage';
import Home from './pages/Home';

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
          <Home />
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
