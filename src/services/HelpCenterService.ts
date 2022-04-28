import { useContext, useEffect, useState } from "react";
import { ConstructorParamsType } from "./types/Service";
import { TransactionInputType } from "@/types/TransactionType";
import useAsyncData from "@/hooks/useAsyncData";
import { useTypedSelector } from "@/store";
import { DepositRequestHistoryOutput } from "@/services/types/HelpCenter";

class HelpCenter {
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

  /**
   * columns={[
   * 'DateTime',
   * '1 szOrder_InOutM',
   * 'Amount',
   * '3 szDateTime',
   * 'Amount',
   * '5 szName',
   * 'Account No',
   * '7 szSSAccNo',
   * '8 szBank_Name',
   * 'Client No',
   * 'No',
   * 'Stat',
   * '12szCHK_With_Stat',
   * 'Stat',
   * '14szPager_Err2',
   * 'Client No',
   * '16szPager_Err4',
   * '17szPager_Err5',
   *
   * <RowColumns width="64px">{columns[10]}</RowColumns>
   * <RowColumns width="198px">{columns[6]}</RowColumns>
   * <RowColumns width="172px">{columns[0]}</RowColumns>
   * <RowColumns width="172px">{columns[2]}</RowColumns>
   * <RowColumns width="276px">{statConverter(columns[11].trim())}</RowColumns>
   * <RowColumns width="192px">{columns[9]}</RowColumns>
   * ]}
   * */

  // t2313: deposit list
  // t2413: withdraw list
  getDepositOrWithdrawHistory({ trcode, inputData }) {
    const depositRequestDate = useTypedSelector(
      (state) => state.asyncData["t2313"]
    );

    const input: TransactionInputType = {
      Header: {
        function: "D",
        termtype: "HTS",
        trcode: trcode,
      },
      Input1: {
        ...inputData,
      },
    };
    const { fetchData } = useAsyncData(input);
    fetchData();
    const depositRequestObj: DepositRequestHistoryOutput[] =
      depositRequestDate?.Output2 || {};

    const depositRequestResultData = depositRequestDate.map(
      (item, index) => {}
    );
  }
}
