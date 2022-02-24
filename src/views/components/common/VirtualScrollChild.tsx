import React from 'react';
import { useInView } from 'react-intersection-observer';

interface PropTypes {
  children: React.ReactNode;
  className?: string;
}

function VirtualScrollChild({ children, className } : PropTypes) {
  const [ref, inView] = useInView();

  return <div ref={ref} className={className}>{inView ? children : null}</div>;
}

export default VirtualScrollChild;
