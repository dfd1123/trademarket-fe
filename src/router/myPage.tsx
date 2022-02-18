import {Route} from '@/types/Route';
import MyPage from '@/views/pages/myPage/MyPage'

const myPage : Route[] = [
    {
        path: '/mypage',
        element: <MyPage/>,
        meta: {
            // isAuth: true,
        }
    }
]

export default myPage;