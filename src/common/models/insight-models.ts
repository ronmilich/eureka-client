import { Tag } from './tag-models';

export interface Insight {
  id: string;
  text: string;
  important: boolean;
  createdAt: string;
  tags: Tag[];
}

// API MODELS

export interface CreateInsightRequestBody {
  text: string;
  important?: boolean;
  tags?: string[];
}

export interface UpdateInsightParam {
  id: string;
  body: Partial<CreateInsightRequestBody>;
}
