import {useState, useEffect} from 'react'
import {helpers} from '../../helpers'
import {Comment} from '../'
import {config} from '../../config'
const Comments = ({postData}) => {
  let [part,setPart] = useState(1);
  let totalParts = (postData?.comments?.length - postData?.comments?.length%3)/3 + 1;
  let firstLoad = false;

  const [commentsData,setCommentsData] = useState([])

  const [text, setText] = useState("")

  const handleComment = (e)=>{
    e.preventDefault();
    setText("")
    if(!(text.length > 0)){
      alert("Empty comments are not allowed");
      return;
    }

    helpers.addComment(postData.postID, text, config?.userData?.userID, (err,data)=>{
      if(!err){
        setCommentsData([...commentsData, data]);
        postData.comments.push(data?.commentID);
      }
      else{
        console.log(err)
      }
    });

  }

  const handleDelete = (deletedCommentID)=>{
    if(deletedCommentID){
      const deletedCommentIndex = commentsData.findIndex(element=>element?.commentID === deletedCommentID);
      const updatedCommentsData = [...commentsData];
      updatedCommentsData.splice(deletedCommentIndex,1);
      setCommentsData(updatedCommentsData);
      postData.comments.splice(postData.comments.indexOf(deletedCommentID),1);
    }
  }

  const loadComments = (first)=>{
    if(!first && part > totalParts){
      return;
    }
    if(commentsData?.length > postData?.comments?.length){
      return;
    }
    if(first && firstLoad){
      return;
    }
    firstLoad = true;
    try{
      helpers.loadComments(postData?.postID, first?part:part+1, (err,response)=>{
        if(!err){
          setCommentsData([...commentsData, ...response?.data]);
        }
        else{
          console.log("Couldn't load posts" + err.message);
        }
      });
    }catch(err){
      console.log("Couldn't load posts" + err);
    }
    
    
  }

  useEffect(()=>{
    if(commentsData.length > 0){
      const partLength = (commentsData?.length - commentsData?.length%3)/3
      setPart(partLength)
    }
  },[commentsData])

  useEffect(()=>{
    if(part === 1){
      loadComments(true);
    }
  },[part]);

  return (
    <div className='comments'>
        {/* <Comment
            commentData={
              {
                text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis quisquam odit, iusto reprehenderit esse aperiam fugiat quis hic dolorum atque temporibus, quod voluptas id molestiae ex autem exercitationem, alias nesciunt!",
                userData:{
                  username:"Kanan Abdullayev"
                },
                publishDate:new Date(),
                likes:[]
              }
            }
        /> */}
              {
                (!postData?.comments || postData?.comments?.length === 0) ? 
                <div>No comments yet</div>:
                commentsData && commentsData?.length === 0 ? <div>Loading....</div>:""
              }

              {
                helpers.sortByPublishDate(commentsData).map((commentData,index)=>{
                    const mappedComments = <Comment commentData={commentData} key={index} postDeleted={handleDelete}/>;
                    return mappedComments;
                })
              }

              {
                part !== totalParts && postData?.comments?.length !== 0 && commentsData?.length !== 0 && commentsData?.length !== postData?.comments?.length ? <div className='cp' onClick={()=>{loadComments(false)}}>Load More</div>: ""
              }
              <div>
                <form style={{width:"100%"}} onSubmit={handleComment}>
                  <div className='add_comment mt-3'>
                    <input type="text" className='comment_input' name="comment" value={text} onChange={(e)=>{setText(e.target.value)}} placeholder='Add Comment' />
                    <input type="submit" value="Add" className='btn-light ml-1' />
                  </div>
                </form>
              </div>
    </div>
  )
}

export default Comments
