import { expect } from "chai";
import { authenticate } from "../src/services/authService.js";

describe("AuthService - authenticate", function () {
  this.timeout(15000); // timeout para requisições externas

  it("deve retornar um token válido ao autenticar", async () => {
    const response = await authenticate();
    expect(response).to.have.property("access_token").that.is.a("string");
    expect(response).to.have.property("token_type", "bearer");
    expect(response).to.have.property("expires_in").that.is.a("number");
  });
});
