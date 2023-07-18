import React from 'react'
import { useEffect, useState} from 'react';
import {helpers} from '../../helpers'
import {config} from '../../config'
import {BsSearch} from 'react-icons/bs'

const Navbar = ({active, user, pageChange}) => {
  // window.onscroll = function() {myFunction()};
  // function myFunction() {
  //   var navbar = document.querySelector(".nav_bg");
  //   if (window.pageYOffset >= 200 && document.body.scrollHeight - window.innerHeight > 250) {
  //     navbar.classList.add("sticky")
  //   } else {
  //     navbar.classList.remove("sticky");
  //   }
  // }

  const linkTo = (linkParam) =>{
    window.location = `${linkParam}`;
  }

  const handleLogoClick = ()=>{pageChange("feed")};

  const handleSearch = (e)=>{
    e.preventDefault();
    window.location=`/search?query=${e.target[0].value}`;
  }

  return (
    <div className='bg-white navbar_main'>
      <div className='d-flex justify-content-between align-items-center '>
        <div className='display-4 text-orangered user-select-none' onClick={handleLogoClick} style={{cursor:"pointer"}}>uConnect</div>

        <div className='box_search align-items-center'>
          <BsSearch className='text-muted  user-select-none'/>
          <form onSubmit={handleSearch}>
            <input className='input_search' name="searchQuery " placeholder="Search..." type="text"/>
            <input type="submit" name="submit" value="Search" />
          </form>
        </div>

        <div className='cp_all d-flex justify-content-between align-items-center'>
          <div className='m-3 mb-1 btn-light user-select-none' onClick={()=>{helpers.handleLogout()}}>Logout</div>
          <div className='m-3 mb-1 account_image' onClick={()=>{pageChange("account")}}><img width={50} height={50} style={{borderRadius:"50%"}} src={config.userData?.profilePhoto ? config.userData?.profilePhoto : user?.profilePhoto ? helpers.parseProfilePhoto(user?.profilePhoto) : config.user_default } alt={user?.username? user?.username : "Loading..."}/></div>
        </div>
      </div>

      <div className="mt-3 nav_bg user-select-none">
          <div>
            <form onSubmit={handleSearch} className='form_search'>
              <input className='input_search' name="searchQuery " placeholder="Search..." type="text"/>
              <input type="submit" name="submit" value="Search" />
            </form>
          </div>
        <div className="mnavbar">
          <div onClick={()=>{pageChange("feed")}} id='nav__active-feed' className={`mnavbar_element d-flex justify-content-center align-items-center ${active==="feed"?"navbar-active":""}`}>
            Feed
          </div>
          <div onClick={()=>{pageChange("news")}} id='nav__active-news' className={`mnavbar_element d-flex justify-content-center align-items-center ${active==="news"?"navbar-active":""}`}>
            News
          </div>
          <div onClick={()=>{pageChange("account")}} id='nav__active-account' className={`mnavbar_element d-flex justify-content-center align-items-center ${active==="account"?"navbar-active":""}`}>
            My Account
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar