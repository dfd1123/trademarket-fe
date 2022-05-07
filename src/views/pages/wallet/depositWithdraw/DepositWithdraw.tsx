import React, { useState } from "react";
import styled from "styled-components";
import Tab from '@/views/components/common/tab/Tab';

const DepositWithdraw = () => {
    const [tabIndex, setTabIndex] = useState(0);
    
    return (
        <DepositWithdrawStyle>
            <h4 className="sub-tit">Deposit / Withdraw</h4>
            <Tab
        list={['Deposit', 'Withdraw']}
        ripple={false}
        onChange={setTabIndex}
      />
        </DepositWithdrawStyle>
    );
}

const DepositWithdrawStyle = styled.div`

`;

export default DepositWithdraw;