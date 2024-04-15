import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
    <img src="../../img/marvel-logo.png" />
      <ul>
        <li>
          <Link to="">Home</Link>
        </li>
        <li>
          <Link to="/characters">Characters</Link>
        </li>
        <li>
          <Link to="/abilities">Abilities</Link>
        </li>
        <li>
          <Link to="/movies">Movies</Link>
        </li>
        <li>
          <Link to="/doc">Documentation</Link>
        </li>
        <li>
          <Link to="/author">Author</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
