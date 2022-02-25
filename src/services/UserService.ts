import {
  FindIdInput,
  GetUserListRequest,
  ProfileInput,
  RegisterInput,
  ResetPwInput,
  SendResetPasswordEmailInput,
} from './types/User';
import cookieService from './CookieService';
import { ConstructorParamsType } from './types/Service';
import { UserInfo } from '@/store/auth/types/auth';
import { setAuth } from '@/store/auth/auth';
import { setPushAlarm } from '@/utils/notificationUtil';
class UserService {
  #api;
  #cookie;
  #dispatch;

  constructor({ api, cookie, dispatch }: ConstructorParamsType) {
    this.#api = api;
    this.#cookie = cookie;
    this.#dispatch = dispatch;
  }

  async emailLogin(body: { email: string; password: string }) {
    const result = await this.#api.post('/login', body);

    if (result.access_token) {
      this.#cookie.setAccessToken(result.access_token);
      setPushAlarm(result.user.flag_alarm !== 0);
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

  async logout() {
    await this.#api.post('/logout');
    this.#dispatch(setAuth({}));
    this.#cookie.removeAccessToken();
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

  getUserList(params: GetUserListRequest) {
    return this.#api.get('/user/list', params);
  }

  async modifyProfile(body: ProfileInput) {
    const frm = new FormData();
    frm.append('_method', 'put');
    for (const [key, value] of Object.entries(body)) {
      frm.append(key, value);
      if(key === 'profile_img') {
        frm.append('profile_img[]', value);
      }
    }
    const user = await this.#api.post('/user/update', frm, {
      headers: {
        'Content-type': 'application/json; multipart/form-data;'
      }
    });
    const auth = {
      user: user,
      access_token: this.#cookie.getAccessToken(),
    };

    this.#dispatch(setAuth(auth));
  }
}

export default UserService;
