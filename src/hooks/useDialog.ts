import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { addDialog, removeDialog } from '@/store/modal/dialog';
import { DialogType } from '@/store/modal/types/dialog';

interface DialogOption {
  title?: string;
  msg?: string;
  children?: FunctionComponent;
  value?: string | number;
  button?:{
    yes: string;
    no?: string;
  }
}

interface DialogHookReturn {
  alert: (message:string, options?: DialogOption) => Promise<any>;
  confirm: (message:string, options?: DialogOption) => Promise<any>;
  prompt: (message:string, options?: DialogOption) => Promise<any>;
  closeDialog: () => void;
  resolveDialog: (modal: DialogType, result: any) => void;
  scrollRelease:() => void;
}

const useDialog = (): DialogHookReturn => {
  const dispatch = useDispatch();

  const openDialog = (type: "alert" | "confirm" | "prompt", options: DialogOption) => {
    let { title, msg, children, button, value } = options;
    const basicButton : {yes:string, no?: string} = {yes: '확인', no: '취소'};

    switch(type){
      case 'alert':
        basicButton.no = undefined;
        break;
      case 'confirm':
        basicButton.yes = '확인';
        basicButton.no = '취소';
        break;
      case 'prompt':
        basicButton.yes = '확인';
        basicButton.no = '취소';
    }

    scrollFreeze();

    return new Promise<any>((resolve, reject) => {
      const dialog: DialogType = {
        type: type,
        title: title ?? '',
        msg: msg ?? '',
        children,
        value: value ?? '',
        button: button ?? basicButton,
        resolve,
        reject,
      };

      dispatch(addDialog({ dialog }));
    });
  }

  const alert = (message = '', options: DialogOption = {title: '', msg: '', children: undefined, button: {yes: '확인'}}): Promise<unknown> => {
    options.msg = message;
    return openDialog('alert', options);
  }

  const confirm = (message = '', options: DialogOption = {title: '', msg: '', children: undefined, button: {yes: '확인', no: '취소'}}): Promise<unknown> => {
    options.msg = message;
    return openDialog('confirm', options);
  }

  const prompt = (message = '', options: DialogOption = {title: '', msg: '', children: undefined, value: '', button: {yes: '확인', no: '취소'}}): Promise<unknown> => {
    options.msg = message;
    return openDialog('prompt', options);
  }

  const closeDialog = (): void => {
    dispatch(removeDialog({scrollRelease}));
  };

  const resolveDialog = (dialog: DialogType, result: any): void => {
    dialog.resolve(result);
    closeDialog();
  };

  const scrollFreeze = () => {
    document.body.style.overflow = 'hidden';
  };

  const scrollRelease = () => {
    document.body.style.overflow = '';
  };

  return { alert, confirm, prompt, closeDialog, resolveDialog, scrollRelease };
};

export default useDialog;
