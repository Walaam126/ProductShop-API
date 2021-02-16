const express = require("express");
const upload = require("../middleware/multer");
const {
  shopsList,
  shopsAdd,
  shopDetail,
  shopsUpdate,
  shopsDel,
  fetchShop,
} = require("../controllers/ShopCon");
const { productsAdd } = require("../controllers/ProductCon");
//declare the router
const router = express();

router.param("shopId", async (req, res, next, shopId) => {
  const shop = await fetchShop(shopId, next);
  if (shop) {
    req.shop = shop;
    next();
  } else {
    next({
      status: 404,
      message: "Path not found",
    });
  }
});
router.get("/", shopsList);
router.post("/", upload.single("image"), shopsAdd);
router.get("/:shopId", shopDetail);
router.put("/:shopId", upload.single("image"), shopsUpdate);
router.delete("/:shopId", shopsDel);
router.post("/:shopId/products", upload.single("image"), productsAdd);
module.exports = router;
