import { FunctionComponent } from "react";

export interface DialogType {
  type: "alert" | "confirm" | "prompt";
  title?: string;
  msg: string;
  value?: string | number;
  button?: {
    yes: string;
    no?: string;
  };
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}

export interface DialogComponentPropsType {
  title?: boolean;
  msg: string;
  value?: string | number;
  button: {
    yes: string;
    no?: string;
  }; 
  close?: () => void;
  resolve?: (result: any) => void;
}
