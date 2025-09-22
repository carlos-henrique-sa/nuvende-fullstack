import { authenticate } from "../services/authService.js";

export const login = async (req, res) => {
  try {
    const tokenData = await authenticate();
    req.session.token = tokenData.access_token;
    if (res) {
      res.send(`Login realizado! Token: ${tokenData.access_token}`);
    }
    return tokenData;
  } catch (error) {
    console.log(error);
  }
}