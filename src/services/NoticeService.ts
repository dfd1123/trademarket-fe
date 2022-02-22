import ApiConnection from '@/modules/ApiConnection';
import { GetNoticeInfoInput, GetNoticeListInput } from './types/Notice';

class ReferenceService {
  #api;

  constructor(api: ApiConnection) {
    this.#api = api;
  }

  getNoticeList(params : GetNoticeListInput){
      return this.#api.get('notice/list', params);
  }

  getNoticeInfo(params : GetNoticeInfoInput){
      return this.#api.get('notice/view', params);
  }
}

export default ReferenceService;
