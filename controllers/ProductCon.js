const { Product } = require("../db/models");
const { Shop } = require("../db/models");
exports.fetchProduct = async (productId, next) => {
  try {
    const foundProduct = await Product.findByPk(productId);
    console.log(foundProduct);
    return foundProduct;
  } catch (error) {
    next(error);
  }
};
//view all
exports.productsList = async (req, res, next) => {
  try {
    const productslist = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Shop,
        as: "shop",
        attributes: ["id"],
      },
    });
    res.json(productslist);
  } catch (error) {
    next(error);
  }
};

//create product
exports.productsAdd = async (req, res, next) => {
  try {
    if (req.file)
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    req.body.shopId = req.shop.id;
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

//product details
exports.productDetail = async (req, res, next) => {
  try {
    res.json(req.product);
  } catch (error) {
    next(error);
  }
};

//update product
exports.productsUpdate = async (req, res, next) => {
  try {
    if (req.file)
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    const updstedProduct = await req.product.update(req.body);
    res.status(201).json(updstedProduct);
  } catch (error) {
    next(error);
  }
};

//delete product
exports.productsDel = async (req, res, next) => {
  try {
    await req.product.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
