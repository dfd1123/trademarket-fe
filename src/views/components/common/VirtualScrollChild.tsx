import React from 'react';
import { useInView } from 'react-intersection-observer';

interface PropTypes {
  children: React.ReactNode;
}

function VirtualScrollChild({ children }: PropTypes) {
  const [ref, inView] = useInView();

  return <div ref={ref}>{inView ? children : null}</div>;
}

export default VirtualScrollChild;
