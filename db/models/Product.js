const SequelizeSlugify = require("sequelize-slugify");

const ProductModel = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, defaultValue: 50, validate: { min: 10 } },
    image: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    slug: { type: DataTypes.STRING },
  });
  SequelizeSlugify.slugifyModel(Product, { source: ["name"] });

  return Product;
};

module.exports = ProductModel;
