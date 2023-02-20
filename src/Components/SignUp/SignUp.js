import React, {useState, useRef} from 'react';
import './SignUp.css';

function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [isLogin, setIsLogin] = useState(true);

  const loginHandler = ()=>{
    setIsLogin((prevState) => !prevState);
  }

  const submitHandler = (event)=>{
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    let url;
    if(!isLogin){
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
      }).then((res)=>{
        if(res.ok){
          console.log('Signup successful!'); 
          return res.json();
        }else{
          return res.json().then(data=>{
            let errorMessage = 'Authentication Failed!';
            throw new Error(errorMessage);
          })
        }
      })
  }
  return (
    <div className="signup">
      <form onSubmit={submitHandler}>
      <h2>{!isLogin ? 'Sign In': 'Sign Up'}</h2>
        <input type="email" id="email" name="email" placeholder='Email' ref={emailRef} required />
        <input type="password" id="password" name="password" placeholder='Password' ref={passwordRef} required />
        {isLogin && <input type="password" id="confirm-password" name="confirm-password" ref={confirmPasswordRef} placeholder='Confirm Password' required />}
        <button type="submit" className="btn-primary">{!isLogin ? 'Sign In': 'Sign Up'}</button>
        <button className="toggle" onClick={loginHandler}>{isLogin?'Have an account?':'Create an acoount? '} {isLogin ? 'Log In': 'Sign Up'}</button>
      </form>
    </div>
  );
}

export default SignUp;
