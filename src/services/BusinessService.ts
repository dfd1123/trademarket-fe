import ApiConnection from '@/modules/ApiConnection';

class BusinessService {
  #api;

  constructor(api: ApiConnection) {
    this.#api = api;
  }

  getBusinessInfoList(params: {
    limit: number;
    offset: number;
    searchKeyword?: string;
  }) {
    return this.#api.get('/notice/list', params);
  }

  getReferenceDetail(params: { no_id: number }) {
    return this.#api.get('/notice');
  }
}

export default BusinessService;
