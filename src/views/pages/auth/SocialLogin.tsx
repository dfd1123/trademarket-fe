import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from 'react-router-dom';

const SocialLogin = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        navigate('/mypage');

    }, []);
    return (<></>);
}

export default SocialLogin;