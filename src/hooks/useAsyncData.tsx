import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetSpecificState } from '@/store/asyncData/asyncData';
import { TransactionInputType } from '@/types/TransactionType';
import { WebSocketContext } from '@/provider/WebSocketProvider';

const asyncData = (input : TransactionInputType) => {
  const { trcode } = input.Header;
  const ws = useContext(WebSocketContext);
  const dispatch = useDispatch();

  const fetchData = () => {
    trcode && ws.sendInput(input);
  };

  useEffect(() => {
    return () => {
        dispatch(resetSpecificState({ trcode }));
      };
  }, []);

  return { resultKey: trcode || '', fetchData };
};

export default asyncData;
