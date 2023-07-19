import {useState} from 'react'
import {config} from "../../../config"


const ProfilePicture = ({handleBack, handleFileSelect, handleSubmit}) => {

  const [filePreview, setFilePreview] = useState(null);
  
  const handleFileUpload = (event) => {
    const file = event?.target?.files[0];
    
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const uploadedPhoto = e?.target?.result;
        setFilePreview(uploadedPhoto);
      };
  
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className='display-4 fs-3 mb-3'>Set a Profile Picture</div>
      <div className='image_container rounded mb-2'>
        <img src={filePreview? filePreview : config.user_default}  alt="Profile pic upload" style={{borderRadius:"50%"}} width="150" height="150"/>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e)=>{
          handleFileSelect(e);
          handleFileUpload(e)
        }} className='btn-light'/>
        <div className='mt-3'>
          <span className='cp m-4 text-decoration-underline' onClick={handleBack}>Back</span>
          <input type='submit' className='btn-light' value="Register"/>
        </div>
      </form>
    </div>
  )
}

export default ProfilePicture
