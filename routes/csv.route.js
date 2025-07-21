const express = require('express');
const multer = require('multer');
const { auth } = require ("../middleware/auth.js");
const { handleCSVUpload } = require('../controller/csv.controller');

const upload = multer({ dest: '/tmp' });
const router = express.Router();
router.post('/upload-csv', upload.single('csv'),auth, handleCSVUpload);

module.exports = router;
