import { AuthApi } from './auth-api';
import { IdeasApi } from './ideas-api';
import { InsightsApi } from './insights-api';
import { ProblemsApi } from './problems-api';
import { QueriesApi } from './queries-api';
import { RawIdeasApi } from './raw-ideas-api';
import { TagsApi } from './tags-api';

interface ApiService {
  auth: AuthApi;
  problems: ProblemsApi;
  tags: TagsApi;
  insights: InsightsApi;
  rawIdeas: RawIdeasApi;
  queries: QueriesApi;
  ideas: IdeasApi;
}

class Api implements ApiService {
  auth = new AuthApi();
  problems = new ProblemsApi();
  tags = new TagsApi();
  insights = new InsightsApi();
  rawIdeas = new RawIdeasApi();
  queries = new QueriesApi();
  ideas = new IdeasApi();
}

export default new Api();
