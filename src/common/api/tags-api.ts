import { CreateTagRequestBody, Tag } from '../models';
import axios from 'axios';

interface ITagsApi {
  getTags: () => Promise<Tag[]>;
  createTag: (body: CreateTagRequestBody) => Promise<Tag>;
  updateTag: (id: string, body: Partial<CreateTagRequestBody>) => Promise<Tag>;
  deleteTag: (id: string) => Promise<void>;
}

export class TagsApi implements ITagsApi {
  async getTags(): Promise<Tag[]> {
    const { data } = await axios.get<Tag[]>('/tags');
    return data;
  }

  async createTag(body: CreateTagRequestBody): Promise<Tag> {
    const { data } = await axios.post<Tag>('/tags', body);
    return data;
  }

  async updateTag(id: string, body: Partial<CreateTagRequestBody>): Promise<Tag> {
    const { data } = await axios.put<Tag>(`/tags/${id}`, body);
    return data;
  }

  async deleteTag(id: string): Promise<void> {
    await axios.delete(`/tags/${id}`);
  }
}
