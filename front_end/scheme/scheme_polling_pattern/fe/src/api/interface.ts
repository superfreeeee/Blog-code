export interface IGreetingResponse {
  message: string;
}

export interface IPollingParams {
  pageNo: number;
  pageSize: number;
}

export interface IPollingPagination {
  pageNo: number;
  pageSize: number;
  total: number;
  hasFinish: boolean;
}

export interface IPollingResponse {
  data: number[];
  pagination: IPollingPagination;
}
