import ApiConnection from "@/modules/ApiConnection";
import { TrdWebSocket } from "@/provider/WebSocketProvider";
import CookieService from "@/services/CookieService";
import { TransactionInputType } from "@/types/TransactionType";
import { Dispatch } from "react";

export interface ConstructorParamsType {
    api?: ApiConnection;
    ws: TrdWebSocket | { sendInput: (input: TransactionInputType) => undefined | void };
    cookie: CookieService;
    dispatch: Dispatch<any>;
}