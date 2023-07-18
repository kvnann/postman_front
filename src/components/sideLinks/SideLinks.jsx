import React from 'react'

const SideLinks = ({active, pageChange, seperate}) => {
    const handleLocation = (location) =>{
        if(location){
            window.location = location
        }
    }
  return (
    <div className='mt-5 side_links cp_all user-select-none'>
        <div className={active==="feed"?"active":""}><div className='active_before'></div><div onClick={()=>{
          if(seperate){
            handleLocation("feed")
          }
          else{
            pageChange("feed")
          }
          }} className='side_link_content'>Feed</div></div>
        <div className={active==="news"?"active":""}><div className='active_before'></div><div onClick={()=>{
          if(seperate){
            handleLocation("news")
          }
          else{
            pageChange("news")
          }
          }} className='side_link_content'>News</div></div>
        <div className={active==="account"?"active":""}><div className='active_before'></div><div onClick={()=>{
          if(seperate){
            handleLocation("account")
          }
          else{
            pageChange("account")
          }
          }} className='side_link_content'>My Account</div></div>
    </div>
  )
}

export default SideLinks
