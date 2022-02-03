import {
  createContext,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export interface ModalType {
  id: number;
  props?: any;
  clear?: boolean;
  component: FunctionComponent;
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}

export interface ModalContextType {
  modals: ModalType[];
  open: (
    component: FunctionComponent,
    props?: any,
    clear?: boolean
  ) => Promise<any>;
  close: (id: number) => void;
  resolve: (id: number, result: any) => void;
}

export const ModalContext = createContext<ModalContextType>({
  modals: [],
  open: async (component, props, clear) => Promise,
  close: (id: number) => {},
  resolve: (id, result) => {},
});

export default function ModalProvider({ children }: Props): JSX.Element {
  let tempModals: ModalType[] = [];
  const [modals, setModal] = useState<ModalType[]>([]);

  useEffect(() => {
    setModal(tempModals);
    console.log(modals);
  }, [tempModals.length]);

  const open = (
    component: FunctionComponent,
    props?: any,
    clear?: boolean
  ): Promise<any> => {
    const seq: number = modals.length > 0 ? modals[modals.length - 1].id : 0;

    return new Promise((resolve, reject) => {
      tempModals = [
        ...tempModals,
        {
          id: seq,
          props,
          component,
          clear: Boolean(clear),
          resolve,
          reject,
        },
      ];
    });
  };

  const addModal = useCallback((modal) => {
    setModal([...modals, modal]);

    console.log(modals, modal);
  }, []);

  const close = (id: number): void => {
    const newModals = modals.filter((m) => m.id !== id);
    setModal(newModals);
  };

  const getModal = (id: number): ModalType | undefined => {
    return modals.find((m) => m.id === id);
  };

  const resolve = <T extends {}>(id: number, result: T): void => {
    const modal = getModal(id);
    if (!modal) return;
    modal.resolve(result);
    close(id);
  };

  return (
    <ModalContext.Provider
      value={{
        modals,
        open,
        close,
        resolve,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
