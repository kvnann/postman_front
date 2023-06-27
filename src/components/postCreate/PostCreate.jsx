import {useState, useEffect} from 'react'
import { helpers } from '../../helpers'
import { config } from '../../config'

const PostCreate = ({onPostCreate,getUser}) => {
    const [postText, setPostText] = useState("")
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await helpers.post(`${config.backend_host}/post/create`,{text:postText},undefined);
        if(response.error){
            console.log(response.error);
            return;
        }
        if(response && response.status === 200){
            console.log(response.data)
            onPostCreate(response.data);
            setPostText("")
        }
        else{
            console.log("error occured")
        }
    }

  return (
    <div className='post'>
        <form onSubmit={handleSubmit}>
            <div className='display-4 orm-control fs-3 mb-3'>New Post</div>
            <textarea 
                id="postCreateText" 
                placeholder={`What did you experience today, ${getUser.username}?`}
                value={postText} 
                onChange={(e) => setPostText(e.target.value)} 
                className='mTextbox mb-3' 
                rows="4" cols="50" 
                maxLength="1000"
            ></textarea>
            <div>
                <button className="btn-light mb-2" id="submit" type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default PostCreate
