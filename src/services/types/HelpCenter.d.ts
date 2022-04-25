export interface DepositRequestData {
  no: number;
  accountNo: string;
  dateTime: string;
  amount: number;
  state: string;
  clientNo: string;
}

export interface WithdrawRequestData {
  no: number;
  accountNo: string;
  dateTime: string;
  amount: number;
  state: string;
  etcInfo: string;
}
