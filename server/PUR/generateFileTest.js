const createCsvWriter = require("csv-writer").createArrayCsvWriter;
const SamplesFactory = require("./SampleFactory");
var path = require("path");
// var zip = require("express-zip");
const samplesFactory = new SamplesFactory();

class FileTest {
  createFile(res) {
    let predictions = samplesFactory.getPredictions(20, 5);
    // console.log(predictions);

    let labels = samplesFactory.getLabels(20, 5);
    // console.log(labels);

    // const csvWriter1 = createCsvWriter({
    //   header: ["predictions"],
    //   path: "./Predictions.csv",
    //   fieldDelimiter: ","
    // });
    // const csvWriter2 = createCsvWriter({
    //   header: ["labels"],
    //   path: "./Labels.csv"
    // });

    const csvWriter3 = createCsvWriter({
      header: ["labels", "predictions"],
      path: "./dataset.csv"
    });

    const records2 = [].concat.apply([], labels).map(l => {
      return [l];
    });
    // console.log(records2);
    let mergr = [];
    for (let i in [...Array(20)]) {
      mergr.push([records2[i], predictions[i]]);
    }

    Promise.resolve().then(() => {
      csvWriter3
        .writeRecords(mergr) // returns a promise
        .then(() => {
          console.log("...Done");
          // res.zip send file as zip to client side
          res.sendFile(
            "dataset.csv",
            { root: path.join(__dirname, "../") },
            err => {
              console.log(err);
            }
          );
          // res.zip([{ path: "./dataset.csv", name: "dataset.csv" }]); // send zip
        })
        .catch(err => {
          console.log(err);
          res.send({
            message: "error"
          });
        });
    });

    // return;
    // Promise.resolve()
    //   .then(() => {
    //     csvWriter1
    //       .writeRecords(predictions) // returns a promise
    //       .then(() => {
    //         console.log("...Done");
    //       });
    //   })
    //   .then(() => {
    //     csvWriter3
    //       .writeRecords(mergr) // returns a promise
    //       .then(() => {
    //         console.log("...Done");
    //       });
    //   })
    //   .then(() => {
    //     csvWriter2
    //       .writeRecords(records2) // returns a promise
    //       .then(() => {
    //         console.log("...Done");
    //         // res.zip send file as zip to client side
    //         res.zip([
    //           { path: "./Labels.csv", name: "Labels.csv" },
    //           { path: "./Predictions.csv", name: "predictions.csv" },
    //           { path: "./dataset.csv", name: "dataset.csv" }
    //         ]);
    //       })
    //       .catch(err => {
    //         console.log(err);
    //         res.send({
    //           message: "error"
    //         });
    //       });
    //   });
  }
}

module.exports = FileTest;
