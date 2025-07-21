const express = require("express");
const { auth } = require ("../middleware/auth.js");
const router = express.Router();
const { getSyncData } = require("../controller/pagination.controller");
const {getOrder} = require("../controller/order.controller.js");

router.get("/syncpage",auth, getSyncData); 
router.get("/orderpage",auth,getOrder);
module.exports = router;
