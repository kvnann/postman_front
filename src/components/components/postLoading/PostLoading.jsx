import React from 'react'
import {config} from "../../config"

const PostLoading = () => {
  return (
    <div className="post">
        <div className='display-4 fs-3 mb-3 d-flex align-items-center justify-content-between'>
            <div className='d-flex align-items-center lr-100'>
                <img className='user-select-none' src={config.user_default} alt="Loading..." style={{height:"40px",width:"40px",borderRadius:"100%", marginRight:"10px"}} />
                <div className='loading_replacement lr-30'></div>
            </div>
            <div className='d-flex align-items-center'>
            </div>
            <div>
            </div>
        </div>
        <div className='postText'>
            <div className='loading_replacement mb-1 lr-100'></div>
            <div className='loading_replacement mb-1 lr-100'></div>
            <div className='loading_replacement mb-1 lr-20'></div>
        </div>
        <div className='mt-3 d-flex flex-row justify-content-between'>
            <div className='d-flex mt-2 flex-row justify-content-between lr-100'>
               <div className='loading_replacement lr-10'></div>
               <div className='loading_replacement lr-10 ml-2'></div>
            </div>
            <div className='loading_replacement lr-10'></div>
        </div>
    </div>
  )
}

export default PostLoading
