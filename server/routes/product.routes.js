const express = require("express");
const productcontroller = require("../controllers/products.controller");
const productRouter = express.Router();

productRouter.get("/getproducts",productcontroller.getProduct)
productRouter.get("/getProductById/:id",productcontroller.getProductById)
productRouter.post("/post", productcontroller.postData);
productRouter.delete("/post", productcontroller.deleteProductByname);





module.exports = productRouter;
