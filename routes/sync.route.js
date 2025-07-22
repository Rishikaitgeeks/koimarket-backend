const express = require("express");
const { auth } = require ("../middleware/auth.js");
const router = express.Router();
const { runFullSync, fetchProducts } = require("../controller/sync.controller");

router.get("/sync",auth, runFullSync);
router.get("/fetch-products",auth, fetchProducts);
module.exports = router;