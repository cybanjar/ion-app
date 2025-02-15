import api from "./api"
import { Parameter } from '@/api/api'

export async function getBooks () {
  const response = await api.doFetch('/books')
  return response
}

export async function getBookId (id: string, params: Parameter) {
  const response = await api.doFetch(`/books/${id}`, { params })
  return response
}
