import { useTypedSelector } from "@/store";

const useUserData = () => {
    const user = useTypedSelector((state) => state.authSlice);
    const {isLoggedIn, language} = user;
    const {szAccNo, szPasswd, email, exp, szBankAccNo} = user.data;

    return {isLoggedIn, language, szAccNo, szPasswd, email, exp, szBankAccNo};

}

export default useUserData;