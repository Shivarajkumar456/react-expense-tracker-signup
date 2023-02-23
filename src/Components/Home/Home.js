import { NavLink } from "react-router-dom";
import './Home.css';
const Home = ()=>{
  const verifyEmail = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAGhMOoCkZh2xzJ3X_mtq7XNf2z2AOvrrQ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          requestType: 'VERIFY_EMAIL',
          idToken: (localStorage.getItem('token'))
        })
      });
      const data = await res.json();
      console.log(data)
      if (!res.ok) {
        throw new Error('Failed to send email verification.');
      }
      alert('Email verification link has been sent to your email.');
    } catch (err) {
      alert(err.message);
    }
  };
  
    return (<>
    <div className='main-home'>
    <h2 className='margin-auto'>Welcome To Expense Tracker</h2>
    <div className='profile'>
        <p>Your Profile is incomplete <NavLink className="link-profile" to="/update">complete now</NavLink></p>
    </div>
    </div>
    <button onClick={verifyEmail}>Verify Email</button>
    </>
  );
}

export default Home;