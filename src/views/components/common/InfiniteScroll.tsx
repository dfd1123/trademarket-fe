import { useTypedSelector } from "@/store";
import { useEffect, useRef, useState } from "react";
import styled from 'styled-components';
interface PropTypes {
    children: React.ReactNode;
    loading?: boolean;
    loadMore: () => void;
  }

const InfiniteScroll = ({children, loading = false, loadMore} : PropTypes) => {
    const pageEnd = useRef(null);
    const [observer, setObserver] = useState<IntersectionObserver | null>(null);
    // const loading = useTypedSelector((state) => state.infoReducer.loading, (a,b) => a === b);

    useEffect(() : any => {
        if(pageEnd.current){
            const io = new IntersectionObserver(
                (entries) => {
                  const {top, height, target} = entries[0].boundingClientRect as any;
                  const canExcute = top + height >= window.innerHeight / 2;
                  if (canExcute && entries[0].isIntersecting) {
                    loadMore();
                  }
                },
                { threshold: 1 },
              );

              setObserver(io);

              observer && observer.observe(pageEnd.current);
        }

        return () => observer && observer.disconnect();
    }, [pageEnd.current, loadMore])
    return (
        <InfiniteScrollStyle>
            {children}
            <div ref={pageEnd} className="page-end"></div>
        </InfiniteScrollStyle>
    );
}

const InfiniteScrollStyle = styled.div`
  .page-end{ height: 1px; }
`;

export default InfiniteScroll;