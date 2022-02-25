import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { useTypedSelector } from '@/store';
import { setPushAlarm } from '@/utils/notificationUtil';

const SocialLogin = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userData = useTypedSelector((state) => state.authSlice.user);

  useEffect(() => {
    setPushAlarm(userData.flag_alarm !== 0);
    navigate('/notice');
  }, []);
  return <></>;
};

export default SocialLogin;
