const FileUploader = require("../PUR/FileUploader");

exports.testFile = function(req, res) {
  const fileUploader = new FileUploader(req, res);
  fileUploader.testFile();
};

exports.createFileTest = (req, res) => {
  new FileTest().createFile(res);
};
