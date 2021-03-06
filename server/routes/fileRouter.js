var express = require("express");
var router = express.Router();
const fileController = require("../controllers/fileController");

module.exports = function() {
  router.post("/testfile", (req, res) => fileController.testFile(req, res));
  router.get("/createFile", (req, res) =>
    fileController.createFileTest(req, res)
  ); // done

  return router;
};
