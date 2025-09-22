import { createPixCharge } from "../services/chargeService.js";

export const newPixCharge = async (req, res) => {
  try {
    const response = await createPixCharge(req.body, req.session.token);
    req.session.pixCharge = response;
    return response;
  } catch (error) {
    console.log('chargecontroller error')
    console.log(error);
  }
}