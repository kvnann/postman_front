import {useState } from 'react';
import axios from 'axios';
import {config} from '../../config'
import {Loading} from '../../components'

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email || !username || !password){
      setErrorMessage("Missing field(s)")
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${config.backend_host}/register`, {
        email,
        username,
        password
      },{
        headers:{
          "Content-Type":"application/json"
        }
      });

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      window.location = '/'
    } catch (error) {
      setErrorMessage(error.response.data.message)
      setTimeout(()=>{
        setLoading(false)
      },200)
    }
  };

  return (
    <div className='centered_regular'>  
        <div className='centered'>  
          {loading && <Loading />}
        </div>
        <div className='login_card'>
          <div className='login_card_left'>
            <h1 className='display-4'>Welcome!</h1>
            <p className='text-muted'>
              Register now for free and know what's going on!
            </p>
          </div>
          <div className='login_card_right'>
            <h1 className='mb-3'>Register</h1>
            <div className='text-warning mb-2'>{errorMessage}</div>
            <form onSubmit={handleSubmit}>
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
                <button className='mb-2' type="submit">Register</button>
                <p className='text-light'>Already have an account? <a href="/login" className='text-light'>Login</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default Register;