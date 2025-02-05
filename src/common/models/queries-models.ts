import { Sort } from './common-models';
import { Insight } from './insight-models';
import { Problem } from './problem-models';
import { RawIdea } from './raw-idea-models';

export interface QueryData {
  problems: Problem[];
  insights: Insight[];
  rawIdeas: RawIdea[];
}

export type QueriesSections = 'insights' | 'problems' | 'rawIdeas';

export interface GetQueriesRequestBody {
  searchText: string;
  filters: {
    sections: QueriesSections[];
    tags: string[];
  };
  sort: Sort;
}
