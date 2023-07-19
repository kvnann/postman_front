import {useState, useEffect} from 'react'
import {helpers} from '../../helpers'
import {PostCreate, Post, PostsLoading} from '../'

const Posts = ({user, watchingUser, type, queryObject, setResults, savedPostsData}) => {

    if(!user){
        user=watchingUser
    }
    if(!watchingUser){
        watchingUser=user
    }

    const [postsLoading, setPostsLoading] = useState(false);
    let feedSet = false;

    const [responseCame, setResponseCame] = useState(false);

    const [posts, setposts] = useState(false);
    const [postsData, setpostsData] = useState([]);
    let firstLoad = false;
    const [part, setpart] = useState(1);

    const handleLoad = async(first)=>{
        
        if(savedPostsData || savedPostsData?.length === 0){
            setpostsData(savedPostsData);
            setResponseCame(true)
            return;
        }

        if((firstLoad && first) || typeof(posts) == "string"){
            return;
        }

        
        firstLoad = true;        
        
        setPostsLoading(true)

        if(type === 'search' && postsData.length === 0){
            
            await helpers.search(queryObject, "p", (err,data)=>{
                if(!err){
                    setPostsLoading(false)
                    setpostsData(data);
                    setResults(data);
                    setpart(prev=>prev+1);
                }
                else{
                    console.log(err?.message)
                }
                setPostsLoading(false)
                setResponseCame(true)
            });
            setPostsLoading(false)
            return;
        }

        // if((posts?.length < 1) || part > helpers.array3x3(posts).length){
        //     setPostsLoading(false);
        //     return
        // }

        if((posts?.length < 1) || part > posts?.length){
            setPostsLoading(false);
            return
        }

        try{
            const response = await helpers.loadPostsLow(posts,part);
            setpostsData([...postsData, response]);
            // setpostsData([...postsData, ...Object.values(response)]);
            setpart(prev=>prev+1);
        } catch(e){
            console.log(e);
        }finally{
            setResponseCame(true)
            setPostsLoading(false)
        }
    }   

    const refreshPosts = ()=>{
        setpostsData([]);
        setposts(false);
        setpart(1)
        setResponseCame(false)
        setFeed();
    }


    const setFeed = async()=>{
        try{
            const response = await helpers.getPosts(type,watchingUser?.userID);
            setposts(response);
            setResponseCame(true)
            feedSet = true;
        } catch(e){
            setResponseCame(true)
            alert("An error occured while loading posts" + e);
        }
        
    }

    useEffect(()=>{
        if(!feedSet && user){
            if(type==="search"){
                feedSet = true;
                handleLoad(true);
            }
            else{
                feedSet = true;
                setFeed();
            }
        }
    },[user]);
    
    useEffect(()=>{
        if(posts?.length > -1){
            handleLoad(true);
        }
    },[posts]);



    return(
        <div className='main-left posts'>
            {type === "feed" &&
                <PostCreate onPostCreate={refreshPosts}  getUser={user}/>
            }
                {
                    !postsLoading && postsData?.length > 0?
                    <div className='text-muted cp mt-5' onClick={refreshPosts}>Reload Posts</div>:
                    ""
                }
            {
                postsData.map((postData,index)=>{
                    const mappedPost = <Post user={user} postData={postData} onPostDeleted={refreshPosts}  key={index} />;
                    return mappedPost;
                })
            }
            <div className='d-flex justify-content-center mb-4 lr-100'>
                {
                    !postsLoading && posts?.length > postsData?.length ? <div className="cp mt-2" onClick={()=>{handleLoad(false)}}>Load More</div> : ""
                }
                {postsLoading?
                    <PostsLoading/>:
                    postsData?.length === 0? (responseCame && postsData?.length === 0 ?
                    <div className='mt-4'>No Posts Found</div>:<PostsLoading/>) : ""
                }
            </div>
        </div>
    )
}

export default Posts