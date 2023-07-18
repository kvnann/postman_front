import React from 'react'
import {Navbar} from '../../components'

const NotFound = () => {
  return (
    <div className='app'>
        <Navbar active="" seperate={true}/>
        <div className='display-1 centered p-4'>
          404 Page Not Found
        </div>
    </div>
  )
}

export default NotFound
