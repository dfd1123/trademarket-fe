import Cookies from 'js-cookie';

class CookieService {
    #cookies = Cookies;
    
    getAccessToken(){
        return this.#cookies.get('accessToken');
    }

    setAccessToken(accessToken : string){
        console.log(accessToken);
        this.#cookies.set('accessToken', accessToken, {expires: 30});
    }

}

export default new CookieService();