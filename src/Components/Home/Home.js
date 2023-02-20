import { NavLink } from "react-router-dom";
import './Home.css';
const Home = ()=>{
    return (<div className='main-home'>
    <h2 className='margin-auto'>Welcome To Expense Tracker</h2>
    <div className='profile'>
        <p>Your Profile is incomplete <NavLink className="link-profile" to="/update">complete now</NavLink></p>
    </div>
    </div>
  );
}

export default Home;