import { API_ROOT } from 'utilities/constants'

const axios = require('axios')

export const fetchBoardDetails = async (id) => {
  const request = await axios.get(`${API_ROOT}/api/boards/${id}`)
  return request.data
}

export const updateBoard = async (id, data) => {
  const request = await axios.put(`${API_ROOT}/api/boards/${id}/update`, data)
  return request.data
}

export const createNewColumn = async (data) => {
  const request = await axios.post(`${API_ROOT}/api/columns/store`, data)
  return request.data
}

// update or remove column
export const updateColumn = async (id, data) => {
  const request = await axios.put(`${API_ROOT}/api/columns/${id}`, data)
  return request.data
}

export const createNewCard = async (data) => {
  const request = await axios.post(`${API_ROOT}/api/cards/`, data)
  return request.data
}
