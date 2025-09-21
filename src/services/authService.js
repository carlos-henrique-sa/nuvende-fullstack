

import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

const API_URL = process.env.API_URL;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

export const authenticate = async () => {
  const url = `${API_URL}/api/v2/auth/login`;
  const data = new URLSearchParams();
  data.append("grant_type", "client_credentials");
  data.append("scope", 'kyc.background-check.natural-person kyc.background-check.legal-person cob.write cob.read webhooks.read webhooks.write merchants.read merchants.write terminals.read terminals.write transactions.read transactions.write');

  // Gera o token de autenticação base64
  const token = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Erro ao autenticar");
  }
}