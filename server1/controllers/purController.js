const PUR = require("../PUR/Test2EqualPriorNoSideSuboptimal");
const PUR2 = require("../PUR/purCalculatorTenGreenBottlesTest");
const PUR3 = require("../PUR/Test1EqualPriorNoSideOptimal");

exports.test1EqualPriorNoSideOptimal = function(req, res) {
  new PUR3().testGetPurTwoPowerNLabels({
    iterations: req.query.iteration,
    resp: res
  });
};

exports.purCalculatorTenGreenBottlesTest = function(req, res) {
  new PUR2().testGetPurTenGreenBottles({
    iterations: req.query.iteration,
    res
  });
};

exports.purCalculatorTest = function(req, res) {
  new PUR().testGetPurTwoLabelsIncreasingNoise({
    iterations: req.query.iteration,
    resp: res
  });
};
