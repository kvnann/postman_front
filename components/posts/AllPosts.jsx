import React from 'react'
import Posts from './Posts'

const AllPosts = ({user}) => {
  return (
    <Posts user={user} type="feed"/>
  )
}

export default AllPosts
