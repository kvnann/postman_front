import axios from 'axios'
import React from 'react'
import {config} from './config'

const helpers = {}

helpers.getPosts = async(type, userID)=>{
  const address = type==="feed"?"get_all":type==="user"?"user_posts":type==="news"?"news":type==="liked"?"liked_posts":false;
  if(!address){
    return "Not a valid request";
  }
  try{
    const response = await helpers.post(`${config.backend_host}/post/${address}`,{
      userID
    });
    if(response && response.data){
      let allPosts = helpers.sortByPublishDate(response.data);
      return allPosts;
    }
    else{
      return []
    }
  }
  catch(e){
    return e
  }

}

helpers.post = async(url, data, reqHeaders)=>{
    let headers = reqHeaders?reqHeaders:{};
    if(!url){
        return "Please provide a url"
    }
    
    if(!headers["Content-Type"]){
      headers["Content-Type"] = "application/json"
    }
    headers["accesstoken"] = `Bearer ${localStorage.getItem('accessToken')}`
    headers["refreshtoken"] = `Refresh ${localStorage.getItem('refreshToken')}`

    try{
      let response = await axios.post(url,data,{headers});
      return response;
    }
    catch(e){
      return false
    }
    
}

helpers.auth = async()=>{
  try{
      const response = await axios.post(`${config.backend_host}/auth`,{},{
          headers:{
              "Content-Type":"application/json",
              "accesstoken":`Bearer ${localStorage.getItem('accessToken')}`,
              "refreshtoken":`Refresh ${localStorage.getItem('refreshToken')}`
          }
      });
      if(response.data.newAccessToken){
          localStorage.setItem('accessToken',response.data.newAccessToken);
      }
      if(response.data.newRefreshToken){
          localStorage.setItem('refreshToken',response.data.newRefreshToken);
      }
      return {newAuth:true,userData:response.data.userData};
  }
  catch(e){
      return {newAuth:false,userData:false};
  }
}

helpers.formatTextWithLineBreaks = (text) => {
  return text.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
}

helpers.getUserAndAuth = async(username)=>{
  try{
    const response = await axios.post(`${config.backend_host}/user/get_one`,{
      username
    },{
        headers:{
            "Content-Type":"application/json",
            "accesstoken":`Bearer ${localStorage.getItem('accessToken')}`,
            "refreshtoken":`Refresh ${localStorage.getItem('refreshToken')}`
        }
    });
    if(response.data.newAccessToken){
        localStorage.setItem('accessToken',response.data.newAccessToken);
    }
    if(response.data.newRefreshToken){
        localStorage.setItem('refreshToken',response.data.newRefreshToken);
    }
    console.log(response.data)
    return {newAuth:true,userData:response.data.userData, watchingUserData: response.data.watchingUserData};
  }
  catch(e){
      return {newAuth:false,userData:false};
  }
}

helpers.loadPosts = async(postsID,part)=>{
  try{
      const response = await axios.post(`${config.backend_host}/post/load_posts`,{
          postsID,
          part
      },{
          headers:{
              "Content-Type":"application/json",
              "accesstoken":`Bearer ${localStorage.getItem('accessToken')}`,
              "refreshtoken":`Refresh ${localStorage.getItem('refreshToken')}`
          }
      });
      return response.data.posts;
  }catch(e){
      console.log(e);
      return false;
  }
}



helpers.loadPostsLow = async(postsID,part)=>{
  try{
      const response = await axios.post(`${config.backend_host}/post/load_posts_low`,{
          postsID,
          part
      },{
          headers:{
              "Content-Type":"application/json",
              "accesstoken":`Bearer ${localStorage.getItem('accessToken')}`,
              "refreshtoken":`Refresh ${localStorage.getItem('refreshToken')}`
          }
      });
      return response?.data?.postData;
  }catch(e){
      console.log(e);
      return false;
  }
}

helpers.search = async(query, type, callback)=>{
  try{
    const response = await axios.post(`${config.backend_host}/search`,{
        query,
        type
    },{
        headers:{
            "Content-Type":"application/json",
            "accesstoken":`Bearer ${localStorage.getItem('accessToken')}`,
            "refreshtoken":`Refresh ${localStorage.getItem('refreshToken')}`
        }
    });
    callback(false,response.data);
  }catch(e){
      console.log(e);
      return false;
  }
}

