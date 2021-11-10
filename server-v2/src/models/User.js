const Schema = mongoose.Schema

let User = new Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20
  },
  password: {
    type: String,
    required: true
  }
})

export const UserModel = mongoose.model('User', User)
