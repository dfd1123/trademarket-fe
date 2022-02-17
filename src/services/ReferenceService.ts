import { useEffect } from 'react';
import { useTypedSelector } from '@/store';
import useAsyncData from '@/hooks/useAsyncData';
import { TransactionInputType } from '@/types/TransactionType';
import { RegisterInput } from '@/types/services/User';
import ApiConnection from '@/modules/ApiConnection';

class ReferenceService {
  #api;

  constructor() {
    this.#api = new ApiConnection();
  }

  getReferenceList(params: { searchKeyword: string, limit: number; offset: number }) {
    return this.#api.get('/archive/list', params);
  }
}

export default new ReferenceService();
