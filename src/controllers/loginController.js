import { authenticate } from "../services/authService.js";

export const login = async (req, res) => {
  try {
    const tokenData = await authenticate();
    req.session.token = tokenData.access_token;
    res.send(`Login realizado! Token: ${tokenData.access_token}`);
  } catch (error) {
    res.status(401).send(`Erro ao autenticar: ${error.message}`);
  }
}