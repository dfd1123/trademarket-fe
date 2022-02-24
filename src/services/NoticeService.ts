import { ConstructorParamsType } from './types/Service';
import { GetNoticeInfoInput, GetNoticeListInput, HitNoticeInput } from './types/Notice';
import { setUnreadNoticeList } from '@/store/notice/notice';

class ReferenceService {
  #api;
  #dispatch;
  #cookie;

  constructor({api, cookie, dispatch} : ConstructorParamsType) {
    this.#api = api;
    this.#dispatch = dispatch;
    this.#cookie = cookie;
  }

  getNoticeList(params : GetNoticeListInput){
    this.getUnreadList();
    return this.#api.get('notice/list', params);
  }

  getNoticeInfo(params : GetNoticeInfoInput){
    const {no_id} = params;
    const alreadyRead = this.#cookie.getHitCnt('notice', no_id);

    if(!alreadyRead) {
      this.#cookie.setHitCnt('notice', no_id);
      this.hitNotice(params);
    }

    this.#api.put('/notice_read/read', params);

    return this.#api.get('notice/view', params);
  }

  hitNotice(body : HitNoticeInput){
    this.#api.put('/notice/hit', body);
  }
  
  async getUnreadList(){
    const result = await this.#api.get('/notice_read/list');
    this.#dispatch(setUnreadNoticeList(result));
  }
}

export default ReferenceService;
