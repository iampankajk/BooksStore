import React, { useState, useEffect } from 'react';
import classes from './App.module.css'
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';
import Search from './components/SearchPage/Search';
import Card from './components/UI/Card/Card';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [book, setBook] = useState('');

  useEffect(() => {
    const loggedInfo = localStorage.getItem('isLoggedIn');

    if (loggedInfo === '1') {
      setIsLoggedIn(true);
    }
  }, [])
  const loginHandler = (user) => {
    setUser(user);
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn')
    setUser('')
    setIsLoggedIn(false);
  };

  const itemHandler = (item) => {
    let book = item.volumeInfo;
    let bookItem = <Card>
      <div className={classes.book_card}>
        <div>
          <img src={book.imageLinks.thumbnail}></img>
        </div>
        <div>
          <div className={classes.book_card}>
            <h3>{book.title}</h3>
            <h5>{book.subtitle}</h5>
          </div>
          <h4>{book.authors.map(author => <span>{author}</span>)}</h4>
          <p><span>{book.publisher}, </span>
            <span>{book.publishedDate}, </span>
            {book.categories.map(categorie => <span>{categorie}</span>)}
          </p>
          <p>{book.description}</p>
        </div>
      </div>
    </Card>

    setBook(bookItem);
  }

  return (

    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
      }}>
      <MainHeader user={user} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
        {isLoggedIn && <Search onSelect={itemHandler} />}
        {isLoggedIn && book}
      </main>
    </AuthContext.Provider>

  );
}

export default App;
