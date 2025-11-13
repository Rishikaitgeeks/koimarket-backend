const express = require("express");
const { auth } = require ("../middleware/auth.js");
const router = express.Router();
const { updateBulkInventory} = require("../controller/inventory.controller");

router.post("/update-inventory",updateBulkInventory);
module.exports = router;
