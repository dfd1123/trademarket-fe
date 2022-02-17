import {Link, Outlet} from 'react-router-dom';
import realTime from '@/services/RealTimeService';
import useGetRealTimePrice from '@/hooks/useGetRealTimePrice';
import useModal from '@/hooks/useModal';
import useToast from "@/hooks/useToast";
import TestModal from '@/views/components/common/modal/Test';
import {BasicButton} from '@/views/components/common/Button';


function Test1() {
  realTime.coinPrice();
  const {openModal} = useModal();
  const { toast } = useToast();

  const openTestModal = async() => {
    const result = await openModal(TestModal, {animation:{in: false, class: 'fade', duration:250}});

    console.log(result);
  }

  const openTestWarningToast = () => {
    toast('테스트 Warning!', {duration: 1000000});
  }

  const openTestSuccessToast = () => {
    toast('테스트 Success!', {type: 'success', duration: 1300});
  }

  const test = useGetRealTimePrice('BTCUSDT');

  return (
    <div>
      <h1>TEST1</h1>
      <p>{test}</p>
      <BasicButton>
        <Link to='/test2'>테스트2</Link>
      </BasicButton>
      <BasicButton onClick={openTestModal}>모달 테스트</BasicButton>
      <BasicButton onClick={openTestWarningToast}>토스트(warning) 테스트</BasicButton>
      <BasicButton onClick={openTestSuccessToast}>토스트(success) 테스트</BasicButton>
    </div>
  );
}

export default Test1;
