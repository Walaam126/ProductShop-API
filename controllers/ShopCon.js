const { Shop } = require("../db/models");
const { Product } = require("../db/models");

exports.fetchShop = async (shopId, next) => {
  try {
    const foundShop = await Shop.findByPk(shopId);
    console.log(foundShop);
    return foundShop;
  } catch (error) {
    next(error);
  }
};
//view all
exports.shopsList = async (req, res, next) => {
  try {
    const shopslist = await Shop.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Product,
        as: "products",
        attributes: ["id"],
      },
    });
    res.json(shopslist);
  } catch (error) {
    next(error);
  }
};

//create shop
exports.shopsAdd = async (req, res, next) => {
  try {
    req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    const newShop = await Shop.create(req.body);
    res.status(201).json(newShop);
  } catch (error) {
    next(error);
  }
};

//shop details
exports.shopDetail = async (req, res, next) => {
  try {
    res.json(req.shop);
  } catch (error) {
    next(error);
  }
};

//update shop
exports.shopsUpdate = async (req, res, next) => {
  try {
    req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    const updstedShop = await req.shop.update(req.body);
    res.status(201).json(updstedShop);
  } catch (error) {
    next(error);
  }
};

//delete shop
exports.shopsDel = async (req, res, next) => {
  try {
    await req.shop.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
