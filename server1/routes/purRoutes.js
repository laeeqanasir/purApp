var express = require("express");
var router = express.Router();

//imported controller where the HTTP functions are written
var purController = require("../controllers/purController");

/* Routes */
router.get("/noSideOptimal", purController.test1EqualPriorNoSideOptimal); //done
router.get("/bottleTest", purController.purCalculatorTenGreenBottlesTest); //done
router.get("/noSideSuboptimal", purController.purCalculatorTest); // done

module.exports = router;
