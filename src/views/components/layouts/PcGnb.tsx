import React from "react";
import { Link } from "react-router-dom";
import gnbList from "@/data/gnbList";
import styled, { DefaultTheme } from "styled-components";
import { TABLET_SIZE } from "@/assets/styles/responsiveBreakPoint";

function PcGnb({ theme }: { theme: DefaultTheme }) {
  return (
    <StyledPcGnb className="gnb-cont">
      {gnbList.map((mainGnb) => {
        return (
          <li className={(!mainGnb.path ? "drop " : " ") + mainGnb.id} key={`main-gnb-${mainGnb.name}`}>
            {mainGnb.path ? (
              <Link to={mainGnb.path}>{mainGnb.name}</Link>
            ) : (
              <a>{mainGnb.name}</a>
            )}
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
              ""
            )}
          </li>
        );
      })}
    </StyledPcGnb>
  );
}

const StyledPcGnb = styled.ul`
  display: flex;
  align-items: center;
  padding: 0 170px;
  > li {
    position: relative;
    display: flex;
    align-items: center;
    height: 74px;
    margin: 0 35px;
    font-size: 18px;
    color: ${(props) => props.theme.header.color};
    cursor: pointer;
    > a {
      color: inherit;
      ${(props) =>
        props.theme.name === "dark"
          ? "text-shadow: 0 0 3px rgba(0, 0, 0, 0.7)"
          : ""};
    }

    &.drop {
      &::after {
        content: "▾";
        margin-left: 10px;
        font-size: inherit;
        color: inherit;
        ${(props) =>
          props.theme.name === "dark"
            ? "text-shadow: 0 0 3px rgba(0, 0, 0, 0.7)"
            : ""};
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
        padding: 10px;
        > li {
          padding: 6px 5px;
          > a {
            font-size: 16px;
            line-height: 19px;
          }
        }
      }
    }
  }

  @media (max-width: ${TABLET_SIZE}){
      display:none;
  }
`;

export default PcGnb;
