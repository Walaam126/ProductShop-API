const express = require("express");
const db = require("./db/models");
const app = express();
const { Product } = require("./db/models");

//always before all routes
app.use(express.json());

let products = require("./data");

app.get("/products", async (req, res) => {
  try {
    const productslist = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(productslist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/products/:productId", (req, res) => {
  const deleted = products.find(
    (product) => product.id === +req.params.productId
  );
  if (deleted) {
    products = products.filter(
      (product) => product.id !== +req.params.productId
    );
    res.status(204).end();
  } else {
    res.status(404).json({ message: "product not found" });
  }
});

db.sequelize.sync();
app.post("/products", (req, res) => {
  req.body.id = products[products.length - 1].id + 1;
  products.push(req.body);
  res.status(201).json(req.body);
});
app.listen(8000);
