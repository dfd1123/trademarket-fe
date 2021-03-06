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

export interface DepositRequestHistoryOutput {
  no: string;
  accountNo: string;
  dateTime: string;
  amount: string;
  stat: string;
  clientNo: string;
}

export interface WithdrawRequestHistoryOutput {
  no: string;
  accountNo: string;
  dateTime: string;
  amount: string;
  stat: string;
  etcInfo: string;
}

export interface SubmitRequestListDataOutput {
  no: string;
  requestSubject: string;
  stat: string;
  entryTime: string;
  answerTime: string;
}

export interface SubmitRequestDetailOutput {
  title: string;
  content: string;
  answerTitle: string;
  answerContent: string;
}
