import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "@/views/components/helpCenter/Sidebar";
import Accordion from "@/views/components/helpCenter/Accodian";
import HelpCenterLayout from "@/views/components/helpCenter/HelpCenterLayout";

const userGuideTexts = [
  {
    title: "How to solve it when you deposit a coin but you can't see it",
    desc: `How to solve it when you deposit a coin but you can't see it


Basically, all coins have an average amount of time for deposit/withdrawal depending on the network for each coin.

Bitcoin(BTC) : About 30 minutes to 1 hour.
Tether(USDT : ERC20) : About 15 to 30 minutes.
(It is not available to Korea Exchange and it can only be deposited/withdrawed to overseas exchanges.)

Ripple(XRP) : About 5 to 15 minutes.
ETH(Ethereum) : About 5 to 15 minutes.

If you deposit it to DAOBIT on the exchange you use, but the deposit is not confirmed, enter the menu (My wallet → account information) on the screen below and click the ‘Wallet Update’ button next to ‘My Asset’ to mark the deposit in My Wallet History.`,
  },
  {
    title: "Coin Convert( Fiat and Spot ↔ Futures)",
    desc: `Coin Convert( Fiat and Spot ↔ Futures)

DAOBIT manages fiat and spot wallets and futures wallets separately to protect members' assets.
If you make a deposit, you have coins in your fiat and spot wallet.

You have to exchange the coins you have for USDT and then move them to the futures wallet to trade futures.
Conversely, when withdrawing money, you must first make move your coin from the futures wallet to the spot wallet.

In the menu for my wallet, you can go into spot wallet ↔ futures wallet.
If you want to deposit and trade futures, select the From part as legal currency and spot / To part as a USD-M futures.

Lastly, please fill out the quantity you want to switch and proceed with the conversion.
When withdrawing, you can replace the From part with the USD-M gift/To part with legal currency and spot.`,
  },
  {
    title: "Coin exchange",
    desc: `Coin exchange

“Coin exchange” is a function of changing the type of coin you have to another type.
This function is also a preliminary work to change to USDT for futures trading.
It is also used as a function to withdraw your coin.


You go to the menu (My wallet- Coin exchange)
If the coin you have is, for example, BTC, select BTC in the coin type selection of the left column, specify the amount to be converted, and press Exchange.

On the contrary, if you exchange it for withdrawal after completing the futures trading, you can proceed in reverse order.`,
  },
  {
    title: "How to withdraw coins.",
    desc: `How to withdraw coins.

If you enter my wallet in the menu, you will see a screen below.
There are four withdrawable coins: Bitcoin (BTC), Tether (USDT), XRP (Ripple), and ETH(Ethereum).
However, in the case of USDT, withdrawal to the Korea Exchange is not possible because the Korea Exchange does not support deposit and withdrawal for USDT.
The screen below is an example of Ripple withdrawal.

For example, if you press the withdrawal button to the right of the XRP,
the Ripple Address field and Destination Tag field to be withdrawn will appear.
You can accurately copy and fill out the ripple wallet address and destination tag address of the exchange you will receive coin at the place of entry and then, proceed with the withdrawal processing application.

Basically, the transmission time of all coins varies somewhat depending on the network of each coin.
Bitcoin(BTC) : About 30 minutes to 1 hour.
Tether(USDT : ERC20) : About 15 to 30 minutes. (Only available on overseas exchanges.)
Ripple(XRP) : About 5 to 15 minutes.
ETH(Ethereum) : About 5 to 15 minutes.`,
  },
  {
    title: "How to Deposit coins.",
    desc: `How to deposit coins.
If you enter my wallet in the menu, you will see a screen below.
There are four depositable coins: Bitcoin (BTC), Tether (USDT), XRP (Ripple), and ETH(Ethereum).
The screen below is an example of Ripple withdrawal.

For example, if you press the deposit button to the right of the XRP,
the Ripple Address field and Destination Tag field to be withdrawn will appear.

You can accurately copy and fill out the ripple wallet address and destination tag address of the exchange you want to withdraw coin at the place of entry and then, proceed with the deposit processing application.

Basically, the transmission time of all coins varies somewhat depending on the network of each coin.

Bitcoin(BTC) : About 30 minutes to 1 hour.
Tether(USDT : ERC20) : About 15 to 30 minutes. (Only available on overseas exchanges.)
Ripple(XRP) : About 5 to 15 minutes.
ETH(Ethereum) : About 5 to 15 minutes.`,
  },
  {
    title: "USDT indefinitely risk limits",
    desc: `USDT indefinitely risk limits\\n

Risk limits uses the concept of Dynamic Leverage.
The maximum leverage available during the transaction varies depending on the trader's position value.
The larger the position value, the higher the ratio of the required initial margin and the lower the leverage available.

Each transaction has a unique maintenance margin base rate, and the risk of increasing or decreasing the margin is also adjusted.
(Reminder: The baseline of the indefinite contract maintenance margin ratio is 0.5% BTC, 1% ETH & XRP, and it changes according to the risk change.)

Risk limits are risk management mechanisms that limit the risk of a trader's position.
If the price fluctuations are severe, traders in a single high leverage position can suffer great losses.

By adjusting the risk limit, risk management is optimized to protect all traders from taking separate risks.
Each contract has a risk reference value and an increase value.

By combining the reference value and the evidence value of the maintenance margin and the initial margin, the position's demand for margin can be calculated.
As the position increases, the demand for maintenance margin and initial margin increases.
As the user changes the leverage, the required initial and maintenance margin also change.`,
  },
  {
    title: "Bankruptcy price calculation formula",
    desc: `Bankruptcy price calculation formula

“Bankruptcy price" means that you have lost all of the initial margin of your position at that price.

If forced liquidation is triggered, the liquidated position will be included in the margin in advance as the transaction fee will be calculated at the bankruptcy price.


※ Bankruptcy price calculation formula\\n
Bankruptcy price = Entry price X quantity X (1-1/leverage) X market price commission rate`,
  },
  {
    title: "Compulsory liquidation isolation/cross calculation formula",
    desc: `Compulsory liquidation isolation/cross calculation formula

1. Compulsory liquidation calculation formula in isolation mode

Long isolated liquidation formula = entry price X (1 - 1/ leverage + maintenance margin rate)

Short isolated liquidation formula = entry price X (1 + 1/ leverage - maintenance margin rate)

2. Compulsory liquidation calculation formula in cross mode

Long cross liquidation formula
= entry price – [Deposits for future transaction + entry price X quantity X (1/ leverage - maintenance margin rate)] / quantity

- Short cross liquidation formula
= entry price + [Deposits for future transaction + entry price X quantity X (1/ leverage - maintenance margin rate)] / quantity`,
  },
  {
    title:
      "How to calculate the position margin for an indefinite transaction.(USDT)",
    desc: `How to calculate the position margin for an indefinite transaction.(USDT)

1. Position Margin

The position margin is the total margin required to open a new position.
This is the sum of the estimated initial margin and the estimated fee incurred when opening and closing the position.
Traders can see the cost of opening their positions on the transaction screen in advance.

2. How to calculate the position margin

Initial margin+ bankruptcy price fee (Liquidation fee) + maintenance margin

* Initial margin : entry price X quantity / leverage
* Maintenance margin : entry price X quantity X maintenance margin rate
* Bankruptcy price fee : : entry price X quantity X (1-1/ leverage) X market price fee`,
  },
  {
    title:
      "Indefinite transaction profit and loss calculation/yield calculation",
    desc: `Indefinite transaction profit and loss calculation/yield(%) calculation

1. Unrealized profit and loss calculation formula

Long unrealized profit and loss calculation formula = quantity X (current market price – entry price)

Short unrealized profit and loss calculation formula = quantity X (entry price - current market price)

EX) Traders have entered $10,000 in margin buying(Long) of 50 times leverage and 1 BTC, and the current market price is $10100.


Long unrealized profit and loss calculation

1 BTC X (10100 – 10000) = 100 USDT


2. Unrealized yield(%) calculation formula

quantity X (current market price – entry price) / position margin X 100

EX) Traders have entered $10,000 in margin buying(Long) of 50 times leverage and 1 BTC, and the current market price is $10100.

Unrealized yield(%) calculation

1 BTC X (10100 – 10000) / 200 X 100 = 50%`,
  },
  {
    title: "Transaction Fee",
    desc: `When entering code
Limit 0.02% Market Price 0.03%

When no code is entered
The limit price is 0.04% and the market price 0.06%`,
  },
];

const UserGuide = () => {
  const breakLine = (line: string) =>
    line ? (
      line
        .trim()
        .split("\n")
        .map((item) => (
          <span>
            {item}
            <br />
          </span>
        ))
    ) : (
      <span></span>
    );

  return (
    <HelpCenterLayout title="User Guides">
      {
        <UserGuidesStyle>
          {userGuideTexts.map((item, index) => {
            return <Accordion title={item.title} desc={breakLine(item.desc)} />;
          })}
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
