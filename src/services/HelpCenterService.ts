import { useContext, useEffect, useState } from "react";
import { ConstructorParamsType } from "./types/Service";
import { TransactionInputType } from "@/types/TransactionType";
import useAsyncData from "@/hooks/useAsyncData";
import { useTypedSelector } from "@/store";
import {
  DepositRequestHistoryOutput,
  SubmitRequestListDataOutput,
  WithdrawRequestHistoryOutput,
} from "@/services/types/HelpCenter";
import { dateFormat } from "@/utils/dateUtils";
import useUserData from "@/hooks/useUserData";

class HelpCenterService {
  #ws;
  #cookie;
  #dispatch;
  #toast;

  constructor({ ws, cookie, dispatch, toast }) {
    this.#ws = ws;
    this.#cookie = cookie;
    this.#dispatch = dispatch;
    this.#toast = toast;
  }

  getDepositHistory() {
    const depositRequestData = useTypedSelector(
      (state) => state.asyncData["t2313"]
    );

    const { email, szAccNo } = useUserData();

    const depositInput: TransactionInputType = {
      Header: {
        function: "D",
        termtype: "HTS",
        trcode: "t2313",
      },
      Input1: { email: email, szAccNo: szAccNo },
    };

    const { fetchData } = useAsyncData(depositInput);

    const getDepositHistory = () => {
      depositInput.Input1 = {
        nDate: dateFormat(new Date()),
        fMoney: "",
        szStaffID: "",
        szStaffPwd: "",
        szMemo: "",
      };

      fetchData({ ...depositInput });
    };

    const parseDepositData = (data: DepositRequestHistoryOutput[]) => {
      return data.map((item, index) => {
        return {
          no: item[10],
          accountNo: item[6],
          dateTime: item[0],
          amount: item[2],
          stat: item[11].trim(),
          clientNo: item[9],
        };
      });
    };

    return {
      deposit: parseDepositData(
        depositRequestData?.Output2 ? depositRequestData.Output2 : []
      ),

      getDepositHistory,
    };
  }

  getWithdrawHistory() {
    const withdrawRequestData = useTypedSelector(
      (state) => state.asyncData["t2413"]
    );
    const { email, szAccNo } = useUserData();

    const withdrawInput: TransactionInputType = {
      Header: {
        function: "D",
        termtype: "HTS",
        trcode: "t2413",
      },
      Input1: { email: email, szAccNo: szAccNo },
    };

    const { fetchData } = useAsyncData(withdrawInput);

    const getWithdrawHistory = () => {
      withdrawInput.Input1 = {
        nDate: dateFormat(new Date()),
        fMoney: "",
        szStaffID: "",
        szStaffPwd: "",
        szMemo: "",
      };

      fetchData({ ...withdrawInput });
    };

    const parseWithdrawData = (data: WithdrawRequestHistoryOutput[]) => {
      return data.map((item, index) => {
        return {
          no: item[6],
          accountNo: item[5],
          dateTime: item[0],
          amount: item[1],
          stat: item[8].trim(),
          etcInfo: item[4],
        };
      });
    };

    return {
      withdraw: parseWithdrawData(
        withdrawRequestData?.Output2 ? withdrawRequestData.Output2 : []
      ),
      getWithdrawHistory,
    };
  }

  getSubmitRequestData() {
    const submitRequestListData = useTypedSelector(
      (state) => state.asyncData["t2511"]
    );
    const submitRequestDetail = useTypedSelector(
      (state) => state.asyncData["t2713"]
    );
    const submitRequestQuestion = useTypedSelector(
      (state) => state.asyncData["t2510"]
    );

    const { email, szAccNo } = useUserData();
    const submitRequestInput: TransactionInputType = {
      Header: {
        function: "D",
        termtype: "HTS",
        trcode: "t2511",
      },
      Input1: {},
    };
    const submitRequestDetailInput: TransactionInputType = {
      Header: {
        function: "D",
        termtype: "HTS",
        trcode: "t2713",
      },
      Input1: {},
    };
    const submitRequestQuestionInput: TransactionInputType = {
      Header: {
        function: "D",
        termtype: "HTS",
        trcode: "t2510",
      },
      Input1: {},
    };
    const { fetchData } = useAsyncData(submitRequestInput);

    const getSubmitRequestList = () => {
      submitRequestInput.Input1 = {
        szCust_No: email,
        szFrom_Date: "20220109000000",
        szTo_Date: `${dateFormat(new Date()).replaceAll("-", "")}999999`,
      };

      fetchData({ ...submitRequestInput });
    };

    const getSubmitRequestDetail = (id: string) => {
      submitRequestDetailInput.Input1 = {
        szCust_No: email,
        szReq_Seq_No: id,
        szPrc_Seq_No: "1",
      };

      fetchData({ ...submitRequestDetailInput });
    };

    const sendSubmitRequestQuestion = (title: string, content: string) => {
      submitRequestQuestionInput.Input1 = {
        szCust_No: email,
        szReq_Seq_No: "0",
        szQue_Title_Data: title,
        szQue_Data1: "",
        szQue_Data2: "",
        szQue_Data3: "",
        szQue_Memo: content,
      };
      fetchData({ ...submitRequestQuestionInput });
    };

    const parseSubmitRequestListData = (
      data: SubmitRequestListDataOutput[]
    ) => {
      return data.map((item, index) => {
        return {
          no: item[1],
          requestSubject: item[3],
          stat: item[2],
          entryTime: item[5],
          answerTime: item[6],
        };
      });
    };

    const parseSubmitRequestDetailData = (data) => {
      return {
        title: data.szQue_Title_Data,
        content: data.szQue_Memo,
        answerTitle: data.szAns_Title_Data,
        answerContent: data.szAns_Memo,
      };
    };

    return {
      submitRequestList: parseSubmitRequestListData(
        submitRequestListData?.Output2 ? submitRequestListData.Output2 : []
      ),
      submitRequestDetail: parseSubmitRequestDetailData(
        submitRequestDetail?.Output1 ? submitRequestDetail.Output1 : {}
      ),
      sendSubmitRequestQuestion,
      getSubmitRequestList,
      getSubmitRequestDetail,
    };
  }
}

export default HelpCenterService;
