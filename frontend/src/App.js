import './App.css';
import Header from './components/Header'
import Feed from './components/Feed'
import React, { useEffect, useState } from 'react'
import Profile from './profile/Profile'
import Notification from './notification/Notfications'
import Chat from './chat/Chat'
import UploadPost from './upload/UploadPost'
import LoadingScreen from './components/LoadingScreen'
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import AlertMessage from './components/AlertMessage';
import PageNotFound from './components/PageNotFound'


export const UserContext = React.createContext({})
export const MainContextStore = React.createContext({})


// cloudinary ID 'leyita8591@dvdoto.com'
// cloudinary pwd 'Yourpath1234#'


function App() {
  const [user, setUser] = useState(null)
  const [alertMessage, setAlertMessage] = useState(false)
  const MainContextData = {
    setAlertMessage: setAlertMessage
  }
  // TODO remove default user
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/UserProfileModel/?username=admin`)
      const result = await res.json()
      setUser(result[0])
    }
    fetchData()
  }, [])

  const [curMainTab, setCurMainTab] = useState('home')
  const [showHeader, setShowHeader] = useState(true)

  function TabComponent({ children, tabName }) {
    if (curMainTab != tabName) {
      setCurMainTab(tabName)  
    }
    return children
  }

  return (
    <div>
      {user ?
        <Router>
          {showHeader && <Header curMainTab={curMainTab} setCurMainTab={setCurMainTab} />}
          <div className="app">
            <UserContext.Provider value={user}>
              <MainContextStore.Provider value={MainContextData}>
                <Switch>
                  {/* Route for home page */}
                  <Route exact path='/'><TabComponent tabName='home'><Feed /></TabComponent></Route>
                  <Route exact path='/home'>
                    <TabComponent tabName='home'><Feed /></TabComponent>
                  </Route>
                  {/* Route for user's own profile */}
                  <Route exact path='/profile'>
                    <TabComponent tabName='profile' ><Profile /></TabComponent>
                  </Route>
                  {/* Route for notification panel */}
                  <Route exact path='/notification'>
                    <TabComponent tabName='notification' ><Notification /></TabComponent>
                  </Route>
                  {/* Route for chat module */}
                  <Route exact path='/chat'>
                    <TabComponent tabName='chat' ><Chat /></TabComponent>
                  </Route>
                  {/* Route for uploading post and projects */}
                  <Route exact path='/upload'>
                    <TabComponent tabName='upload' ><UploadPost /></TabComponent>
                  </Route>
                  {/* Route for different user profiles awa self user */}
                  <Route exact path='/profile/:username'>
                    {props => { return props.match.params.username == user.user.username ? <TabComponent tabName='profile' ><Profile /></TabComponent> : <Profile username={props.match.params.username} /> }}
                  </Route>
                  {/* Route for Page not found 404 error */}
                  <Route><PageNotFound notShow={[setShowHeader]} /></Route>
                </Switch>
              </MainContextStore.Provider>
            </UserContext.Provider>
          </div>
        </Router>
        :
        <LoadingScreen />
      }
      {alertMessage && <AlertMessage message={alertMessage} setMessage={setAlertMessage} />}
    </div>
  );
}

export default App;
