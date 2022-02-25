import { ConstructorParamsType } from '@/services/types/Service';

class BusinessService {
  #api;
  #dispatch;
  #cookie;

  constructor({ api, cookie, dispatch }: ConstructorParamsType) {
    this.#api = api;
    this.#dispatch = dispatch;
    this.#cookie = cookie;
  }

  getBusinessInfoList(params: {
    limit: number;
    offset: number;
    no_type: string;
  }) {
    return this.#api.get('/notice/list', params);
  }
}

export default BusinessService;
