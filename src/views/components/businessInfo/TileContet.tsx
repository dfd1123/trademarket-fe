import styled from 'styled-components';

interface PropsType {
  dotColor?: string;
}

const TileContent = ({ dotColor }: PropsType) => {
  return (
    <TileContentContainer className="tile">
      <Dot color={dotColor} />
    </TileContentContainer>
  );
};

const TileContentContainer = styled.div`
  width: 10px;
  height: 8px;
  display: flex;
  justify-content: center;
  //margin: 6px 2px 0 2px;
`;

const Dot = styled.div<{ color: string }>`
  height: 6px;
  width: 6px;
  border-radius: 3px;
  background-color: ${(props) => props.color};
`;

export default TileContent;
