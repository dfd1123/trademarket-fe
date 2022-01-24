import {useDispatch} from 'react-redux';
import { resetAllState } from '@/store/asyncData/asyncData';

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log('awdadawdawd')
    const dispatch = useDispatch();
    dispatch(resetAllState());
  });
}
