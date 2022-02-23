import styled from 'styled-components';

const OfficeNumber = () => {
  return (
    <OfficeNumberStyle>
      <span>KMF 사무국 연락처</span>
      <strong>02-999-9999</strong>
    </OfficeNumberStyle>
  );
};

const OfficeNumberStyle = styled.div`
  margin-top: -1px;
  margin-bottom: -1px;
  padding: 12px;
  text-align: center;
  background-color: #f4f4f4;
  span {
    font-size: 12px;
    color: #000;
  }
  strong {
    display: block;
    margin-top: 8px;
    font-size: 19px;
    color: #000;
  }
`;

export default OfficeNumber;
