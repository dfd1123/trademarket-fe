import Cookies from 'js-cookie';

class CookieService {
    #cookies = Cookies;
    
    getAccessToken(){
        return this.#cookies.get('accessToken');
    }

}

export default new CookieService();