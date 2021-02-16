const SequelizeSlugify = require("sequelize-slugify");

const ShopModel = (sequelize, DataTypes) => {
  const Shop = sequelize.define("Shop", {
    name: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING },
    slug: { type: DataTypes.STRING },
  });
  SequelizeSlugify.slugifyModel(Shop, { source: ["name"] });

  return Shop;
};

module.exports = ShopModel;
