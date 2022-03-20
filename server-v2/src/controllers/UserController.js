import { UserModel } from '../models/User'

const get = async (req, res) => {
  try {
    const { keyword, userIds } = req.query
    const users = await UserModel.find({
      $or: [
        {username: { $regex: keyword, $options: 'i' }},
        {email: { $regex: keyword, $options: 'i' }}
      ],
      _id: {$nin: userIds}
    });
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

export const UserController = {
  get
}
