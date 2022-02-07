import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import {BasicButton} from '@/views/components/common/Button';

function Home() {
  return (
    <div>
      <h1>LOGIN</h1>
      <BasicButton>
        <Link to='/test1'>테스트1</Link>
      </BasicButton>
    </div>
  );
}

export default Home;
