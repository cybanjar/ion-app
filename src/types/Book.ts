import { BaseResponse } from "."

export interface Books {
  available: number
  id: string
  name: string
}

export type GetBooksResponse = BaseResponse<Books[]>