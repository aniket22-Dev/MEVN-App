const productApp = require("express");
const ProductController = require("../Controller/product");
const router = productApp.Router();

// router.get("/getAll", ProductController.findAll);
// router.get("/:id", ProductController.findOne);
// router.post("/", ProductController.create);
// router.patch("/:id", ProductController.update);
// router.delete("/:id", ProductController.destroy);
router.get("/products", ProductController.paginated);
//router.post("/bulk", ProductController.post);

module.exports = router;
