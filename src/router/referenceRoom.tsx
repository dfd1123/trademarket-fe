import {Route} from '@/types/Route';
import ReferenceRoom from "@/views/pages/referenceRoom/ReferenceRoom";

const referenceRoom : Route[]= [
    {
        path: '/ref', 
        element: <ReferenceRoom />,
        meta:{
            isAuth: true,
        },
      },
]

export default referenceRoom;