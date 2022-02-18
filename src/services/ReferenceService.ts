import ApiConnection from '@/modules/ApiConnection';

class ReferenceService {
  #api;

  constructor(api : ApiConnection) {
    this.#api = api;
  }

  getReferenceList(params: { searchKeyword: string, limit: number; offset: number }) {
    return this.#api.get('/archive/list', params);
  }
}

export default ReferenceService;
