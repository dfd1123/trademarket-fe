import {Link, Outlet} from 'react-router-dom';
import useGetRealTimePrice from '@/hooks/useGetRealTimePrice';
import useModal from '@/hooks/useModal';
import useToast from "@/hooks/useToast";
import useDialog from '@/hooks/useDialog';
import TestModal from '@/views/components/common/modal/Test';
import {BasicButton} from '@/views/components/common/Button';
import CircleLoading from '@/views/components/common/CircleLoading';
import Loading from '../components/common/Loading';
import useService from '@/hooks/useService';


function Test1() {
  const services = useService();
  const {openModal} = useModal();
  const { toast } = useToast();
  const {alert, confirm, prompt} = useDialog();

  services.realTime.coinPrice();

  const openTestModal = async() => {
    const result = await openModal(TestModal, {animation:{in: false, class: 'fade', duration:250}});

    console.log(result);
  }

  const openTestWarningToast = () => {
    toast('테스트 Warning!', {duration: 1000});
  }

  const openTestSuccessToast = () => {
    toast('테스트 Success!', {type: 'success', duration: 1300});
  }

  const openAlert = async () => {
    await alert('alert 테스트!');

    console.log('확인 누름');
  }

  const openConfirm = async () => {
    const result = await confirm('confirm 테스트!');

    console.log('결과 : ', result);
  }

  const openPrompt = async () => {
    const result = await prompt('prompt 테스트!');

    console.log('결과 : ', result);
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
      <div>
        <BasicButton onClick={openAlert}>Alert</BasicButton>
        <BasicButton onClick={openConfirm}>Confirm</BasicButton>
        <BasicButton onClick={openPrompt}>Prompt</BasicButton>
      </div>
      <CircleLoading />
      <Loading scale={0.8} loading={true} />
    </div>
  );
}

export default Test1;
