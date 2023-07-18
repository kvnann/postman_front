import './App.css';
import './css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import {helpers} from './helpers'
import {config} from './config'
import {Loading, Navbar, Posts, News, AllPosts, SideLinks, PostsLoading} from './components'
import {Account} from './pages'

const App = ({initialPage}) => {
    const [auth, setAuth] = useState(false);
    let authStarted = false;

    const [page, setPage] = useState(
        initialPage=="feed"?"feed":
        initialPage=="news"?"news":
        initialPage=="account"?"account":
        "feed"    
    )

    const [user, setuser] = useState();
    
    const [loading, setLoading] = useState(false);
    

    const authentication = async()=>{
        if(!auth && !authStarted){
            if(!localStorage.getItem("accessToken") && !localStorage.getItem("refreshToken")){
                window.location="/register"
            }
            authStarted = true
            const {newAuth,userData} = await helpers.auth();
            if(!newAuth){
                alert("Session expired, please login")
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
            helpers.setUserConfig(user);
            setLoading(false)
        }
    }, [auth, user]);


    const handlePageChange = (nextPage)=>{
        setPage(nextPage);
    }



    return(
        <div className='app'>
            <Navbar user={user} active={page} pageChange={handlePageChange}/>
                <div className='main'>
                    <SideLinks active={page} pageChange={handlePageChange}/>

                    {!loading?
                        page==="feed"?<AllPosts user={config.userData}/>:
                        page==="news"?<News user={user}/>:
                        page==="account"?<Account/>:
                        <h1 className='display-3'>404 Not Found</h1>:
                        <PostsLoading/>
                    }
                    <div className='main-right text-muted'>

                    </div>
                </div>
            <div className='centered'>
                {loading && <Loading/>}
            </div>
        </div>
    )
}

export default App
