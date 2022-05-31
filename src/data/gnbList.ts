export interface GnbMenuType {
  id: string;
  name: string;
  path: string;
  on?: boolean;
  children?: GnbMenuType[];
}

let gnbList: GnbMenuType[] = [
  { id: "trade", name: "Futures Trade", path: "/trade" },
  {
    id: "wallet",
    name: "Wallet",
    path: "",
    on: false,
    children: [
      { id: "myAsset", name: "My Asset", path: "/wallet/asset" },
      { id: "walletHistory", name: "History", path: "/wallet/history" },
      { id: "walletConvert", name: "Convert", path: "/wallet/convert" },
      { id: "depositWithdraw", name: "Deposit / Withdraw", path: "/wallet/depositWithdraw" },
      { id: "futureTrade", name: "Future Trade", path: "/wallet/future-trade" },
    ],
  },
  {
    id: "history",
    name: "Trade History",
    path: "",
    on: false,
    children: [
      { id: "excutionList", name: "Excution List", path: "/history/execution-list" },
      { id: "oeDetail", name: "Order/Execution Detail", path: "/history/order-execution-list" },
      { id: "ceList", name: "Close Execution List", path: "/history/close-execution-list" },
    ],
  },
  {
    id: "helpCenter",
    name: "Help Center",
    path: "",
    on: false,
    children: [
      { id: "deposit", name: "Deposit", path: "/deposit" },
      { id: "withdraw", name: "Withdraw", path: "/withdraw" },
      { id: "submitRequest", name: "Submit Request", path: "/submit-request" },
      { id: "userGuide", name: "User Guide", path: "/user-guide" },
    ],
  },
];

export default gnbList;
