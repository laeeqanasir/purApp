const PurCalculate = require("./purCalculator");
const SamplesFactory = require("./SampleFactory");

const samplesFactory = new SamplesFactory();

class Test1EqualPriorNoSideOptimal {
  async testGetPurTwoPowerNLabels({ iterations = 2, resp }) {
    let numSamples = 100000;
    const purCalc = new PurCalculate();
    let res = [];
    for (let n = parseInt(iterations); n < 10; n++) {
      let numLabels = Math.pow(2, n);
      let labels = samplesFactory.getLabels(numSamples, numLabels);
      let predictions = samplesFactory.getPredictions(numSamples, numLabels);

      let result = await purCalc.getPur(predictions, labels, n);
      res.push({ ...result });
    }

    console.log(res);
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
  }
}

module.exports = Test1EqualPriorNoSideOptimal;