helpers.handleLogout = ()=>{
  localStorage.setItem("accessToken", "");
  localStorage.setItem("refreshToken", "");
  window.location = '/login'
}

helpers.parseProfilePhoto = (photoData) => {

  if(!photoData){
    return;
  }

  const uint8Array = new Uint8Array(photoData?.data);

  const blob = new Blob([uint8Array], { type: photoData?.contentType });
  const photoURL = URL.createObjectURL(blob);


  return photoURL;
};

helpers.setUserConfig = (user)=>{
  user.profilePhoto = user?.profilePhoto ? helpers.parseProfilePhoto(user?.profilePhoto):config.user_default;
  config.userData = user;
}


helpers.array3x3 = (arr)=>{
  const result = [];
  if(arr.length === 0){
    return [];
  }
  for (let i = 0; i < arr.length; i += 3) {
    const subarray = arr.slice(i, i + 3);
    result.push(subarray);
  }
  return result;
}

helpers.isValidEmail = (email)=>{
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

helpers.addComment = async(postID, text, userID, callback)=>{
  if(!postID || !text || !userID){
    return callback({message:"Missing required fields, please try again"});
  }
  try{
    const response = await helpers.post(`${config.backend_host}/post/add_comment`, {postID, text, userID});
    if(response?.data){
      return callback(false,response.data);
    }
  } 
  catch(e){
    callback({message:"An error occured: " + e});
  }
}

// helpers.base64ToArrayBuffer = (base64) => {
//   var binary_string = window.atob(base64);
//   var len = binary_string.length;
//   var bytes = new Uint8Array(len);
//   for (var i = 0; i < len; i++) {
//   bytes[i] = binary_string.charCodeAt(i);
//   }
//   return bytes.buffer;
//   }

helpers.deleteComment = async(commentID, callback)=>{
  if(!commentID){
    return callback({message:"Missing required fields, please try again"});
  }
  try{
    const response = await helpers.post(`${config.backend_host}/post/delete_comment`, {
      commentID
    });
    if(response.status === 200){
      return callback(false,response.data);
    }
  } 
  catch(e){
    callback({message:"An error occured: " + e});
  }
}

helpers.loadComments = async(postID, part, callback)=>{
  try{
    let response = await axios.post(`${config.backend_host}/post/load_comments`,{
      postID,
      part
    }, {
        headers:{
            "Content-Type":"application/json",
            "accesstoken":`Bearer ${localStorage.getItem('accessToken')}`,
            "refreshtoken":`Refresh ${localStorage.getItem('refreshToken')}`
        }
      }
    );

    return callback(false,response);

  }catch(e){
    callback({message:"An error occured: "+e});
  }
}

helpers.getDisplayString = (time)=>{
  const currentTime = new Date();
  const inputTime = new Date(time);
  const timeDifference = Math.abs(currentTime - inputTime) / 1000; // Convert milliseconds to seconds

  if (timeDifference < 60) {
    return "Just now";
  } else if (timeDifference < 3600) {
    const minutes = Math.floor(timeDifference / 60);
    return `${minutes}m ago`;
  } else if (timeDifference < 86400) {
    const hours = Math.floor(timeDifference / 3600);
    return `${hours}h ago`;
  } else if (timeDifference < 2592000) {
    const days = Math.floor(timeDifference / 86400);
    return `${days}d ago`;
  } else if (timeDifference < 31536000) {
    const months = Math.floor(timeDifference / 2592000);
    return `${months} months ago`;
  } else {
    const years = Math.floor(timeDifference / 31536000);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  }
}



helpers.sortByPublishDate = (posts) => {
  const sortedPosts = [...posts];

  for (let i = 0; i < sortedPosts.length - 1; i++) {
    for (let j = i + 1; j < sortedPosts.length; j++) {
      const timeA = new Date(sortedPosts[i].publishDate);
      const timeB = new Date(sortedPosts[j].publishDate);
      
      if (timeB > timeA) {
        // Swap the positions of posts[i] and posts[j]
        const temp = sortedPosts[i];
        sortedPosts[i] = sortedPosts[j];
        sortedPosts[j] = temp;
      }
    }
  }

  return sortedPosts;
}

export {helpers}