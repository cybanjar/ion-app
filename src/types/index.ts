export type BaseResponse<T = null> = {
  code: number
  data?: T;
  error?: boolean
  message?: string;
}