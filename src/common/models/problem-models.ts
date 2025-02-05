import { Tag } from './tag-models';

export interface Problem {
  id: string;
  title: string;
  description?: string;
  tags: Tag[];
  createdAt?: string;
  important: boolean;
  priority: ProblemPriority;
}

export type ProblemPriority = 'low' | 'regular' | 'high';

// API MODELS

export interface CreateProblemRequestBody {
    title: string;
    description?: string;
    tags?: string[];
    important?: boolean;
    priority?: ProblemPriority;
}

export interface UpdateProblemParam {
    id: string;
    body: Partial<CreateProblemRequestBody>;
}