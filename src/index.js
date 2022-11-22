const express = require("express");
const cors = require("cors");

const { PrismaClient } = require("@prisma/client");

const { findPath, testMarketData } = require("../findPath");

const app = express();
const prisma = new PrismaClient({
  log: ["query"],
});
const port = 3333;

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

app.post("/market/create", async (req, res) => {
  const { name } = req.body;
  const newMarket = await prisma.market.create({ data: { name } });

  return res.status(201).json(newMarket);
});

app.post("/category/:marketId/create", async (req, res) => {
  const marketId = req.params.marketId;
  const { name, order, icon } = req.body;

  //Validations

  if (!name)
    return res.status(400).send({ msg: "Nome é um campo obrigatório!" });
  if (!order)
    return res
      .status(400)
      .send({ msg: "Ordem do corredor é um campo obrigatório!" });

  const newCategory = await prisma.category.create({
    data: {
      name,
      order,
      marketId,
      icon,
    },
  });

  return res.status(201).json(newCategory);
});

app.post("/product/:categoryId/create", async (req, res) => {
  const { name, description } = req.body;
  const categoryId = req.params.categoryId;
  const newCategory = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  const { name: categoryName, icon: categoryIcon } = newCategory;

  const newProduct = await prisma.product.create({
    data: {
      name,
      categoryId,
      description,
      categoryName,
      categoryIcon,
    },
  });
  return res.status(201).json(newProduct);
});

app.get("/market/read", async (req, res) => {
  const marketsList = await prisma.market.findMany();
  return res.status(200).send(marketsList);
});

app.get("/category/:marketId/read", async (req, res) => {
  const marketId = req.params.marketId;
  const categoriesList = await prisma.category.findMany({
    where: { marketId: marketId },
  });
  return res.status(200).send(categoriesList);
});

app.get("/product/:categoryId/read", async (req, res) => {
  const categoryId = req.params.categoryId;
  const productsList = await prisma.product.findMany({
    where: { categoryId: categoryId },
  });
  return res.status(200).send(productsList);
});

app.get("/category/:categoryId/update", async (req, res) => {
  const categoryId = req.params.categoryId;
  return res.status(200).send(productsList);
});

app.get("/product/update", async (req, res) => {
  return res.status(200).send(productsList);
});

app.get("/market/delete", async (req, res) => {
  return res.status(200).send(productsList);
});

app.get("/category/delete", async (req, res) => {
  return res.status(200).send(productsList);
});

app.get("/product/delete", async (req, res) => {
  return res.status(200).send(productsList);
});
