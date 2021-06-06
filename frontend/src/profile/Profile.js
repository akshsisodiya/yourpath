import React, { useEffect, useState, useContext } from "react"
import "./profile.css"
import { UserContext } from '../App'
import Post from '../components/Post'
import LoadingScreen from '../components/LoadingScreen'
import EditProfile from './EditProfile'
import {DEFAULT_IMG} from '../components/SetProfilePic'

function ProfileMain({ user, self }) {
    const me = useContext(UserContext) 
    const profile = user.profile ? user.profile : DEFAULT_IMG   
    const [isFollowed, setIsFollowed] = useState(user.followers.map(u => { return u.username == me.user.username }).includes(true))
    const [followersCount, setFollowersCount] = useState(user.followers.length)
    function follow() {
        setIsFollowed(!isFollowed)
        setFollowersCount(followersCount + (isFollowed ? -1 : 1))
        fetch('/follow/' + user.user.username + '/')
    }
    return (
        <div className="col-lg-3" id="profile-main">
            <div className="row">
                <div className="d-block d-lg-none col-12">
                    <div style={{ position: 'relative' }}>
                        <img className='img-fluid rounded' src={user.cover} alt="" />
                        <div className="col-4 col-lg-12 p-4" style={{ position: 'absolute', left: '50%', top: '90%', transform: 'translate(-50%, -50%)' }}>
                            <img className='img-fluid rounded-circle profile-main-profile' src={profile} alt="" />
                        </div>
                    </div>
                    <div className='empty-space' style={{ content: '' }}></div>
                </div>
                <div className="d-none d-lg-block col-3 col-lg-12 p-3">
                    <img className='img-fluid rounded-circle' src={profile} alt="" />
                </div>
            </div>
            <div className="row text-center">
                <div className="col-12 mb-2">
                    <div className='h5 mb-0'>{user.user.first_name} {user.user.last_name} <i className="fas fa-check-circle text-primary"></i> </div>
                    <span>{user.user_bio}</span>
                </div>
                <div className="col-12 mb-2">
                    <div className="row justify-content-around">
                        <div className="col-3 p-2">
                            <div className="h6 mb-0">{user.followings.length}</div>
                            <span>Following</span>
                        </div>
                        <div className="col-3 p-2">
                            <div className="h6 mb-0">{followersCount}</div>
                            <span>Followers</span>
                        </div>
                        <div className="col-3 p-2">
                            <div className="h6 mb-0">{user.posts.length}</div>
                            <span>Posts</span>
                        </div>
                    </div>
                </div>
                {self ?
                    <div className="col-12 mb-2">
                        <button className="btn" id='edit-profile-btn'>Edit Profile</button>
                    </div> :
                    <div className="col-12 mb-2">
                        {isFollowed ?
                            <button className="btn" id='edit-profile-btn' onClick={follow}>Unfollow</button>
                            :
                            <button className="btn" id='edit-profile-btn' onClick={follow}>Follow</button>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

function ProfileContent({ data, self }) {
    const userDetail = useContext(UserContext)

    function CoverPhoto() {
        return (
            <div className="cover-img-container d-none d-lg-block" style={{ height: '200px' }}>
                <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={data.cover} alt="" />
            </div>
        )
    }

    function Navbar({ curTab, setCurTab }) {
        useEffect(() => {
            document.querySelector(".profile-nav-link").classList.remove("active")
            document.getElementById(curTab + "-nav").classList.add("active")
        }, [curTab])

        function profileNavClick(e) {
            if (e.target.id) {
                setCurTab(e.target.id.slice(0, -4))
            } else {
                e.target.parentElement.click()
                e.stopPropagation()
            }
        }
        return (
            <div className="row justify-content-start" id="profile-navbar">
                <nav className="nav py-3 col-lg-12">
                    <div
                        className="nav-link profile-nav-link mx-2"
                        onClick={profileNavClick}
                        id="overview-nav"
                    >
                        <i className="fas fa-book-open    "></i> <span>Overview</span>
                    </div>
                    <div
                        className="nav-link profile-nav-link mx-2"
                        onClick={profileNavClick}
                        id="posts-nav"
                    >
                        <i className="fas fa-sticky-note    "></i> <span>Posts</span>
                    </div>
                    <div
                        className="nav-link profile-nav-link mx-2"
                        onClick={profileNavClick}
                        id="projects-nav"
                    >
                        <i className="fas fa-toolbox    "></i> <span>Projects</span>
                    </div>
                    {self && <div
                        className="nav-link profile-nav-link mx-2"
                        onClick={profileNavClick}
                        id="saved-nav"
                    >
                        <i className="fas fa-bookmark"></i> <span>Saved</span>
                    </div>}
                </nav>
            </div>
        );
    }

    function Content({ curTab, setCurTab, postData }) {

        const [posts, setPosts] = useState(postData.posts)
        const [savedPosts, setSavedPosts] = useState(postData.saved)
        const [allPosts, setAllPosts] = useState({posts:posts, savedPosts:savedPosts})

        // useEffect(() => {
        //     setAllPosts({posts:posts, savedPosts:savedPosts})
        // }, [posts,savedPosts])

        function OverView() {
            function TopPost() {
                const topPost = posts.sort(post => { return post.likes.length })[0]
                return (
                    <div className="col-lg-12">
                        <div className="h4 p-2 ml-3" style={{ color: 'var(--theme-blue)' }}>Top Post</div>
                        <Post post={topPost} key={topPost.id} posts={allPosts} setPosts={setAllPosts} />
                    </div>
                )
            }
            function TopProject() {
                return (
                    <div className="col-lg-12 p-4">
                        <div className="h4 ml-3 pb-2" style={{ color: 'var(--theme-blue)' }}>Top Project</div>
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title h5">Project 1</div>
                                <div className="card-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime, eveniet laudantium beatae, odit, voluptatibus cumque ad hic illum perferendis quo commodi dolorem. Voluptatum, ratione aut!</div>
                            </div>
                        </div>
                    </div>
                )
            }
            return (
                <div className="profile-content" id="overview-content">
                    <div className="row">
                        {/* {postData.projects && <TopProject />} */}
                        <TopProject />
                        {postData.posts.length != 0 && <TopPost totalPosts={postData.posts} />}
                    </div>
                </div>
            )
        }

        function PostsGrid() {
            return (
                <div className="profile-content p-3" id="posts-content">
                    {posts.length != 0 ?
                        <div className="col-lg-12 px-2">
                            {posts.reverse().map((post) => {
                                return <Post post={post} key={post.id} posts={posts} setPosts={setPosts} />
                            })}
                        </div>
                        :
                        <h4>No Posts</h4>
                    }
                </div>
            )
        }

        function ProjectGrid() {
            function Project(props) {
                return (
                    <div className="col-lg-12 p-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title h5">Project {props.n}</div>
                                <div className="card-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime, eveniet laudantium beatae, odit, voluptatibus cumque ad hic illum perferendis quo commodi dolorem. Voluptatum, ratione aut!</div>
                            </div>
                        </div>
                    </div>
                )
            }
            return (
                <div className="profile-content" id="projects-content">
                    <div className="row justify-content-center p-2">
                        <Project n='1'></Project>
                        <Project n='2'></Project>
                        <Project n='3'></Project>
                        <Project n='4'></Project>
                    </div>
                </div>
            )
        }

        function SavedGrid() {
            return (
                <div className="profile-content p-3" id="saved-content">
                    {savedPosts.length != 0 ?
                        <div className="px-2">
                            {savedPosts.reverse().map((post) => {
                                return <Post post={ post} key={post.id} posts={savedPosts} setPosts={setSavedPosts} />
                            })}
                        </div>
                        :
                        <h4>No saved posts</h4>
                    }
                </div>
            )
        }

        useEffect(() => {
            document.querySelector(".profile-content").classList.remove("active")
            document.getElementById(curTab + "-content").classList.add("active")
        }, [curTab])

        return (
            <div className="" id="profile-feed">
                {curTab == 'overview' && <OverView />}
                {curTab == 'posts' && <PostsGrid postData={data} />}
                {curTab == 'projects' && <ProjectGrid />}
                {curTab == 'saved' && (self && <SavedGrid />)}
            </div>
        );
    }

    const [curTab, setCurTab] = useState("overview");

    return (
        <div className="col-lg-8" id="profile-content">
            <CoverPhoto />
            <Navbar curTab={curTab} setCurTab={setCurTab} />
            <Content curTab={curTab} setCurTab={setCurTab} postData={data} />
        </div>
    );
}

function Profile({ username }) {
    const [userDetail, setUserDetail] = useState(null)
    const [userNotFound, setUserNotFound] = useState(false)
    const me = useContext(UserContext)
    const [self, setSelf] = useState(false)
    useEffect(async () => {
        if(username){
            let queryUser = username
            const response = await fetch(`/api/UserProfileModel/?username=${queryUser}`)
            if (response.status == 200) {
                const jsonResponse = await response.json()
                setUserDetail(jsonResponse[0])
                setSelf(jsonResponse[0].user.username == me.user.username ? true : false)
            } else {
                setUserNotFound(true)
            }
        }else{
            setSelf(true)
            setUserDetail(me)
        }
    }, [])

    return (
        <div className="profile-page mt-3" id='profile'>
            <div className="container">
                {userNotFound ?
                    <h1>Is naam ka koi user hi nahi hai, tum banoge?</h1>
                    :
                    (userDetail ? <div className="row justify-content-around">
                        <ProfileMain user={userDetail} self={self} />
                        <ProfileContent data={userDetail} self={self} />
                    </div> : <LoadingScreen />)
                }
            </div>
        </div>
        // <div className="profile-page mt-3" id='profile'>
        //     {userDetail ? <EditProfile user={userDetail} /> : <LoadingScreen />}
        // </div>

    );
}

export default Profile;
