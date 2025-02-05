import axios from 'axios';
import { GetQueriesRequestBody, QueryData } from '../models';

interface IQuriesApi {
  getQueries: (body: GetQueriesRequestBody) => Promise<QueryData>;
}

export class QueriesApi implements IQuriesApi {
  getQueries = async (body: GetQueriesRequestBody) => {
    const response = await axios.post<QueryData>('/queries', body);
    return response.data;
  };
}
