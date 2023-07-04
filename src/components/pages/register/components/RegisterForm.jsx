import {useState } from 'react';
import {helpers} from '../../../helpers'

const RegisterForm = ({handleNext, handleErrorMessage}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const checkNext = (e)=>{
      e.preventDefault();
      if(username.trim().length < 3){
        handleErrorMessage("Username should contain minimum 3 elements");
        return;
      }
      else if(password.trim().length < 3){
        handleErrorMessage("Password should contain minimum 4 elements");
        return;
      }
      else if(!helpers.isValidEmail(email)){
        handleErrorMessage("Please enter a valid email adress");
        return;
      }
      handleNext(username,password,email);
    }
  
  return (
    <div>
        <h1 className='mb-3'>Register</h1>
        <form onSubmit={checkNext}>
          <div className='text-center'>
            <input
              type="text"
              id="username"
              value={username}
              placeholder='Username'
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='text-center mt-3'>
            <input
              type="password"
              id="password"
              value={password}
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='text-center mt-3'>
            <input
              type="text"
              id="email"
              value={email}
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='text-center mt-3'>
            <button className='mb-2 btn-light' type="submit">Next</button>
            <p className='text-light'>Already have an account? <a href="/login" className='text-light'>Login</a></p>
          </div>
        </form>
    </div>
  )
}

export default RegisterForm
