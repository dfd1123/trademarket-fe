import { useTypedSelector } from "@/store";

const useUserData = () => {
    const user = useTypedSelector((state) => state.authSlice);
    const {isLoggedIn, language} = user;
    const {szAccNo, email, exp} = user.data;

    return {isLoggedIn, language, szAccNo, email, exp};

}

export default useUserData;