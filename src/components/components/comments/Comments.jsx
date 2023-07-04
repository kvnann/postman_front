import React from 'react'
import {Comment} from '../'
const Comments = () => {
  return (
    <div className='comments'>
        <Comment
            commentData={
              {
                text:"Das ist ein sehr geniales Kunstwerk",
                userData:{
                  username:"Kanan Abdullayev"
                },
                publishDate:new Date(),
                likes:[]
              }
            }
        />
        <Comment/>
        <Comment/>
    </div>
  )
}

export default Comments
