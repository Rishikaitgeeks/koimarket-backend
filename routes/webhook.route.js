const express = require("express");
const {Webhook} = require("../controller/webhook.controller");
const {Webhook2} = require("../controller/webhook2.controller");
const {Webhook3 } = require("../controller/webhook3.controller");
const {Webhook4 } = require("../controller/webhook4.controller");
const {Product_delete_retail} = require("../controller/Webhook_product_delete_retail");
const {Product_delete_wholesale} = require("../controller/Webhook_product_delete_wholesale");
const router = express.Router();

router.post("/order",Webhook);//team-gamma
router.post("/order2",Webhook2);//headless
router.post("/order-creation" , Webhook3); //team-gamma
router.post("/order-creation2" , Webhook4);//headless
router.post("/product-delete" , Product_delete_wholesale); //team-gamma
router.post("/product-delete2" , Product_delete_retail);//headless
module.exports = router;
