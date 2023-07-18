import {useState} from 'react'
import {config} from '../../config'
import {helpers} from '../../helpers'
import {Loading} from '../index'

const EditAccount = ({handleBack}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null); 
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleUpdate = async(e)=>{
      e.preventDefault();
      setLoading(true);
      console.log(selectedFile)
      console.log(username)
      console.log(email)
      try {
        const formData = new FormData();

        formData.append("userID", config.userData.userID)

        if(selectedFile){
          formData.append('image', selectedFile);
        }
        if(username && username !== config.userData.username){
          if(username?.length < 3){
            setErrorMessage("Please enter a username with minimum 3 caracters.");
            return;
          }
          formData.append('username', username);
        }
        if(email && email !== config.userData.email){
          if(helpers.isValidEmail(email)){
            formData.append('email', email);
          }
          else{
            setErrorMessage("Please enter a valid email address"); 
          }
        }


        if(!selectedFile && (!username || username === config.userData.username) && (!email || email === config.userData.email)){
          setErrorMessage("You didn't make any update");
          return;
        }
  
        const response = await helpers.post(`${config.backend_host}/user/update`, formData,
          {
            'Content-Type': 'multipart/form-data'
          }
        );

        if(response.status === 200){
          setErrorMessage("")
          setSuccessMessage("User Updated successfully!");
          window.location = '/account'
        }
        else{
          console.log(response)
          setErrorMessage(response?.data?.message ? response?.data?.message : "User Could not be updated. Maybe the username or email is already taken")
        }
  
      } catch (error) {
        setErrorMessage(error?.response?.data?.message ? error?.response?.data?.message : "Couldn't update user")
        setTimeout(()=>{
          setLoading(false)
        },200)
      } finally{
        setLoading(false);
      }
    }

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      
      if (file) {
        const reader = new FileReader();
    
        reader.onload = (e) => {
          const uploadedPhoto = e.target.result;
          setFilePreview(uploadedPhoto);
        };
    
        reader.readAsDataURL(file);
      }
    };

  return (
    <div>
        <div>
          <h1 className='mb-3 mt-3 display-4'>Update Account</h1>
          <form onSubmit={handleUpdate}>
            <div className='d-flex align-items-center flex-column mb-4'>
              <div className='display-4 fs-3 mb-3'>Edit Profile Picture</div>
              <div className='image_container rounded mb-2'>
                <img src={filePreview? filePreview : config.userData.profilePhoto}  alt="Profile pic upload" style={{borderRadius:"50%"}} width="150" height="150"/>
              </div>
                <input type="file" onChange={(e)=>{
                    setSelectedFile(e.target.files[0]);
                    handleFileUpload(e)
                  }} className='btn-light'/>
            </div>
            <div className='centered'>  
              {loading && <Loading />}
            </div>
            <div className='mt-1 mb-1 text-center'>
              <div className='text-danger'>{errorMessage}</div>
              <div className='text-success'>{successMessage}</div>
            </div>
            <div className='text-center'>
              <input
                type="text"
                id="username"
                className='bordered'
                value={username}
                placeholder={config.userData.username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='text-center mt-3'>
              <input
                type="text"
                className='bordered'
                id="email"
                value={email}
                placeholder={config.userData.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='text-center mt-3'>
              <span className='cp m-4 text-decoration-underline' onClick={handleBack}>Back</span>
              <button className='mb-2 btn-light' type="submit">Update</button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default EditAccount
