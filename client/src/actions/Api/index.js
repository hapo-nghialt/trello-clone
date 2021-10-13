import { API_ROOT } from 'utilities/constants'

const axios = require('axios')

export const fetchBoardDetails = async (id) => {
  const request = await axios.get(`${API_ROOT}/v1/boards/${id}`)
  return request.data
}

export const createNewColumn = async (data) => {
  const request = await axios.post(`${API_ROOT}/v1/columns/`, data)
  return request.data
}

export const createNewCard = async (data) => {
  const request = await axios.post(`${API_ROOT}/v1/cards/`, data)
  return request.data
}
