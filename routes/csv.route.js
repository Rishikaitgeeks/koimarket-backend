const express = require('express');
const { auth } = require ("../middleware/auth.js");
const { handleCSVUpload } = require('../controller/csv.controller');

const upload = require('../middleware/upload');
const router = express.Router();
router.post('/upload-csv', upload.single('csv'),auth, handleCSVUpload);

module.exports = router;
