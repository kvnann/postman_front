import {useState, useEffect} from 'react'
import {helpers} from '../../helpers'
import {Loading, Navbar, Posts, SideLinks, PostsLoading} from '../../components'

const News = () => {
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
            <Navbar active="news"/>
                <div className='main'>
                    <SideLinks active="news"/>

                    {!loading?
                        <Posts user={user} type="news"/>:
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

export default News