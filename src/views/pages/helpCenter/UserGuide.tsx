import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from '@/views/components/common/Sidebar';
import Accordion from '@/views/components/helpCenter/Accodian';

const UserGuide = () => {
  return (
    <UserGuideStyle>
      <Sidebar />
      <section className="userGuide-section">
        <h2>User Guides</h2>
        <Accordion title='title' desc={`Dolore ea eiusmod nisi laborum sit quis. Occaecat dolore Lorem magna dolore do velit adipisicing. Magna labore velit laboris ea quis voluptate. Irure quis sit cupidatat nulla officia.\n\n
Non elit incididunt tempor ad labore irure ipsum aliqua laboris velit irure. Cillum reprehenderit quis ut incididunt sit mollit Lorem magna.\nQuis reprehenderit ad ut cillum cillum Lorem laborum consequat veniam labore velit mollit anim. Ipsum non eu anim ea nulla pariatur labore eu ut ad. Proident officia aliquip sit magna et nulla incididunt dolor irure consectetur.`}></Accordion>
      </section>
    </UserGuideStyle>
  )
}

export default UserGuide;

const UserGuideStyle = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 48px 20px 48px 20px;
  display: flex;

  & h2 {
    margin-bottom: 24px;
    font-size: 24px;
    font-weight: 600;
  }

  .userGuide-section {
    width: 100%;
    height: 100%;
    padding: 0 80px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
`;