import React from "react";
import styled from "styled-components";
import SelectBox from "../common/input/SelectBox";

const ControlPanel = () => {
    return (
        <ControlPanelStyle>
            <h2 className="tit">MY WALLET</h2>
            <div className="control-box">
                <SelectBox list={} />
            </div>
        </ControlPanelStyle>
    );
}

const ControlPanelStyle = styled.div`
    max-width: 1180px;
    margin:70px auto 0;
    .tit{ 
        margin-bottom:30px;
        font-size: 34px;
        font-weight: bold;
        color:#fff;
        line-height: 46px;
        letter-spacing: -1px;
    }
    .control-box{
        padding:10px 20px;
        background-color: #415a72;
        border-radius: 4px;
    }
`;

export default ControlPanel;