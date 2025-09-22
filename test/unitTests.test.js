import { expect } from "chai";
import { login } from "../src/controllers/loginController.js";
import { newPixCharge } from "../src/controllers/chargeController.js";

let accessToken;

describe("LoginController", function () {
  this.timeout(15000); // timeout para requisições externas

  it("deve retornar um token válido ao autenticar", async () => {
    const req = {
      session: {}
    }
    const response = await login(req);
    expect(response).to.have.property("access_token").that.is.a("string");
    expect(response).to.have.property("token_type", "bearer");
    expect(response).to.have.property("expires_in").that.is.a("number");
    accessToken = response.access_token;
  });
});

describe("ChargeController", function () {
  this.timeout(20000); // timeout maior para requisições externas

  it("deve criar uma cobrança Pix usando o token obtido via controller", async () => {
    if (!accessToken) throw new Error("Token de autenticação não disponível!");

    const req = {
      body: { 
        valor: "10.00",
        nomeRecebedor: 'João da Silva',
        expiracao: 3600,
        devedor: { nome: "Carlos" }
      },
      session: { token: accessToken }
    };

    let chargeResult;

    await newPixCharge(req);

    expect(chargeResult).to.have.property("id").that.is.a("string");
    expect(chargeResult).to.have.property("status").that.is.a("string");
  });
});
