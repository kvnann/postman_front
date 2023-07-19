import {useState} from 'react'
import {config} from "../../config"
import {helpers} from "../../helpers"
import {AiFillStar} from "react-icons/ai"
import {MdDelete} from "react-icons/md"
import {Comments} from '../'

const Post = ({postData, user, onPostDeleted}) => {
    const [liked, setLiked] = useState(postData?.likes?.indexOf(user.userID) > -1);
    const [likedPostCount,setlikedPostCount] = useState(postData?.likes?.length);

    const [commentShow, setCommentShow] = useState(false);

    const handleLike = async()=>{
        const state = !liked
        setLiked(state);
        if(state){
            setlikedPostCount(prev=>prev+1)
        }
        else{
            setlikedPostCount(prev=>prev-1)
        }
        try{
            const response = await helpers.post(`${config.backend_host}/post/like`,{postID:postData?.postID,state});
            if(response.status !== 200){
                setLiked(!state);
                if(state){
                    setlikedPostCount(prev=>prev-1)
                }
                else{
                    setlikedPostCount(prev=>prev+1)
                }
                alert("Your entry couldn't not be posted")
                return;
            }
            return;
        }catch(e){
            alert("Your entry couldn't not be posted")
            console.log(e);
            return;
        }
    }
    const handleComment = ()=>{
        setCommentShow(prev=>!prev);
    }
    const handleDelete = async()=>{
        try{
            const response = await helpers.post(`${config.backend_host}/post/delete`,{postID:postData?.postID});
            if(response?.status !== 200){
                alert(response?.data?.message);
                return;
            }
            onPostDeleted();
            return;
        }catch(e){
            alert("Couldn't delete post" + e);
            return;
        }
    }
    return (
        <div className={`post ${postData?.admin?"post_admin":""}`} id={postData?.postID}>
            <div className='display-4 fs-3 mb-3 d-flex align-items-center justify-content-between'>
                <div className='d-flex align-items-center cp' onClick={()=>{window.location=`/user?u=${postData?.user?.username}`}}>
                    <img className='user-select-none' src={postData?.user?.profilePhoto?helpers.parseProfilePhoto(postData?.user?.profilePhoto):config.user_default} alt={postData?.user?.username} style={{height:"40px",width:"40px",borderRadius:"100%", marginRight:"10px"}} />
                    {postData?.user?.username} 
                    {/* {postData?.admin && <div className='text-yellow fs-6 mt-1 ml-1'><AiFillStar size={32}/></div>} */}
                </div>
                <div className='d-flex align-items-center'>
                </div>
                <div>
                    {(user?.userID === postData?.user?.userID || user.admin) && 
                    <div className='d-flex justify-content-center align-items-center cp_all'>
                        <div className='text-danger' onClick={handleDelete}><MdDelete size={25}/></div>
                    </div>
                    }
                </div>
            </div>
            <div className='postText'>
            {postData?.text}
            </div>
            <div className='mt-3 d-flex flex-row justify-content-between'>
                <div className='d-flex flex-row justify-content-between'>
                    <div id="likeButton" className='text-gray' style={{cursor:"pointer"}} onClick={handleLike}>
                    {liked?<span className='text-danger'>Liked</span>:"Like"} {`(${likedPostCount})`}
                    </div>
                    <div id="commentButton" className={`${commentShow?"text-danger":"text-gray"} ml-2`} style={{cursor:"pointer"}} onClick={handleComment}>
                        Comments ({postData?.comments?.length})
                    </div>
                </div>

                <div className='text-gray'>
                    {helpers.getDisplayString(postData?.publishDate)}
                </div>
            </div>
            {
                commentShow &&  
                <div>
                    <hr />
                    <Comments postData={postData}/>
                </div>
            }
        </div>
      )
}

export default Post
