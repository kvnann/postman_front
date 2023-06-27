import {useState} from 'react'
import {config} from "../../config"
import {helpers} from "../../helpers"
import {AiFillStar} from "react-icons/ai"
import {MdDelete} from "react-icons/md"

const UserCard = ({userData, user, refresh}) => {
    return (
        <div className={`user_card ${userData.admin?"user_admin":""}`}  onClick={()=>{window.location=`/user?u=${userData.username}`}} id={userData.userID}>
            <img className='user-select-none mb-3' src={config.user_default} alt={userData.username} style={{height:"90px",width:"90px",borderRadius:"100%", border:"1px solid black "}} />
            <div className='text-center display-4 fs-1'>{userData.username}</div>
            <div className='text-muted'>Joined in 2023</div>
        </div>
      )
}

export default UserCard