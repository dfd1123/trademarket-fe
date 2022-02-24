import { Route } from '@/types/Route';
import SearchUser from '@/views/pages/searchUser/SearchUser';

const searchUser: Route[] = [
  {
    path: '/search/user',
    element: <SearchUser />,
    meta: {
      isAuth: true,
    },
  },
];

export default searchUser;
