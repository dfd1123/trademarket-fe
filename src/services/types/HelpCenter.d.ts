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

export interface SubmitRequestData {
  no: number;
  stat: string;
  subject: string;
  entryTime: string;
  answerTime: string;
}

export interface SubmitRequestContentData {
  subject: string;
  content: string;
  entryTime: string;
  answerTime: string;
  answerSubject?: string;
  answerContent?: string;
}
