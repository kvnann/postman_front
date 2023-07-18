import {useState } from 'react';
import axios from 'axios';
import {config} from '../../config'
import {Loading} from '../../components'
import RegisterForm from './components/RegisterForm';
import ProfilePicture from './components/ProfilePicture';

const Register = () => {
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState("")
  const [selectedFile, setSelectedFile] = useState(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleNext = (usernameset,passwordset,emailset) => {
    setUsername(usernameset);
    setPassword(passwordset);
    setEmail(emailset);
    setErrorMessage("");
    setStep(1);
  }

  const handlePrev = ()=>{
    setErrorMessage("");
    setStep(0);
  }

  const fileSelect = (e)=>{
    setSelectedFile(e.target.files[0]);
  }

  const submit = async (e) => {
    e.preventDefault();
    if(!email || !username || !password){
      setErrorMessage("Missing field(s)")
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('username', username);
      formData.append('password', password);
      formData.append('email', email);

      const response = await axios.post(`${config.backend_host}/register`, formData,{
        headers:{
          'Content-Type': 'multipart/form-data'
        }
      });

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      window.location = '/'
    } catch (error) {
      setErrorMessage(error?.response?.data?.message)
      setTimeout(()=>{
        setLoading(false)
      },200)
    } finally{
      setLoading(false);
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
              Register now for free and see what's going on!
            </p>
          </div>
          <div className='login_card_right'>
            <div className='text-warning mb-2' style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}><span style={{width:"200px"}}>{errorMessage}</span></div>
            {
              step===0?<RegisterForm handleNext={handleNext} handleErrorMessage={setErrorMessage}/>:step===1?<ProfilePicture handleFileSelect={fileSelect} handleBack={handlePrev} handleSubmit={submit}/>:"Registraiton is closed"
            }
          </div>
        </div>
      </div>
    );
};

export default Register;