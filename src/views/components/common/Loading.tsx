import styled from 'styled-components';
import CircleLoading from '@/views/components/common/CircleLoading';

interface PropsType {
    scale?: number;
    loading?: boolean;
  }

const Loading = ({scale, loading} : PropsType) => {
    return (
        <LoadingStyle className={`${loading ? 'active' : ''}`} scale={scale}>
            <div>
                <CircleLoading scale={scale} />
            </div>
        </LoadingStyle>
    );
}

const LoadingStyle = styled.div<{scale?:number}>`
    position:fixed;
    top:0;
    left:0;
    z-index: 100;
    width:100%;
    text-align:center;
    transform: translateY(-32px);
    transition: transform 0.25s;

    &.active{
        transform: translateY(30px);
    }

    >div{
        display:inline-block;
        padding: 3px;
        border-radius: 50%;
        box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
        transform: scale(${(props) => props.scale});
    }
`;

export default Loading;