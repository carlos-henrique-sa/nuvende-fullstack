import { createPixCharge } from "../services/chargeService.js";

export const newPixCharge = async (req, res) => {
  try {
    const tokenData = await createPixCharge();
    req.session.token = tokenData.access_token;
    res.send(`Login realizado! Token: ${tokenData.access_token}`);
  } catch (error) {
    res.status(401).send(`Erro ao autenticar: ${error.message}`);
  }
}