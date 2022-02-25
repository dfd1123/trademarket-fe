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
  //width: 100%;
  height: 8px;
  display: flex;
  justify-content: center;
  margin: 6px 1px 0 1px;
`;

const Dot = styled.div<{ color: string }>`
  height: 6px;
  width: 6px;
  border-radius: 3px;
  background-color: ${(props) => props.color};
  //padding: 1px;
  //margin: 0 1px 0 1px;
`;

export default TileContent;
