import { TAG_COLORS } from "../constants";

export interface Tag {
  id: string;
  name: string;
  color: keyof typeof TAG_COLORS;
  createdAt?: string;
}

// API MODELS

export interface CreateTagRequestBody {
  name: string;
  color: string;
}
