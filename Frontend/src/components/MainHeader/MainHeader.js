import React from 'react';

import Navigation from './Navigation';
import classes from './MainHeader.module.css';

const MainHeader = (props) => {

  return (
    <header className={classes['main-header']}>
      <h1>BookStore</h1>
      <Navigation user={props.user}/>
    </header>
  );
};

export default MainHeader;
