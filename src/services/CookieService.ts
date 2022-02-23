import Cookies from 'js-cookie';

class CookieService {
    #cookies = Cookies;
    
    getAccessToken(){
        return this.#cookies.get('accessToken');
    }

    setAccessToken(accessToken : string){
        this.#cookies.set('accessToken', accessToken, {expires: 30});
    }

    removeAccessToken(){
        this.#cookies.remove('accessToken');
    }

}

export default new CookieService();