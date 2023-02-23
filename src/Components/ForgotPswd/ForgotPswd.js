import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import './ForgotPswd.css';
const ForgotPassword = () => {
    const emailRef= useRef();
    const history = useHistory();
    const forgotPasswordHandler=async(event)=>{
        event.preventDefault();
        try{
          const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAGhMOoCkZh2xzJ3X_mtq7XNf2z2AOvrrQ',
          {
            method:'POST',
            headers :{
                'Content-Type':'application/json'
            },
            body : JSON.stringify({
                requestType:"PASSWORD_RESET",
                email:emailRef.current.value
            })
          })

          const data = await res.json()
          if(res.ok){
            history.replace('/')
            console.log(data)
          }else{
            throw data.error
          }
        }catch(error){
            console.log(error.message)
        }

    }
    return (
        <div className="forgot-password-container">
          <form onSubmit={forgotPasswordHandler}>
          <h2>Forgot Password?</h2>
          <p>You can reset your password here.</p>
            <input
              type="email"
              id="email"
              placeholder='Email Address'
              ref={emailRef}
            />
            <button type="submit">Reset Password</button>
          </form>
        </div>
      );
}

export default ForgotPassword;