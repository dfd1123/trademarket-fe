import { FunctionComponent } from 'react';

export interface ModalType {
  id: number;
  props?: any;
  nonModal?: boolean;
  component: FunctionComponent;
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}

export interface ModalComponentPropsType {
    children?: React.ReactNode;
    className?: string;
    nonModal?: boolean;
    close?: () => void,
    resolve?: (result: unknown) => void
}