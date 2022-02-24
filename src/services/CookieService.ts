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

    getHitCnt(key : 'notice' | 'ref', id: number | string){
        const exist = this.#cookies.get(`${key}-${id}`);
        return Boolean(exist);
    }

    setHitCnt(key : 'notice' | 'ref', id: number | string){
        this.#cookies.set(`${key}-${id}`, '1', {expires: 1});
    }

}

export default CookieService;