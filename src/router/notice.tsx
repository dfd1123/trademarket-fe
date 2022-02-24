import {Route} from '@/types/Route';
import NoticeList from '@/views/pages/notice/NoticeList';
import NoticeView from '@/views/pages/notice/NoticeView';

const notice : Route[] = [
    {
        path: '/notice/:no_id',
        element: <NoticeView />,
        meta: {
            isAuth: true,
        }
    },
    {
        path: '/notice',
        element: <NoticeList />,
        meta: {
            isAuth: true,
        }
    }
]

export default notice;