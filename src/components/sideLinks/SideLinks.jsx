import React from 'react'

const SideLinks = ({active, pageChange}) => {
    const handleLocation = (location) =>{
        if(location){
            window.location = location
        }
    }
  return (
    <div className='mt-5 side_links cp_all user-select-none'>
        <div className={active==="feed"?"active":""}><div className='active_before'></div><div onClick={()=>{pageChange("feed")}} className='side_link_content'>Feed</div></div>
        <div className={active==="news"?"active":""}><div className='active_before'></div><div onClick={()=>{pageChange("news")}} className='side_link_content'>News</div></div>
        <div className={active==="account"?"active":""}><div className='active_before'></div><div onClick={()=>{pageChange("account")}} className='side_link_content'>My Account</div></div>
    </div>
  )
}

export default SideLinks
