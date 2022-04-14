import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user,setUser] = useState('');

  useEffect(()=>{
    const loggedInfo = localStorage.getItem('isLoggedIn');

    if(loggedInfo==='1'){
      setIsLoggedIn(true);
    }
  },[])
  const loginHandler = (user) => {
    setUser(user);
    localStorage.setItem('isLoggedIn','1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => { 
    localStorage.removeItem('isLoggedIn')
    setUser('')
    setIsLoggedIn(false);
  };

  return (
 
      <AuthContext.Provider 
      value={{
        isLoggedIn: isLoggedIn,
        onLogout:logoutHandler,
      }}>
      <MainHeader user={user}/>
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
      </AuthContext.Provider>

  );
}

export default App;
