const axios = require('axios')

export const fetchBoardDetails = async (id) => {
  const request = await axios.get(`http://localhost:8001/v1/boards/${id}`)
}