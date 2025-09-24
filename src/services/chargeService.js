import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import "./axiosInterceptor.js";

const API_URL = process.env.API_URL;
const ACCOUNT_ID = process.env.ACCOUNT_ID;
const PIX_KEY = process.env.PIX_KEY;

export const createPixCharge = async (body, token) => {
  const url = `${API_URL}/api/v2/cobranca/cob`;
  const data = {
    chave: PIX_KEY,
    nomeRecebedor: body.nomeRecebedor,
    calendario: {
      expiracao: Number(body.calendario.expiracao || 3600) // default 3600 se não vier
    },
    valor: {
      original: body.valor.original,
      modalidadeAlteracao: Number(body.valor.modalidadeAlteracao || 0)
    }
  };

  if (body.devedor?.nome) {
    data.devedor = { nome: body.devedor.nome };

    if (body.devedor.cpf) {
      data.devedor.cpf = body.devedor.cpf;
    }
  }

  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Account-Id": `${ACCOUNT_ID}`,
        "Authorization": `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}