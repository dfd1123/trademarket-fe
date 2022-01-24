import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetSpecificState } from '@/store/asyncData/asyncData';
import { TransactionInputType } from '@/types/TransactionType';
import { WebSocketContext } from '@/provider/WebSocketProvider';

const useAsyncData = (input : TransactionInputType) => {
  const { trcode } = input.Header;
  const ws = useContext(WebSocketContext);
  const dispatch = useDispatch();

  const fetchData = (newInput = input) => {
    trcode && ws.sendInput(newInput);
  };

  useEffect(() => {
    return () => {
        dispatch(resetSpecificState({ trcode }));
      };
  }, []);

  return { resultKey: trcode || '', fetchData };
};

export default useAsyncData;
