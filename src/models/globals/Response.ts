export interface ResponseMessage {
  message: string;
  status: number;
}

export interface PaginationModel<T> extends ResponseMessage {
  data: T[];
  meta: {
    page: number;
    limit: number;
    totalPage: number;
    itemsCount: number;
    totalItems: number;
  };
}

export interface ResponseData<T> extends ResponseMessage {
  data: T;
}

export interface ErrorResponse {
  message: string | string[];
  error: string;
  statusCode: number;
}
