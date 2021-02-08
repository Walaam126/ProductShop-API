const express = require("express");
const db = require("./db/models");
const app = express();
const { Product } = require("./db/models");

//always before all routes
app.use(express.json());

//view all
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

//delete product
app.delete("/products/:productId", async (req, res) => {
  try {
    const deleted = await Product.findByPk(req.params.productId);
    if (deleted) {
      await deleted.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//create product
app.post("/products", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//update product
app.put("/products/:productId", async (req, res) => {
  try {
    const updated = await Product.findByPk(req.params.productId);
    if (updated) {
      await updated.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

db.sequelize.sync();

app.listen(8000);
