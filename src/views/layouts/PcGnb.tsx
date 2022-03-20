import { Link } from 'react-router-dom';
import gnbList from '@/data/gnbList';
import styled, { DefaultTheme } from 'styled-components';
import Gnb from '@/views/layouts/Gnb';
import { TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';

function PcGnb({ theme }: { theme: DefaultTheme }) {
  return (
    <StyledPcGnb className="gnb-cont">
      <Gnb className="pc-gnb" />
    </StyledPcGnb>
  );
}

const StyledPcGnb = styled.div`
  .pc-gnb {
    display: flex;
    align-items: center;
    padding: 0 170px;
    padding-right: 400px;
    > li {
      position: relative;
      display: flex;
      align-items: center;
      height: 74px;
      margin: 0 22px;
      font-size: 16px;
      color: ${(props) => props.theme.header.color};
      cursor: pointer;

      .react-ripples {
        display:block !important;
        padding: 10px 5px;
        > a {
          color: inherit;
          ${(props) =>
            props.theme.name === 'dark'
              ? 'text-shadow: 0 0 3px rgba(0, 0, 0, 0.7)'
              : ''};
        }
        .arrow{
          display:none;
        }
      }

      &.drop {
        &::after {
          content: '▾';
          margin-left: 10px;
          font-size: inherit;
          color: inherit;
          ${(props) =>
            props.theme.name === 'dark'
              ? 'text-shadow: 0 0 3px rgba(0, 0, 0, 0.7)'
              : ''};
        }

        &.wallet {
          .drop-menu {
            left: -67px;
          }
        }
        &.history {
          .drop-menu {
            left: -40px;
            width: 210px;
          }
        }
        &.support {
          .drop-menu {
            left: -58px;
          }
        }
      }

      &:hover {
        .drop-menu {
          max-height: 150px;
        }
      }

      .drop-menu {
        position: absolute;
        top: 70px;
        left: 0;
        z-index: 1;
        overflow: hidden;
        min-width: 200px;
        max-height: 0;
        background-color: rgb(47, 76, 104);
        transition: max-height 0.2s;

        > ul {
          padding: 10px 0;
          > li {
            padding: 6px 15px;
            > a {
              font-size: 16px;
              color:#fff;
              line-height: 19px;
            }

            &:hover{
              background-color: rgba(0, 0, 0, 0.04);
            }
          }
        }
      }
    }

    @media (max-width: ${TABLET_SIZE}) {
      display: none;
    }
  }
`;

export default PcGnb;
