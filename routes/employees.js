var express = require('express');
var router = express.Router();

var employee = require("../controllers/EmployeeController.js");
var index = require("../controllers/IndexController.js");
router.get('/',employee.list);
router.get('/create',employee.create);
router.post('/save',employee.save);
router.get('/show/:id',employee.edit);
router.post('/update/:id',employee.update);
router.post('/delete/:id',employee.delete);
router.get('/search/:q',employee.search);
module.exports = router;