import React from 'react';
import {Link, Outlet} from 'react-router-dom';


function Test1() {
  return (
    <div>
      <h1>TEST1</h1>
      <button>
        <Link to='/test2'>테스트2</Link>
      </button>
    </div>
  );
}

export default Test1;
