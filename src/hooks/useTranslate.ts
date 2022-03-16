import i18n from '@/plugins/i18n';
import { useTranslation } from 'react-i18next';

const useTranslate = (key: string) => {
    // const { t: translate } = useTranslation([key]);

    // console.log(translate('auth:register'));

    const t = (str: string) => {
        if(str.substring(0, 2) === '_.') str = str.replace('_.', `${key}.`);
        console.log(i18n.t(str), str);
        return i18n.t(str);
    };

    const changeLanguage = (lang: 'en' | 'ko') => {
        i18n.changeLanguage(lang);
    };

    return { t, changeLanguage };
}

export default useTranslate;