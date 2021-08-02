import React, { useState, useEffect } from "react";
import { isEmpty, isLoaded } from 'react-redux-firebase'
// import { connect } from "react-redux";
import * as authActions from '../../actions/authActions';
import { useHistory } from "react-router";
import { useSelector, useDispatch } from 'react-redux'
function Register() {

  const authMine = useSelector(state => state.auth);
  const auth = useSelector(state => state.firebase.auth);
  const dispatch = useDispatch();

  let history = useHistory();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const handleEmail = (e) => {
    setEmail(e.target.value);
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
  }
  const handleName=(e)=>{
    setName(e.target.value)
  }

  const onSubmit = () => {
    let obj = { email: email, password: password, name:name }
    //  props.register({email:email, password:password})
    dispatch(authActions.register(obj))
  }
  useEffect(() => {
    if (auth.uid) {
      history.push('/')
    }
  }, [auth])


  return (
    <>
      {/* To save from multiple request */}
      {/* {!isLoaded(props.auth)?<></>:<>
        {props.authMine.loading?<h4 style={{marginTop:'10%',height:'52vh'}}>Patiently Wait...we are resgistering you in</h4>: */}
      {!isLoaded(auth) ? <></> :
        <>
          {
            authMine?.loading ? <h4 style={{ marginTop: '10%', height: '52vh' }}>Patiently Wait...we are resgistering you in</h4> :
              <div className="container med contact">
                <div className="section funnel-section">
                  <div className="form-card">

                    <h2 className="form-heading center">Enter your details</h2>
                    <div className="form-section">
                      <div className="input-group full"><label>Name</label>
                        <div className="effect"><input type="text" name="name" value={name || ''} onChange={handleName} /><span></span>
                        </div>
                      </div>
                      <div className="input-group full"><label>Email</label>
                        <div className="effect"><input type="text" name="email" value={email || ''} onChange={handleEmail} /><span></span>
                        </div>
                      </div>

                      <div className="input-group full"><label>Password</label>
                        <div className="effect"><input type="password" name="password" value={password || ''} onChange={handlePassword} /><span></span>
                        </div>
                      </div>
                      {authMine?.ErrorMessage?.message ? <div className="input-group full">
                        <span className="error-message" >{authMine?.ErrorMessage?.message}</span>
                      </div> : <></>}
                      <div className="form-buttons">
                        <button onClick={onSubmit} className="btn hvr-float-shadow" type='button'>Register</button>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
          }
        </>
      }
    </>
  );
}




export default Register