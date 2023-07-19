import {useState, useEffect} from 'react'
import {helpers} from '../../helpers'
import {PostCreate, Post, PostsLoading, UserCard} from '../'

const Users = ({user, type, queryObject, setResults, savedUsersData}) => {

    const [usersLoading, setUsersLoading] = useState(false);
    let feedSet = false;
    
    const [users, setusers] = useState([]);
    const [usersData, setusersData] = useState([]);
    let firstLoad = false;
    // It will be useful in future for exploring new users
    // const [part, setpart] = useState(1);

    const handleLoad = async(first)=>{

        if(savedUsersData || savedUsersData?.length === 0){
            setusersData(savedUsersData);
            return;
        }

        if((firstLoad && first) || typeof(users) == "string"){
            return;
        }

        firstLoad = true;        

        setUsersLoading(true)

        if(type === 'search' && usersData.length == 0){
            await helpers.search(queryObject, "u", (err,data)=>{
                if(!err){
                    setusersData([...data]);
                    setResults(data);
                    // setpart(prev=>prev+1);
                }
                else{
                    console.log(err?.message)
                }
                setUsersLoading(false)
            });
            setUsersLoading(false)
            return;
        }
        
        // if((users.length < 1 || part > helpers.array3x3(users).length) ){
            //     setUsersLoading(false);
            //     return
            // }
            
        // try{
        //     const response = await helpers.loadPosts(users,part);
        //     setusersData([...usersData, ...Object.values(response)]);
        //     setpart(prev=>prev+1);
        // } catch(e){
            //     console.log(e);
            // }
        // setUsersLoading(false)
    }   

    const refreshUsers = ()=>{
        setusersData([]);
        setusers([]);
        // setpart(1)
        // setFeed();
    }


    // const setFeed = async()=>{
    //     try{
    //         const response = await helpers.getPosts(type);
    //         setusers(response)
    //         feedSet = true;
    //     } catch(e){
    //         alert("An error occured while loading users" + e)
    //     }
        
    // }

    useEffect(()=>{
        if(!feedSet && user){
            if(type==="search"){
                feedSet = true;
                handleLoad(true);
            }
            // else{
            //     feedSet = true;
            //     setFeed();
            // }
        }

    },[user]);
    
    useEffect(()=>{
        if(users){
            handleLoad(true);
        }
    },[users]);



    return(
        <div className='main-left users pb-4'>
            {/* <UserCard userData={{
                username:"Kanan",
                userID:"anani",
                admin:true
            }} user={{
                username:"Kanan",
                userID:"anani",
                admin:true
            }}/>
            <UserCard userData={{
                username:"Kanan",
                userID:"anani",
                admin:true
            }} user={{
                username:"Kanan",
                userID:"anani",
                admin:true
            }}/>
            <UserCard userData={{
                username:"Kanan",
                userID:"anani",
                admin:true
            }} user={{
                username:"Kanan",
                userID:"anani",
                admin:true
            }}/> */}
            {
                usersData.map((userData,index)=>{
                    const mappedPost = <UserCard user={user} userData={userData} refresh={refreshUsers}  key={index} />;
                    return mappedPost;
                })
            }
            <div className='d-flex justify-content-center mt-5 mb-5 lr-100'>
                {usersLoading?
                    <PostsLoading/>:
                    type==="search" && usersData?.length === 0?"No Accounts Found":"" // part > helpers.array3x3(users).length ?
                    // :<div style={{cursor:"pointer"}} onClick={()=>{handleLoad(false)}} className='text-muted'>Load more...</div>
                }
            </div>
        </div>
    )
}

export default Users
