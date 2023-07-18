import {useState, useEffect} from 'react'
import {helpers} from '../../helpers'
import {Loading, Navbar, Posts, Users, SideLinks, PostsLoading} from '../../components'
import { useLocation } from 'react-router-dom';


const Search = () => {
    const [postSearch, setPostSearch] = useState(true)
    const [userSearch, setUserSearch] = useState(false)

    const [postsData, setPostsData] = useState(false);
    const [usersData, setUsersData] = useState(false);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');

    const [auth, setAuth] = useState(false);
    let authStarted = false;

    const [user, setuser] = useState();
    
    const [loading, setLoading] = useState(true);

    const authentication = async()=>{
        if(!auth && !authStarted){
            authStarted = true
            const {newAuth,userData} = await helpers.auth();
            if(!newAuth){
                window.location='/login'
            }
            setAuth(newAuth);
            setuser(userData);
        }
    }


    useEffect(()=>{
        authentication();
    });
    
    useEffect(() => {
        if(auth && user){
            setLoading(false)
        }
    }, [auth, user])



    return(
        <div className='app'>
            <Navbar active="feed" seperate={true}/>
                <div className='main'>
                    <SideLinks active="feed" seperate={true}/>

                    <div className='mobile_w100 mobile_mt40'>
                    <div className='cp_all margin-between-2 d-flex mt-4 fs-5 justify-content-center normal_a_tag'>
                        <div className={`${postSearch?"text-orangered":"text-muted"}`} onClick={()=>{
                            setUserSearch(false);
                            setPostSearch(true);
                        }}>Posts</div>
                        <div className={`${userSearch?"text-orangered":"text-muted"}`} onClick={()=>{
                            setUserSearch(true);
                            setPostSearch(false);
                        }}>Accounts</div>
                    </div>
                    {!loading &&
                        postSearch?<Posts user={user} type="search" setResults={(data)=>{setPostsData(data)}} savedPostsData={postsData} queryObject={query} />:
                        userSearch?<Users user={user} type="search" setResults={(data)=>{setUsersData(data)}} savedUsersData={usersData} queryObject={query} />:
                        <PostsLoading/>
                    }
                    </div>
                    <div className='main-right text-muted'></div>
                </div>
            <div className='centered'>
                {loading && <Loading/>}
            </div>
        </div>
    )
}

export default Search