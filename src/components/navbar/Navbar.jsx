import React from 'react'
import { useEffect, useState} from 'react';
import {helpers} from '../../helpers'
import {config} from '../../config'
import {BsSearch} from 'react-icons/bs'

const Navbar = ({active, user}) => {
  // window.onscroll = function() {myFunction()};
  // function myFunction() {
  //   var navbar = document.querySelector(".nav_bg");
  //   if (window.pageYOffset >= 200 && document.body.scrollHeight - window.innerHeight > 250) {
  //     navbar.classList.add("sticky")
  //   } else {
  //     navbar.classList.remove("sticky");
  //   }
  // }
  useEffect(()=>{
      document.querySelector(`#nav__active-${active}`)?.classList.add("navbar-active");
  });
  const linkTo = (linkParam) =>{
    window.location = `${linkParam}`;
  }

  const handleLogoClick = ()=>{window.location='feed'};

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
          <div className='m-3 mb-1 account_image' onClick={()=>{window.location="/account"}}><img width={50} height={50} style={{borderRadius:"50%"}} src={user?.profilePhoto?helpers.parseProfilePhoto(user?.profilePhoto):config.user_default} alt={user?.username?user?.username : "Loading..."}/></div>
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
          <div  onClick={()=>{linkTo("/feed")}} id='nav__active-feed' className="mnavbar_element d-flex justify-content-center align-items-center">
            Feed
          </div>
          <div onClick={()=>{linkTo("/news")}} id='nav__active-news' className="mnavbar_element d-flex justify-content-center align-items-center">
            News
          </div>
          <div onClick={()=>{linkTo("/account")}} id='nav__active-account' className="mnavbar_element d-flex justify-content-center align-items-center">
            My Profile
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar