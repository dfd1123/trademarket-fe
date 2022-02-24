import ApiConnection from "@/modules/ApiConnection";
import CookieService from "@/services/CookieService";
import { Dispatch } from "react";

export interface ConstructorParamsType {
    api: ApiConnection;
    cookie: CookieService;
    dispatch: Dispatch<any>;
}