const express = require("express");
const cors = require("cors");

const { findPath, testMarketData } = require("./findPath");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

app.get("/", (req, res) => {
  return res.send("Bem vindo a API");
});

app.get("/find", (req, res) => {
  const { userProducts } = req.body;

  const path = findPath(userProducts, testMarketData);

  return res.send(path);
});
