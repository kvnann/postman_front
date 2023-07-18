import {useState, useEffect} from 'react'
import {helpers} from '../../helpers'
import {config} from '../../config'
import {Loading, Navbar, Posts, PostsLoading, SideLinks} from '../../components'
import { useLocation } from 'react-router-dom';

const User = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const username = queryParams.get('u');

    const [likedPosts, setlikedPosts] = useState(false)
    const [userPosts, setuserPosts] = useState(true)

    const [auth, setAuth] = useState(false);
    let authStarted = false;

    const [user, setuser] = useState();
    const [watchingUser, setwatchingUser] = useState();
    
    const [loading, setLoading] = useState(true);
    

    const getUser = async()=>{
        if(!auth && !authStarted){
            authStarted = true;
            const {newAuth, userData, watchingUserData} = await helpers.getUserAndAuth(username);
            if(!newAuth){
                alert("Cannot show the user page. Maybe it doesn't exist");
                window.location= "feed"
            }
            setAuth(newAuth);
            setuser(userData);
            setwatchingUser(watchingUserData);
        }
    }

    useEffect(()=>{
        setlikedPosts(!userPosts);
    },[userPosts])

    useEffect(()=>{
        getUser();
    });
    
    useEffect(() => {
        if(auth && user){
            setLoading(false)
        }
    }, [auth, user]);

    const handlePageChange = (nextPage)=>{
        window.location=nextPage
    }


    return(
        <div className='app'>
            <Navbar active="feed" pageChange={handlePageChange}/>
                <div className=''>
                    <div className='main'>
                        <SideLinks active="feed" pageChange={handlePageChange}/>

                        <div className='accounts_main'>
                            <div className='userProfile lr-100'>
                                <img src={config.user_default} 
                                alt={`${watchingUser?.username ? watchingUser?.username:"Loading.."}`} 
                                style={{height:"200px",width:"200px",borderRadius:"100%", border:"4px solid black", marginRight:"10px"}} />
                                <div className='display-4'>{`${watchingUser?.username ? watchingUser?.username:"Loading..."}`}</div>
                            </div>
                            <div className='cp_all margin-between-2 d-flex mt-4 fs-5 justify-content-center normal_a_tag'>
                                <a href="#account_post_show" className={`${userPosts?"":"text-muted"}`} onClick={()=>{
                                    setuserPosts(true);
                                }}>Posts</a>
                                <a href="#account_post_show" className={`${likedPosts?"":"text-muted"}`} onClick={()=>{
                                    setuserPosts(false);
                                }}>Liked</a>
                            </div>
                            <div className='account_post_show' id="account_post_show">
                            {loading? 
                                <PostsLoading/>:
                                <div className='account_post_show'>
                                    {likedPosts && <Posts user={user} watchingUser={watchingUser} type="liked"/>}
                                    {userPosts && <Posts user={user} watchingUser={watchingUser} type="user"/>}
                                </div>
                            }
                            </div>
                        </div>

                        <div className='main-right text-muted'>

                        </div>
                    </div>
                </div>
            <div className='centered'>
                {loading && <Loading/>}
            </div>
        </div>
    )
}

export default User