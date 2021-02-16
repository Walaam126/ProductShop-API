const express = require("express");
const upload = require("../middleware/multer");
const {
  productsList,
  productsAdd,
  productDetail,
  productsUpdate,
  productsDel,
  fetchProduct,
} = require("../controllers/ProductCon");
//declare the router
const router = express();

router.param("productId", async (req, res, next, productId) => {
  const product = await fetchProduct(productId, next);
  if (product) {
    req.product = product;
    next();
  } else {
    next({
      status: 404,
      message: "Path not found",
    });
  }
});
router.get("/", productsList);
router.post("/", upload.single("image"), productsAdd);
router.get("/:productId", productDetail);
router.put("/:productId", upload.single("image"), productsUpdate);
router.delete("/:productId", productsDel);

module.exports = router;
