import { useState } from 'react';
import {config} from '../../config'
import {helpers} from '../../helpers'

const Comment = ({commentData, user}) => {
  const [liked, setLiked] = useState(commentData?.likes?.indexOf(user?.userID) > -1);
  const [likedCommentCount,setlikedCommentCount] = useState(commentData?.likes?.length);
  const handleLike = async()=>{
      const state = !liked
      setLiked(state);
      if(state){
          setlikedCommentCount(prev=>prev+1)
      }
      else{
          setlikedCommentCount(prev=>prev-1)
      }
      try{
          const response = await helpers.post(`${config.backend_host}/comment/like`,{commentID:commentData.commentID,state});
          if(response.status !== 200){
              setLiked(!state);
              if(state){
                  setlikedCommentCount(prev=>prev-1)
              }
              else{
                  setlikedCommentCount(prev=>prev+1)
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
  return (
    <div className='comment'>
      <div><img className='user-select-none cp' src={config.user_default} alt="Salam" style={{height:"40px",width:"40px",borderRadius:"100%", marginRight:"10px"}} /></div>
      <div>
          <div className='comment_content' onClick={()=>{window.location=`/user?u=`}}>
              <div className='fw-bold mb-1 cp'>Kanan Abdullayev</div>
              <div className=''>Das ist ein sehr geniales Kunstwerk</div>
          </div>
          <div className='comment_actions d-flex justify-content-between text-muted'>
              <div className='cp' onClick={handleLike}>{liked?<span className='text-danger'>Liked</span>:"Like"} {`(${likedCommentCount})`}</div>
              <div>10m ago</div>
          </div>
      </div>
  </div>
  )
}

export default Comment
