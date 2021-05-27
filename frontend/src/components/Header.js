import React, { useState, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'


function SearchResult(props) {
    return (
        <div className="search-result" id={props.id} onClickCapture={() => { console.log(props.value) }}>
            <h6 >{props.value}</h6>
        </div>
    )
}


function SearchResultContainer(props) {
    function searchQuery(e) {
        var query = document.querySelector('#search-form>input').value
        console.log(query)
    }
    return (
        <div className="search-result-container" >
            <SearchResult id={1} value={"Result 1"} />
            <SearchResult id={2} value={"Result 2"} />
            <h6 onClickCapture={searchQuery}>Search result for <strong>{props.query}</strong></h6>
        </div>
    )
}


function Header({ curMainTab, setCurMainTab }) {
    const [searchResultBool, setSearchResultBool] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [addPostTab, setAddPostTab] = useState(false)
    const addPostList = useRef()
    const history = useHistory()
    function searchBarOnFocus(e) {
        setSearchResultBool(true)
    }
    function searchBarOutFocus(e) {
        document.onclick = () => {
            setSearchResultBool(false)
        }
        document.querySelector(".search-result-container").onclick = (event) => {
            event.stopPropagation()
        }
        document.querySelector(".search-bar>form>input").onclick = (event) => {
            event.stopPropagation()
        }
    }
    useEffect(() => {
        let headerNavs = document.querySelectorAll(".tab")
        for (let i = 0; i < headerNavs.length; i++) {
            headerNavs[i].classList.remove('active')
        }
        document.getElementById(curMainTab + '-nav').classList.add('active')
    }, [curMainTab])
    function tabClick(e) {
        // setCurMainTab(e.target.id.slice(0, -4))
        history.push('/' + e.target.id.slice(0, -4), { from: window.location.pathname })
    }

    // useEffect(()=>{
    //     function handleClickOutside(e){
    //         if(addPostList.current.contains(e.target))
    //     }
    //     if(addPostTab){
    //         document.addEventListener('mousedow', handleClickOutside)
    //     }
    // },[addPostTab])
    // function addPostTabClick(e){
    //     document.get
    // }

    function tabIconClick(e) {
        e.target.parentNode.click()
        e.stopPropagation()
    }
    return (
        <div className="header shadow-sm">
            <div className="header-left">
                <div className="logo">
                    <h4>YourPath</h4>
                </div>
                <div className="search-bar">
                    <i className="fa fa-search" aria-hidden="true"></i>
                    <form action="" id="search-form" autoComplete="off">
                        <input type="text" name="query" maxLength={40}
                            onFocus={searchBarOnFocus} onBlur={searchBarOutFocus}
                            onChange={(e) => setSearchQuery(e.target.value)} />
                        <button type="submit"></button>
                    </form>
                    {searchResultBool && <SearchResultContainer query={searchQuery} />}
                </div>
            </div>
            <div className="header-right">
                <div className="tab" id='home-nav' onClick={tabClick} >
                    <i className="fa fa-home" aria-hidden="true" onClick={tabIconClick}></i>
                </div>
                <div className="tab" id='chat-nav' onClick={tabClick}>
                    <i className="fa fa-comments" aria-hidden="true" onClick={tabIconClick}></i>
                </div>
                <div className="tab" id='upload-nav' onClick={tabClick} style={{ position: 'relative' }}>
                    <i className="fa fa-plus-square" aria-hidden="true" onClick={tabIconClick}></i>
                    <div className="p-2 d-none" id='add-new-list' ref={addPostList} style={{ position: 'absolute', top: '100%', left: '0%' }}>
                        <div className="p-1">
                            <h6>New Post</h6>
                        </div>
                        <div className="p-1">
                            <h6>New Project</h6>
                        </div>
                    </div>
                </div>
                <div className="tab" id='notification-nav' onClick={tabClick}>
                    <i className="fa fa-bell" aria-hidden="true" onClick={tabIconClick}></i>
                </div>
                <div className="tab" id='profile-nav' onClick={tabClick}>
                    <i className="fa fa-user-circle" aria-hidden="true" onClick={tabIconClick}></i>
                </div>
            </div>
        </div>
    )
}

export default Header
