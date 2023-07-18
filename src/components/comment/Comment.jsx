import { useState } from 'react';
import {config} from '../../config'
import {helpers} from '../../helpers'

const Comment = ({commentData, user, postDeleted}) => {
//   const [liked, setLiked] = useState(commentData?.likes?.indexOf(user?.userID) > -1);
//   const [likedCommentCount,setlikedCommentCount] = useState(commentData?.likes?.length);

//   const handleLike = async()=>{
//       const state = !liked
//       setLiked(state);
//       if(state){
//           setlikedCommentCount(prev=>prev+1);
//       }
//       else{
//           setlikedCommentCount(prev=>prev-1);
//       }
//       try{
//           const response = await helpers.post(`${config.backend_host}/comment/like`,{commentID:commentData.commentID,state});
//           if(response.status !== 200){
//               setLiked(!state);
//               if(state){
//                   setlikedCommentCount(prev=>prev-1)
//               }
//               else{
//                   setlikedCommentCount(prev=>prev+1)
//               }
//               alert("Your entry couldn't not be posted")
//               return;
//           }
//           return;
//       }catch(e){
//           alert("Your entry couldn't not be posted")
//           console.log(e);
//           return;
//       }
//   }

    const handleDelete = async()=>{
        try{
            const response = helpers.deleteComment(commentData.commentID, (err,data)=>{
                if(!err){
                    postDeleted(commentData.commentID);
                    return;
                }
                else{
                    alert("Couldn't delete comment: " + err.message);
                }
            });
        }catch(e){
            alert("Couldn't delete comment: " + e);
            return;
        }
    }

  return (
    <div className='comment'>
      <div><img src={commentData?.profilePhoto ? helpers.parseProfilePhoto(commentData?.profilePhoto, 'base64') : config.user_default} onClick={()=>{window.location=`/user?u=${commentData.userData.username}`}} className='user-select-none cp'  alt={commentData?.userData?.username} style={{height:"40px",width:"40px",borderRadius:"100%", marginRight:"10px"}} /></div>
      <div>
          <div className='comment_content' >
              <div className='fw-bold mb-1 cp'>{commentData?.userData?.username ?  commentData?.userData?.username : "uConnect user"}</div>
              <div className=''>{commentData.text}</div>
          </div>
          <div className='comment_actions d-flex justify-content-between text-muted'>
          {/* <div className='cp' onClick={handleLike}>{liked?<span className='text-danger'>Liked</span>:"Like"} {`(${likedCommentCount})`}</div> */}
            {
              config.userData.admin || commentData.userData.userID === config.userData.userID ? 
                <div className='cp' onClick={handleDelete}>Delete</div> :
                <div></div>
            }
              <div>{helpers.getDisplayString(commentData?.publishDate)}</div>
          </div>
      </div>
  </div>
  )
}

export default Comment
