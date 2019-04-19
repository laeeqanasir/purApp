const createCsvWriter = require("csv-writer").createArrayCsvWriter;
const SamplesFactory = require("./SampleFactory");
var zip = require("express-zip");
const samplesFactory = new SamplesFactory();

class FileTest {
  createFile(res) {
    let predictions = samplesFactory.getPredictions(20, 5);

    let labels = samplesFactory.getLabels(20, 5);

    const csvWriter1 = createCsvWriter({
      header: ["predictions"],
      path: "./Predictions.csv",
      fieldDelimiter: ","
    });
    const csvWriter2 = createCsvWriter({
      header: ["labels"],
      path: "./Labels.csv"
    });

    const records2 = [].concat.apply([], labels).map(l => {
      return [l];
    });

    // return;
    Promise.resolve()
      .then(() => {
        csvWriter1
          .writeRecords(predictions) // returns a promise
          .then(() => {
            console.log("...Done");
          });
      })
      .then(() => {
        csvWriter2
          .writeRecords(records2) // returns a promise
          .then(() => {
            console.log("...Done");
            // res.zip send file as zip to client side
            res.zip([
              { path: "./Labels.csv", name: "Labels.csv" },
              { path: "./Predictions.csv", name: "predictions.csv" }
            ]);
          })
          .catch(err => {
            console.log(err);
            res.send({
              message: "error"
            });
          });
      });
  }
}

module.exports = FileTest;
