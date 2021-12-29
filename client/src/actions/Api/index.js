import { API_ROOT } from 'utilities/constants'

const axios = require('axios')

// export const fetchBoardDetails = async (id) => {
//   const response = await axios.get(`${API_ROOT}/boards/${id}`)
//   return response.data
// }

export const updateBoard = async (id, data) => {
  const response = await axios.put(`${API_ROOT}/boards/${id}/update`, data)
  return response.data
}

export const createNewColumn = async (data) => {
  const response = await axios.post(`${API_ROOT}/columns/store`, data)
  return response.data
}

// update or remove column
export const updateColumn = async (id, data) => {
  const response = await axios.put(`${API_ROOT}/columns/${id}`, data)
  return response.data
}

export const createNewCard = async (data) => {
  const response = await axios.post(`${API_ROOT}/cards/store`, data)
  return response.data
}

export const updateCard = async (id, data) => {
  const response = await axios.put(`${API_ROOT}/cards/${id}`, data)
  return response.data
}

// export const login = async (data) => {
//   const response = await axios.post(`${API_ROOT}/auth/login`, data)
//   return response.data
// }

// export const register = async (data) => {
//   try {
//     const response = await axios.post(`${API_ROOT}/auth/register`, data)
//     return response.data
//   } catch (error) {
//     if (error.response.data) return error.response.data
//   }
// }
