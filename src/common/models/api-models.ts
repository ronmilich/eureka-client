import { Difficulty, IdeaStatus, ServiceType } from './idea-models';

export interface CreateIdeaRequestBody {
  metadata: {
    status: IdeaStatus;
    tags: string[];
  };
  details: {
    title: string;
    shortDescription: string;
    detailedDescription: string;
    serviceType: ServiceType;
  };
  feasibility: {
    difficulty: Difficulty;
    estimatedDevelopmentTime: number;
  };
}
