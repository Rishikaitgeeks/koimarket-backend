const express = require("express");
const { auth } = require ("../middleware/auth.js");
const router = express.Router();
const { runFullSync, fetchProducts,fetchStatus } = require("../controller/sync.controller");

router.get("/sync", runFullSync);
router.get("/fetch-status",auth, fetchStatus);
router.get("/fetch-products", fetchProducts);
module.exports = router;