import React, {useState, useRef, Fragment, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import './SignUp.css';

function SignUp() {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [isLogin, setIsLogin] = useState(false);

  const loginHandler = ()=>{
    setIsLogin((prevState) => !prevState);
  }

  const submitHandler = (event)=>{
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    let url;
    if(isLogin){
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAGhMOoCkZh2xzJ3X_mtq7XNf2z2AOvrrQ';
    } else {
      if(enteredPassword !== confirmPasswordRef.current.value){
        alert('Password Do Not Match');
        return;
      }else {
        url ='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAGhMOoCkZh2xzJ3X_mtq7XNf2z2AOvrrQ';
      }
    }
    fetch(url,
      {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers:{
          'Content-type': 'application/json'
        }
      }).then(res =>{
        return res.json();
     }).then(data=>{
        if(isLogin){
            console.log("Login Completed");
            //console.log(data.idToken)
            localStorage.setItem('email' ,enteredEmail );
            localStorage.setItem('token', data.idToken);
            authCtx.login(data.idToken);
            history.replace('/home');
        }else{
             console.log("Sign up Completed");
             alert("Sign Up Successful");
             history.push('/home');
        }
     }).catch(err=>{
        alert(err.message)
        history.replace("/")
     })
  }
  return (
    <Fragment>
    <div className="signup">
      <form onSubmit={submitHandler}>
      <h2>{isLogin ? 'Sign In': 'Sign Up'}</h2>
        <input type="email" id="email" name="email" placeholder='Email' ref={emailRef} required />
        <input type="password" id="password" name="password" placeholder='Password' ref={passwordRef} required />
        {!isLogin && <input type="password" id="confirm-password" name="confirm-password" ref={confirmPasswordRef} placeholder='Confirm Password' required />}
        <button type="submit" className="btn-primary">{isLogin ? 'Sign In': 'Sign Up'}</button>
        {isLogin && <p className='login-prompt '><a href='forgetpassword'>Forget password?</a></p>}
        
      </form>
      <div className='isLogin'>
    <button className="toggle" onClick={loginHandler}>{!isLogin?'Have an account?':`Don't have an acoount? `} {!isLogin ? 'Log In': 'Sign Up'}</button>
    </div>
    </div>
    </Fragment>
  );
}

export default SignUp;
