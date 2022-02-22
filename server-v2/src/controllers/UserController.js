import { UserModel } from "../models/User"

const get = async (req, res) => {
  try {
    const { keyword } = req.query
    const users = await UserModel.find({ username: { $regex: keyword, $options: 'i' } });
    return res.status(200).json({
      success: true,
      users
    })
  } catch (error) {
    return res.status(500).json({
      errors: error.message
    })
  }
}

// const addMemberToBoard = 

export const UserController = {
  get
}
