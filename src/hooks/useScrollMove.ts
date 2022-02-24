import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Link, useLocation } from "react-router-dom";
import _debounce from 'lodash/debounce';

interface PropsType {
    page: string;
    path: string;
    dom?: any;
}

const useScrollMove = ({ page, path, dom } : PropsType) => {
  const location = useLocation();
  const scrollY = useRef(Number(localStorage.getItem(`${page}_scroll_pos`)));

  const scrollRemove = useCallback(() => {
    scrollY.current = 0;
    localStorage.removeItem(`${page}_scroll_pos`);
  }, []);
  
  const saveScroll = _debounce(function() {
    scrollY.current = window.scrollY;
  }, 100)

  useEffect(() => {
      window.addEventListener('scroll', saveScroll);
    return () => {
        window.removeEventListener('scroll', saveScroll);
        localStorage.setItem(`${page}_scroll_pos`, String(scrollY.current));
    };
  }, []);

  return { scrollInfos: scrollY.current, scrollRemove };
};

export default useScrollMove;