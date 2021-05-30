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

export const UserContext = React.createContext({})


// cloudinary ID 'leyita8591@dvdoto.com'
// cloudinary pwd 'Yourpath1234#'


function App() {
  const [user, setUser] = useState(null)
  const tempUser = {
    user: {
      username: 'admin',
      first_name: 'Antariksh',
      last_name: 'Sisodiya',
    },
    profile: 'https://res.cloudinary.com/yourpath/image/upload/v1/media/user_profile_image/aksh_y3epw8'
  }
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/UserProfileModel')
      const result = await res.json()
      setUser(result[0])
    }
    fetchData()
  }, [])
  const [curMainTab, setCurMainTab] = useState('home')

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
          <Header curMainTab={curMainTab} setCurMainTab={setCurMainTab} />
          <Switch>
            <div className="app">
              <UserContext.Provider value={user ? user : tempUser}>
                <Route exact path='/'><TabComponent tabName='home'><Feed /></TabComponent></Route>
                <Route path='/home'>
                  <TabComponent tabName='home'><Feed /></TabComponent>
                </Route>
                <Route exact path='/profile'>
                  <TabComponent tabName='profile' ><Profile /></TabComponent>
                </Route>
                <Route path='/notification'>
                  <TabComponent tabName='notification' ><Notification /></TabComponent>
                </Route>
                <Route path='/chat'>
                  <TabComponent tabName='chat' ><Chat /></TabComponent>
                </Route>
                <Route path='/upload'>
                  <TabComponent tabName='upload' ><UploadPost /></TabComponent>
                </Route>
              </UserContext.Provider>
            </div>
          </Switch>
        </Router>
        :
        <LoadingScreen />
      }
    </div>
  );
}

export default App;
