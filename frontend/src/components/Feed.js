import React, { useEffect, useState } from 'react'
import Post from './Post'
import postData from './postData.json'
import LoadingScreen from '../components/LoadingScreen'

function PostContainer() {
    const [posts, setPosts] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        window.addEventListener('scroll', loadOnScroll)
        return () => {
            window.removeEventListener('scroll', loadOnScroll)
        }
    })


    function loadOnScroll(e) {
        var end = document.getElementById('feed-end-content')
        var rect = end.getBoundingClientRect()
        var isAtEnd = (
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        )
        if (isAtEnd) {
            if (!isFetching) {
                setIsFetching(true)
                fetchPosts()
            }
        }
    }

    async function fetchPosts() {
        const res = await fetch('/api/Feed/?page=' + currentPage + '/')
        if (res.status == 200) {
            const data = await res.json()
            setPosts(posts.concat(data))
            setCurrentPage(currentPage + 1)
        } else {
            setPosts('error')
        }
        setIsFetching(false)
    }

    useEffect(fetchPosts, [])

    return (
        <div className="post-container">
            {posts ?
                (
                    posts != 'error' ?
                        posts.map((post) => {
                            return <Post post={post} key={post.id} />
                        })
                        :
                        <h5>Something went wrong</h5>
                )
                :
                <Post post={posts} />
            }
            <LoadingScreen height='100%' id='feed-end-content' />
        </div>
    )
}

function MiniProfile() {
    return (
        <div className="mini-profile full-screen">
            <div className="mini-profile-card">
                <div className="mini-profile-top">
                    <div className="mini-profile-cover"></div>
                    <img src="https://media-exp1.licdn.com/dms/image/C5603AQFJz8FiY3lWXA/profile-displayphoto-shrink_800_800/0/1609861395191?e=1624492800&v=beta&t=I8KhD_rYunJydi6GxUk4P2PvKAQL5CikJh4_rQGI6cI"
                        alt="" className="mini-profile-main" onClick={() => { window.location.pathname = '/test/index.html' }} />
                </div>
                <div className="mini-profile-mid" onClick={() => { window.location.pathname = '/test/index.html' }}>
                    <div>Antariksh Sisodiya</div>
                    <span>Student</span>
                </div>
                <div className="mini-profile-bottom">
                    <div className="mini-profile-projects">
                        <span>Projects</span>
                        <span>5</span>
                    </div>
                    <div className="mini-profile-connctions">
                        <span>Connections</span>
                        <span>156</span>
                    </div>
                </div>
                <div className="mini-profile-saved">
                    <i className="far fa-bookmark"></i>
                    <span>Saved</span>
                </div>
            </div>
        </div>
    )
}

function SuggestionFull() {
    function SugList() {
        return (
            <div className="sug-list">
                <div className="sug-list-left">
                    <img src="https://instagram.fbdq2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/23733932_140126626640621_3414972949961113600_n.jpg?tp=1&_nc_ht=instagram.fbdq2-1.fna.fbcdn.net&_nc_ohc=ZIjR77IY7hsAX8DUPyY&edm=ABfd0MgAAAAA&ccb=7-4&oh=a950548c5c22789b3f9d9730bbc610cd&oe=60A87204&_nc_sid=7bff83"
                        alt="" className="sug-img" />
                </div>
                <div className="sug-list-mid">
                    <div>Aman Borse</div>
                    <span>Recommended</span>
                </div>
                <div className="sug-list-right">
                    <span>Follow</span>
                </div>
            </div>
        )
    }

    return (
        <div className="suggestions full-screen">
            <div className="suggestions-card">
                <div className="sug-top">
                    <h5>Suggestions for you</h5>
                    <span>See All</span>
                </div>
                <div className="sug-container">
                    <SugList />
                    <SugList />
                    <SugList />
                    <SugList />
                    <SugList />
                </div>
            </div>
        </div>
    )
}

function Feed() {
    return (
        <div className="feed-area" id='home'>
            <MiniProfile />
            <PostContainer />
            <SuggestionFull />
        </div>
    )
}

export default Feed
