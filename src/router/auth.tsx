import {Route} from '@/types/Route';
import EmailLogin from '@/views/pages/auth/EmailLogin';
import Login from "@/views/pages/auth/Login";

const auth : Route[] = [
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/emailLogin',
        element: <EmailLogin/>
    }
]

export default auth;