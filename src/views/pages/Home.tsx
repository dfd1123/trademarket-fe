import React from 'react';
import {Link, Outlet} from 'react-router-dom';


function Home() {
  return (
    <div>
      <h1>Home</h1>
      <button>
        <Link to='/test1'>테스트1</Link>
      </button>
    </div>
  );
}

export default Home;
