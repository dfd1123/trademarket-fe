import { FunctionComponent } from 'react';

export interface ToastType {
  id: number;
  msg: string;
  type?: 'success' | 'warning';
  duration?: number;
}

export interface ModalComponentPropsType {
    children?: React.ReactNode;
    className?: string;
    nonModal?: boolean;
    close?: () => void;
    resolve?: (result: any) => void;
}