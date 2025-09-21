import express from "express";
import session from "express-session";
import { login } from "./controllers/loginController.js";

const app = express();
const port = 3000;

// Configura body parser para POST
app.use(express.urlencoded({ extended: true }));

// Configura sessão simples
app.use(session({
  secret: "segredo",
  resave: false,
  saveUninitialized: true
}));

// Rota para processar login
app.post("/login", login);

app.get("/", (req, res) => {
  if (req.session.token) {
    res.send(`Autenticado! Token: ${req.session.token}`);
  } else {
    res.redirect("/login");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});