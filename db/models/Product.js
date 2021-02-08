const ProductModel = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: { type: DataTypes.STRING },
    price: { type: DataTypes.INTEGER },
    image: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
  });
  return Product;
};

module.exports = ProductModel;
