import {useState, useEffect} from 'react'
import {helpers} from '../../helpers'
import {config} from '../../config'
import {Loading, Navbar, Posts, PostsLoading, SideLinks} from '../../components'

const AccountsMain = () => {
  return (
    <div className='accounts_main'>
        <div className='userProfile lr-100'>
            <img src={user?.profilePhoto?helpers.parseProfilePhoto(user?.profilePhoto):config.user_default} 
            alt={`${user?.username ?user?.username:"Loading.."}`} 
            style={{height:"200px",width:"200px",borderRadius:"100%", border:"4px solid black", marginRight:"10px"}} />
            <div className='display-4'>{`${user?.username ?user?.username:"Loading..."}`}</div>
        </div>
        <div className='cp_all margin-between-2 d-flex mt-4 fs-5 justify-content-center normal_a_tag'>
            <a href="#account_post_show" className={`${userPosts?"":"text-muted"}`} onClick={()=>{
                setuserPosts(true);
            }}>My Posts</a>
            <a href="#account_post_show" className={`${likedPosts?"":"text-muted"}`} onClick={()=>{
                setuserPosts(false);
            }}>Liked</a>
        </div>
        <div className='account_post_show' id="account_post_show">
        {loading? 
            <PostsLoading/>:
            <div className='account_post_show'>
                {likedPosts && <Posts user={user} watchingUser={user} type="liked"/>}
                {userPosts && <Posts user={user} watchingUser={user} type="user"/>}
            </div>
        }
        </div>
    </div>
  )
}

export default AccountsMain
