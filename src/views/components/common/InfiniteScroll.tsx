import { useEffect, useRef } from "react";

interface PropTypes {
    children: React.ReactNode;
    loading?: boolean;
    loadMore: () => void;
  }

const InfiniteScroll = ({children, loading, loadMore} : PropTypes) => {
    const pageEnd = useRef(null);

    useEffect(() => {
        if(pageEnd.current){
            const observer = new IntersectionObserver(
                (entries) => {
                  if (entries[0].isIntersecting) {
                    loadMore();
                  }
                },
                { threshold: 1 },
              );

              observer.observe(pageEnd.current);
        }
    }, [pageEnd])
    return (
        <>
            {children}
            <div ref={pageEnd}></div>
        </>
    );
}

export default InfiniteScroll;