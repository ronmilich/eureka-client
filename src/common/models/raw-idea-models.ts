import { Tag } from './tag-models';

export interface RawIdea {
  id: string;
  title: string;
  description: string;
  important: boolean;
  tags: Tag[];
  createdAt: string;
  category: RawIdeaCategory;
}

export type RawIdeaCategory = 'ambitious' | 'realistic' | 'easy' | 'hard' | 'regular';

// API MODELS

export interface CreateRawIdeaRequestBody {
  title: string;
  description: string;
  category?: RawIdeaCategory;
  important?: boolean;
  tags?: string[];
}

export interface UpdateRawIdeaParam {
  id: string;
  body: Partial<CreateRawIdeaRequestBody>;
}
