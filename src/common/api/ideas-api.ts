import { SlimIdea } from '../models';
import axios from 'axios';

interface IIdeasApi {
  getIdeasSlim(): Promise<SlimIdea[]>;
  deleteIdea(id: string): Promise<void>;
}

export class IdeasApi implements IIdeasApi {
  async getIdeasSlim(): Promise<SlimIdea[]> {
    const { data } = await axios.get<SlimIdea[]>('/ideas/slim');
    return data;
  }

  async deleteIdea(id: string): Promise<void> {
    await axios.delete(`/ideas/${id}`);
  }
}
