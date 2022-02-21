import { useEffect, useRef, useState } from "react";

interface PropTypes {
    children: React.ReactNode;
    loading?: boolean;
    loadMore: () => void;
  }

const InfiniteScroll = ({children, loading, loadMore} : PropTypes) => {
    const pageEnd = useRef(null);
    const [observer, setObserver] = useState<IntersectionObserver | null>(null);

    useEffect(() : any => {
        if(pageEnd.current){
            const io = new IntersectionObserver(
                (entries) => {
                  if (entries[0].isIntersecting) {
                    loadMore();
                  }
                },
                { threshold: 1 },
              );

              setObserver(io);

              observer && observer.observe(pageEnd.current);
        }

        return () => observer && observer.disconnect();
    }, [pageEnd])
    return (
        <>
            {children}
            <div ref={pageEnd}></div>
        </>
    );
}

export default InfiniteScroll;