import React, { useState, useRef } from "react";
import styled from "styled-components";

interface PropsType {
  title: string;
  desc: string;
}

const Accordion = ({ title, desc }: PropsType) => {
  const [fold, setFold] = useState(true);
  const [rotate, setRotate] = useState("0");
  const containerRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  const onClick = () => {
    if (descRef.current && containerRef.current) {
      descRef.current.classList.contains("collapsed")
        ? descRef.current.classList.remove("collapsed")
        : descRef.current.classList.add("collapsed");
      containerRef.current.classList.contains("container-collapsed")
        ? containerRef.current.classList.remove("container-collapsed")
        : containerRef.current.classList.add("container-collapsed");
      rotate !== "0" ? setRotate("0") : setRotate("180");
      setFold(!fold);
    }
  };

  return (
    <AccordionContainerStyle
      ref={containerRef}
      style={{ border: `${fold ? "1px solid #dddddd" : "1px solid #ffab2e"}` }}
    >
      <div className="accordion-titleWrapper" onClick={() => onClick()}>
        <div className="accordion-title">{title}</div>
        <svg
          className="accordion-svg"
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
          width="14"
          transform={`rotate(${rotate})`}
        >
          <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
        </svg>
      </div>
      <div
        ref={descRef}
        className="accordion-desc collapsed"
        dangerouslySetInnerHTML={{ __html: desc }}
      />
    </AccordionContainerStyle>
  );
};

export default Accordion;

const AccordionContainerStyle = styled.div`
  max-width: 960px;
  height: auto;
  padding: 12px 12px;
  border-radius: 5px;
  font-size: 16px;
  line-height: 22px;
  transition: all 0.1s linear;
  display: flex;
  flex-direction: column;

  .accordion-titleWrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .accordion-title {
      color: #606060;
      display: flex;
    }

    .accordion-svg {
      transition: all 0.2s linear;
    }
  }

  .accordion-desc {
    height: auto;
    overflow: hidden;
    margin: 14px 0 4px 0;
    font-size: 16px;
    line-height: 22px;
    transition: all 0.1s linear;
    color: #b0b0b0;
  }

  .collapsed {
    height: 0;
    margin: 0;
  }
`;
