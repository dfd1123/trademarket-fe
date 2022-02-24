import { FindIdInput, GetUserListRequest, RegisterInput, ResetPwInput, SendResetPasswordEmailInput } from './types/User';
import cookieService from './CookieService';
import { ConstructorParamsType } from './types/Service';
class UserService {
  #api;
  #cookie;

  constructor({api, cookie, dispatch} : ConstructorParamsType) {
    this.#api = api;
    this.#cookie = cookie;
  }

  async emailLogin(body: { email: string; password: string }) {
    const result = await this.#api.post('/login', body);

    if (result.access_token) {
      this.#cookie.setAccessToken(result.access_token);
    }

    return result;
  }

  async register(body: RegisterInput) {
    const result = await this.#api.post('/register', body);

    if (result.access_token) {
      this.#cookie.setAccessToken(result.access_token);
    }

    return result;
  }

  logout() {
    return this.#api.post('/logout');
  }

  findId(body: FindIdInput) {
    return this.#api.post('/find_id', body);
  }

  sendResetPasswordEmail(body: SendResetPasswordEmailInput) {
    return this.#api.post('find_pw', body);
  }

  resetPw(body: ResetPwInput) {
    return this.#api.post('reset_pw', body);
  }

  getProfile(body: { id: number }) {
    return this.#api.get('user/view', body);
  }

  getMyUserInfo() {
    return this.#api.get('/profile');
  }

  getUserList(params : GetUserListRequest){
    return this.#api.get('/user/list', params);
  }

  modifyProfile(body: {
    id: string;
    name: string;
    birth: string;
    address1: string;
    company: string;
    manage_artist: string;
    profile_img: any;
  }) {
    return this.#api.put('/user/update', body);
  }
}

export default UserService;
