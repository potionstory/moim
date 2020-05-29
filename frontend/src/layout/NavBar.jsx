import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <Link to="/">home</Link>
      <Link to="/signin">signin</Link>
      <Link to="/signup">signup</Link>
    </div>
  );
};

export default NavBar;
