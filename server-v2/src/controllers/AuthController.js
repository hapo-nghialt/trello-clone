import { AuthService } from "../services/AuthService";

const login = async (req, res) => {
  const loginData = await AuthService.login(req.body)
}

const register = async (req, res) => {
  const registerData = await AuthService.register(req.body)
  console.log(registerData);
}

export const AuthController = {
  login,
  register
}
