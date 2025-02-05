import axios from 'axios';
import { Insight, CreateInsightRequestBody } from '../models';

interface IInsightsApi {
  getInsights(): Promise<Insight[]>;
  createInsight(body: CreateInsightRequestBody): Promise<Insight>;
  updateInsight(id: string, body: Partial<CreateInsightRequestBody>): Promise<Insight>;
  deleteInsight(id: string): Promise<void>;
}

export class InsightsApi implements IInsightsApi {
  async getInsights(): Promise<Insight[]> {
    const { data } = await axios.get<Insight[]>('/insights');
    return data;
  }

  async createInsight(body: CreateInsightRequestBody): Promise<Insight> {
    const { data } = await axios.post<Insight>('/insights', body);
    return data;
  }

  async updateInsight(id: string, body: Partial<CreateInsightRequestBody>): Promise<Insight> {
    const { data } = await axios.put<Insight>(`/insights/${id}`, body);
    return data;
  }

  async deleteInsight(id: string): Promise<void> {
    await axios.delete(`/insights/${id}`);
  }
}
