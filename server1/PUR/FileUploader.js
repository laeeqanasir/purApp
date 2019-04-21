const PurCalculator = require("./purCalculator");

class FileUploader {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  async testFile() {
    const { req, res } = this;
    const { uName, tName, tDec, files = {}, iterations } = req.body;
    let { dataset = [] } = files;
    let modifiedLabels = [],
      predictions = [];
    for (let ds of dataset) {
      modifiedLabels.push(parseInt(ds[0]));
      predictions.push(ds[1].split(","));
    }
    if (iterations > 0) {
      predictions = predictions.splice(0, iterations);
      modifiedLabels = modifiedLabels.splice(0, iterations);
    }

    // console.log(predictions, modifiedLabels);

    try {
      const result = await new PurCalculator().getPur(
        predictions,
        modifiedLabels
      );

      let obj = {
        _id: Math.random(),
        username: uName,
        testName: tName,
        testDec: tDec,
        result: { ...result }
        // labels: modifiedLabels,
        // predictions: predictions
      };

      res.send({
        message: "fucntion ran successfully",
        result: result,
        code: 200,

        response: obj,
        keys: ["priorEntropy:", "posteriorEntropy:", "pur"]
      });
    } catch (error) {
      res.send({
        message: "error",
        code: 500,
        result: null,
        response: null,
        keys: ["priorEntropy:", "posteriorEntropy:", "pur"]
      });
    }
  }
}

module.exports = FileUploader;
