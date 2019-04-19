const PurCalculator = require("./purCalculator");
const assert = require("assert");
const SamplesFactory = require("./SampleFactory");

class Test2EqualPriorNoSideSuboptimal {
  async testGetPurTwoLabelsIncreasingNoise({ iterations = 0, resp }) {
    let numSamples = 100000;
    let numLabels = 2;
    let res = [];

    let labels = new SamplesFactory().getLabels(numSamples, numLabels);
    let purCalc = new PurCalculator();

    for (
      let noiseFactor = parseFloat(iterations);
      noiseFactor <= 1.0;
      noiseFactor += 0.1
    ) {
      // console.log(noiseFactor, parseFloat(iterations));
      let predictions = new SamplesFactory().getNoisyPredictions(
        numSamples,
        numLabels,
        noiseFactor
      );
      let result = await purCalc.getPur(predictions, labels, noiseFactor);
      console.log(result);

      res.push({ ...result });
      // console.log(noiseFactor + "\t" + result.toString());
    }
    // console.log(res);
    resp.send({
      message: "fucntion ran successfully",
      result: res,
      keys: [
        { n: "N" },
        { priorEntropy: "Prior Entropy" },
        { posteriorEntropy: "Posterior Entropy" },
        { pur: "PUR" },
        { er: "Expected result" },
        { fn: "Foot note" }
      ]
    });

    // return res;
  }

  testGetPurTwoLabelLotsOfInfo() {
    console.log("getPur");
    let predictions = [];
    let labels = [];

    this.getUniformDistTestPredictions(predictions, labels, 1000.0);
    let instance = new PurCalculator();
    let expResult = 1.0;
    let result = instance.getPur(predictions, labels);
    assert.equals(expResult, result, 0.005);
  }

  getUniformDistTestPredictions(predictions, labels, signalStrength) {
    let random = new Random();
    let numLabels = predictions[0].length;
    let numSamples = predictions.length;
    for (let i = 0; i < numSamples; i++) {
      let sum = 0.0;
      for (let j = 0; j < numLabels; j++) {
        predictions[i][j] = random.nextDouble();
        sum += predictions[i][j];
      }
      labels[i] = random.nextInt(numLabels);
      predictions[i][labels[i]] += signalStrength;
      sum += signalStrength;
      for (let j = 0; j < numLabels; j++) {
        predictions[i][j] /= sum;
      }
    }
  }
}

module.exports = Test2EqualPriorNoSideSuboptimal;
