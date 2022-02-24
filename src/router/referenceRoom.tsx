import { Route } from '@/types/Route';
import ReferenceRoom from '@/views/pages/referenceRoom/ReferenceRoom';
import ReferenceView from '@/views/pages/referenceRoom/ReferenceView';

const referenceRoom: Route[] = [
  {
    path: '/ref',
    element: <ReferenceRoom />,
    meta: {
      isAuth: true,
    },
  },
  {
    path: '/ref/:ar_id',
    element: <ReferenceView />,
    meta: {
      isAuth: true,
    },
  }
];

export default referenceRoom;
