import { Link, Outlet } from 'react-router-dom';
import realTime from '@/services/RealTimeService';
import useGetRealTimePrice from '@/hooks/useGetRealTimePrice';
import useModal from '@/hooks/useModal';
import TestModal from '@/views/components/common/modal/Test';
import { BasicButton } from '@/views/components/common/Button';

function Test1() {
  realTime.coinPrice();
  const { openModal } = useModal();

  const openTestModal = async () => {
    const result = await openModal(TestModal);

    console.log(result);
  };

  const test = useGetRealTimePrice('BTCUSDT');

  return (
    <div>
      <h1>TEST1</h1>
      <p>{test}</p>
      <BasicButton>
        <Link to="/test2">테스트2</Link>
      </BasicButton>
      <BasicButton onClick={openTestModal}>모달 테스트</BasicButton>
    </div>
  );
}

export default Test1;
