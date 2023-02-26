import React, {useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const history = useHistory();
  const[userLogin , setUserLogin]= useState(false);
  
  useEffect(()=>{
  if(localStorage.getItem('token')==null){
    setUserLogin(false)
  }else{
    setUserLogin(true)
  }
  },[] );
  
  const logoutHandler = () =>{
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    history.replace('/');
    alert("Successfully Logout");
  }
  return (
    <nav className="navbar">
      <div className="navbar-brand">
      <Link to="/" className="navbar-heading" style={{color: '#007bff', fontStyle: 'italic'}}><h1>MyWeblink</h1></Link>
      <ul className="navbar-list">
          <li><Link to="/home" className="navbar-link">Home</Link></li>
          {userLogin && <li><Link to="/expenses" className="navbar-link">Expenses</Link></li>}
          <li><Link to="/aboutus" className="navbar-link">About Us</Link></li>
          {!userLogin && <li><Link to='/'>Log in</Link></li>}
          {userLogin && <li><Link className="navbar-link" onClick={logoutHandler}>LogOut</Link></li>}
        </ul>
    </div>
    </nav>
  );
}

export default Navbar;
