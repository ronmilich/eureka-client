import { CreateProblemRequestBody, Problem } from '../models';
import axios from 'axios';

export interface IProblemsApi {
  getProblems: () => Promise<Problem[]>;
  createProblem: (body: CreateProblemRequestBody) => Promise<Problem>;
  deleteProblem: (id: string) => Promise<void>;
  updateProblem: (id: string, body: Partial<CreateProblemRequestBody>) => Promise<Problem>;
}

export class ProblemsApi implements IProblemsApi {
  async getProblems(): Promise<Problem[]> {
    const { data } = await axios.get<Problem[]>('/problems');
    return data;
  }

  async createProblem(body: CreateProblemRequestBody): Promise<Problem> {
    const { data } = await axios.post<Problem>('/problems', body);
    return data;
  }

  async deleteProblem(id: string): Promise<void> {
    await axios.delete(`/problems/${id}`);
  }

  async updateProblem(id: string, body: Partial<CreateProblemRequestBody>): Promise<Problem> {
    const { data } = await axios.put<Problem>(`/problems/${id}`, body);
    return data;
  }
}
