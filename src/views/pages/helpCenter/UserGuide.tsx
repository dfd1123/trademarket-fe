import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "@/views/components/common/Sidebar";
import Accordion from "@/views/components/helpCenter/Accodian";
import HelpCenterLayout from "@/views/components/helpCenter/HelpCenterLayout";

const accodianDesc = `How to solve it when you deposit a coin but you can't see it


            Basically, all coins have an average amount of time for deposit/withdrawal depending on the network for each coin.

            Bitcoin(BTC) : About 30 minutes to 1 hour.
            Tether(USDT : ERC20) : About 15 to 30 minutes.
            (It is not available to Korea Exchange and it can only be deposited/withdrawed to overseas exchanges.)

            Ripple(XRP) : About 5 to 15 minutes.
            ETH(Ethereum) : About 5 to 15 minutes.

            If you deposit it to DAOBIT on the exchange you use, but the deposit is not confirmed, enter the menu (My wallet → account information) on the screen below and click the ‘Wallet Update’ button next to ‘My Asset’ to mark the deposit in My Wallet History.`;

const UserGuide = () => {
  return (
    <HelpCenterLayout title="User Guides">
      {
        <UserGuidesStyle>
          <Accordion
            title="How to solve it when you deposit a coin but you can't see it"
            desc={accodianDesc}
          />
          <Accordion title="title" desc={accodianDesc} />
          <Accordion title="title" desc={accodianDesc} />
          <Accordion title="title" desc={accodianDesc} />
          <Accordion title="title" desc={accodianDesc} />
          <Accordion title="title" desc={accodianDesc} />
          <Accordion title="title" desc={accodianDesc} />
          <Accordion title="title" desc={accodianDesc} />
          <Accordion title="title" desc={accodianDesc} />
          <Accordion title="title" desc={accodianDesc} />
          <Accordion title="title" desc={accodianDesc} />
        </UserGuidesStyle>
      }
    </HelpCenterLayout>
  );
};

export default UserGuide;

const UserGuidesStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
