const FileUploader = require("../PUR/FileUploader");
const generateTestFile = require("../PUR/generateFileTest");

exports.testFile = function(req, res) {
  const fileUploader = new FileUploader(req, res);
  fileUploader.testFile();
};

exports.createFileTest = (req, res) => {
  new generateTestFile().createFile(res);
};
