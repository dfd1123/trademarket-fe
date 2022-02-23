import { Route } from '@/types/Route';
import CommonInfo from '@/views/pages/commonInfo/CommonInfo';

const commonInfo: Route[] = [
  {
    path: '/term',
    element: <CommonInfo />,
    meta: {
      isAuth: true,
    },
  },
];

export default commonInfo;
