import './App.css';
import Header from './components/Header'
import Feed from './components/Feed'
import React,{useState} from 'react'
import Profile from './profile/Profile'
import Notification from './notification/Notfications'
import Chat from './chat/Chat'

export const UserContext = React.createContext({})
export const UrlAddress = React.createContext(null)


// cloudinary ID 'leyita8591@dvdoto.com'
// cloudinary pwd 'Yourpath1234#'


function App() {
  const [user, setUser] = useState({
    username: "aksh_sisodiya",
    full_name: "Antariksh Sisodiya",
    profile: "https://media-exp1.licdn.com/dms/image/C5603AQFJz8FiY3lWXA/profile-displayphoto-shrink_800_800/0/1609861395191?e=1624492800&v=beta&t=I8KhD_rYunJydi6GxUk4P2PvKAQL5CikJh4_rQGI6cI",
    link: "/",
    cover: "https://media-exp1.licdn.com/dms/image/C4E16AQFMMha-0_F-aQ/profile-displaybackgroundimage-shrink_200_800/0/1609328577420?e=1624492800&v=beta&t=jrR0b2g9BGg2fQ9gRp0D_tqwSCS_8oVPzHual0khjJc",
    api:'https://yourpath-django.heroku.com/'
  })

  const [curMainTab, setCurMainTab] = useState('home')
  // const url = 'https://yourpath-django.heroku.com/'
  const url = 'http://127.0.0.1:8000/'

  return (
    <div className="app">
      <Header curMainTab={curMainTab} setCurMainTab={setCurMainTab} />
      <UrlAddress.Provider value={url}>
      <UserContext.Provider value={user}>        
      { curMainTab=='home' && <Feed />}
      { curMainTab=='profile' && <Profile />}
      { curMainTab=='notification' && <Notification />}
      { curMainTab=='chat' && <Chat />}
    </UserContext.Provider>
      </UrlAddress.Provider>
    </div>
  );
}

export default App;
