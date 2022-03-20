import React, { useEffect, useRef } from "react";
import styled from 'styled-components';

interface PropsType {
  children: React.ReactNode;
  onOutsideClick: () => void;
}

const OutsideClickHandler = ({ children, onOutsideClick }: PropsType) => {
    const ref = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleClickOutside = (event: any) => {
          if (ref.current && !ref.current.contains(event.target)) {
            onOutsideClick && onOutsideClick();
          }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, [ onOutsideClick ]);

  return <OutsideClickHandlerStyle ref={ref}>{children}</OutsideClickHandlerStyle>;
};

const OutsideClickHandlerStyle = styled.div`
    display: contents;
`;

export default OutsideClickHandler;
