import { useEffect, useState, useCallback } from 'react';
import gnbList, { GnbMenuType } from '@/data/gnbList';
import { Link } from 'react-router-dom';
import Ripples from 'react-ripples';

const Gnb = ({ className }: { className: string }) => {
  const [mobileGnbList, setMobileGnbList] = useState<GnbMenuType[]>(gnbList);
  const toggleMenu = useCallback(
    (index: number) => {
      if (className !== 'mobile-gnb') return;
      const changeGnbList = mobileGnbList;
      if (!changeGnbList[index].children) return;
      changeGnbList[index].on = !changeGnbList[index].on;

      setMobileGnbList([...changeGnbList]);
    },
    [mobileGnbList]
  );

  useEffect(() => {
    setMobileGnbList(gnbList);
  }, [className]);

  return (
    <ul className={`gnb-menu ${className}`}>
      {mobileGnbList.map((mainGnb, index) => {
        return (
          <li
            className={`${!mainGnb.path ? 'drop' : ''} ${
              mainGnb.on ? 'on' : ''
            } ${mainGnb.id} `}
            key={`main-gnb-${mainGnb.name}`}
          >
            <Ripples
              color="rgba(255,255,255,0.3)"
              during={1200}
              onClick={() => toggleMenu(index)}
            >
              {mainGnb.path ? (
                <Link to={mainGnb.path}>{mainGnb.name}</Link>
              ) : (
                <>
                  <a>{mainGnb.name}</a>
                  <svg
                    className="arrow"
                    focusable="false"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    fill="#fff"
                  >
                    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                  </svg>
                </>
              )}
            </Ripples>
            {mainGnb.children ? (
              <div className="drop-menu">
                <ul>
                  {mainGnb.children.map((subGnb) => {
                    return (
                      <li key={`drop-menu-${subGnb.name}`}>
                        <Link to={subGnb.path}>{subGnb.name}</Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              ''
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Gnb;
