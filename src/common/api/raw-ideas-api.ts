import axios from 'axios';
import { CreateRawIdeaRequestBody, RawIdea } from '../models';

interface IRawIdeasApi {
  getRawIdeas(): Promise<RawIdea[]>;
  createRawIdea(body: CreateRawIdeaRequestBody): Promise<RawIdea>;
  deleteRawIdea(id: string): Promise<void>;
  updateRawIdea(id: string, rawIdea: Partial<CreateRawIdeaRequestBody>): Promise<RawIdea>;
}

export class RawIdeasApi implements IRawIdeasApi {
  async getRawIdeas(): Promise<RawIdea[]> {
    const response = await axios.get<RawIdea[]>('/raw-ideas');
    return response.data;
  }

  async createRawIdea(body: CreateRawIdeaRequestBody): Promise<RawIdea> {
    const { data } = await axios.post<RawIdea>('/raw-ideas', body);
    return data;
  }

  async deleteRawIdea(id: string): Promise<void> {
    await axios.delete(`/raw-ideas/${id}`);
  }

  async updateRawIdea(id: string, rawIdea: Partial<CreateRawIdeaRequestBody>): Promise<RawIdea> {
    const { data } = await axios.put<RawIdea>(`/raw-ideas/${id}`, rawIdea);
    return data;
  }
}
