import {Route} from '@/types/Route';
import EmailLogin from '@/views/pages/auth/EmailLogin';
import FindId from '@/views/pages/auth/FindId';
import Login from "@/views/pages/auth/Login";
import PasswordReset from '@/views/pages/auth/PasswordReset';
import Register from '@/views/pages/auth/Register';
import SocialLogin from '@/views/pages/auth/SocialLogin';

const auth : Route[] = [
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/emailLogin',
        element: <EmailLogin />
    },
    {
        path: '/social/login',
        element: <SocialLogin />
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/find/id',
        element: <FindId/>
    },
    {
        path: '/password/reset',
        element: <PasswordReset/>
    },
]

export default auth;