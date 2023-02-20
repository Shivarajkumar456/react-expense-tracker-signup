import React,{useRef} from 'react'
import './Update.css'
import { useHistory } from 'react-router-dom';

export const Update = () => {
    const inputFullnameRef = useRef();
    const inputPhotoUrlRef = useRef();
    const history = useHistory();

    const handleCancel = () => {
        history.goBack();
      };

    const profileSubmitHandler=async(event)=>{
        event.preventDefault();
        try{
       const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAGhMOoCkZh2xzJ3X_mtq7XNf2z2AOvrrQ',{
        method : 'POST',
        body :JSON.stringify({
            idToken: (localStorage.getItem('token')),
            displayName: inputFullnameRef.current.value,
            photoUrl: inputPhotoUrlRef.current.value,
            returnSecureToken: true,
        }),
        headers : {
            'Content-Type' : 'application/json'
        }
       })

       const data = await res.json();
       console.log(data)

       inputFullnameRef.current.value=""
       inputPhotoUrlRef.current.value=""

       if (res.ok) {
        history.replace('/home');
      } else {
        throw data.error;
      }

        }
        catch(error){
            console.log(error.message)
        }

    }
  return (
    <div className='update'>
        <div className='main-update-profile'>
            <h3>Winner never Quits , quitter never wins</h3>
            <div className='profile-update'>Your Profile is <b>64%</b> complete . A complete Profile has <br/>higher chances of landing a job </div>
        </div>
        <hr></hr>
        <div className="main-update-form">
        <form onSubmit={profileSubmitHandler} className="form">
          <div className="form-row">
            <h3>Update Profile</h3>
            <button className='cancel-button' type="button" onClick={handleCancel}>Cancel</button>
          </div>
          <div className="form-row">
            <label htmlFor="fullname">Full Name:</label>
            <input ref={inputFullnameRef} type="text" id="fullname" />
            <label htmlFor="profileurl">Profile Photo Url:</label>
            <input ref={inputPhotoUrlRef} type="text" id="profileurl" />
          </div>
          <div className="form-row">
            <button className='submit-button' type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Update;