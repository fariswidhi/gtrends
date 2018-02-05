var express = require('express');
var index = require("../controllers/IndexController.js");
var router = express.Router();

/* GET home page. */
router.get('/', index.list);
router.get('/:q', index.search);

module.exports = router;
