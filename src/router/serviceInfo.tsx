import { Route } from '@/types/Route';
import ServiceInfo from '@/views/pages/commonInfo/CommonInfo';

const serviceInfo: Route[] = [
  {
    path: '/serviceInfo',
    element: <ServiceInfo />,
    meta: {
      isAuth: true,
    },
  },
];

export default serviceInfo;
