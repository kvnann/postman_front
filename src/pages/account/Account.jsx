import {useState, useEffect} from 'react'
import {helpers} from '../../helpers'
import {config} from '../../config'
import {Posts, PostsLoading, EditAccount} from '../../components'

const Account = () => {
    const [likedPosts, setlikedPosts] = useState(false)
    const [userPosts, setuserPosts] = useState(true)
    const [editAccount, setEditAccount] = useState(false);

    const [auth, setAuth] = useState(false);
    let authStarted = false;

    const [user, setuser] = useState();
    
    const [loading, setLoading] = useState(true);
    

    const authentication = async()=>{
        if(!auth && !authStarted){
            authStarted = true
            const {newAuth,userData} = await helpers.auth();
            if(!newAuth){
                // alert("Session expired, please login")
                // window.location = "/login"
            }
            setAuth(newAuth);
            setuser(userData);
        }
    }

    useEffect(()=>{
        setlikedPosts(!userPosts)
    },[userPosts])

    useEffect(()=>{
        authentication();
    });
    
    useEffect(() => {
        if(auth && user){
            helpers.setUserConfig(user);
            setLoading(false);
        }
    }, [auth, user])


    return(
        <div className='accounts_main'>
            {!editAccount &&
            <div>
                <div className='userProfile lr-100'>
                    <img src={config.userData.profilePhoto}
                    alt={`${user?.username ?user?.username:"Loading.."}`} 
                    style={{height:"200px",width:"200px",borderRadius:"100%", border:"4px solid black", marginRight:"10px"}} />
                    <div className='display-4'>{`${config.userData?.username ? config.userData?.username:"Loading..."}`}</div>
                </div>
                <div className='text-muted cp text-hover-underline text-center' onClick={()=>{setEditAccount(true)}}>Edit Account</div>
            </div>
            }
            {
                editAccount &&
                <div><EditAccount handleBack={()=>{setEditAccount(false)}}/></div>
            }

            {!editAccount &&
            <div>
                <div className='cp_all margin-between-2 d-flex mt-4 fs-5 justify-content-center normal_a_tag'>
                    <a href="#account_post_show" className={`${userPosts?"":"text-muted"}`} onClick={()=>{
                        setuserPosts(true);
                    }}>My Posts</a>
                    <a href="#account_post_show" className={`${likedPosts?"":"text-muted"}`} onClick={()=>{
                        setuserPosts(false);
                    }}>Liked</a>
                </div>
                
                <div className='account_post_show' id="account_post_show">
                {loading? 
                    <PostsLoading/>:
                    <div className='account_post_show'>
                        {likedPosts && <Posts user={user} watchingUser={user} type="liked" typeChange={true}/>}
                        {userPosts && <Posts user={user} watchingUser={user} type="user" typeChange={true}/>}
                    </div>
                }
                </div>
            </div>
            }
        </div>
    )
}

export default Account