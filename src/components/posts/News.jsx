import React from 'react'
import Posts from './Posts'

const News = ({user}) => {
  return (
    <Posts user={user} type="news"/>
  )
}

export default News
