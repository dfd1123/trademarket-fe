import { Route } from '@/types/Route';
import BusinessInfo from '@/views/pages/businessInfo/BusinessInfo';

const businessInfo: Route[] = [
  {
    path: '/info',
    element: <BusinessInfo />,
    meta: {
      isAuth: true,
    },
  },
];

export default businessInfo;
