export interface BaseModel {
  id: number;
  updatedAt: Date;
  createdAt: Date;
}

export class BaseQuery {
  limit: number;
  page: number;
  search: string;
}
