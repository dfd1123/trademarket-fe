export interface GnbMenuType {
    id: string;
    name: string;
    path: string;
    on?: boolean;
    children?: GnbMenuType[];
}

let gnbList : GnbMenuType[] = [
  { id: "trade", name: "Feature Trade", path: "/trade" },
  {
    id: "wallet",
    name: "Wallet",
    path: "",
    on: false,
    children: [
      { id: "myAsset", name: "My Asset", path: "/" },
      { id: "walletHistory", name: "History", path: "/" },
      { id: "walletConvert", name: "Convert", path: "/" },
      { id: "depositWithdraw", name: "Deposit / Withdraw", path: "/" },
    ],
  },
  {
    id: "history",
    name: "Trade History",
    path: "",
    on: false,
    children: [
      { id: "excutionList", name: "Excution List", path: "/" },
      { id: "oeDetail", name: "Order/Execution Detail", path: "/" },
      { id: "ceList", name: "Close Execution List", path: "/" },
    ],
  },
  {
    id: "helpCenter",
    name: "Help Center",
    path: "",
    on: false,
    children: [
      { id: 'deposit', name: 'Deposit', path:'/deposit' },
      { id: 'widthraw', name: 'Widthraw', path:'/withdraw' },
      { id: 'submitRequest', name: 'Submit Request', path:'/submit-request' },
      { id: "userGuide", name: "User Guide", path: "/user-guide" },
    ],
  },
];

export default gnbList;