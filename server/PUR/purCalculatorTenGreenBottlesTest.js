const PurCalculator = require("./purCalculator");
const Util = require("./utils");
const util = new Util();

class PurCalculatorTenGreenBottlesTest {
  async testGetPurTenGreenBottles({ iterations = 0, res }) {
    let numSamples = 100000;
    // let numSamples = 1000;
    let numGreenBottles = parseInt(iterations);
    let numLabels = Math.pow(2, numGreenBottles);
    let purCalc = new PurCalculator();
    let labels = [],
      results = [],
      predictions = [],
      localPrediction = [];

    for (let i = 0; i < numSamples; i++) {
      labels[i] = util.nextInt(numLabels);
      localPrediction[i] = [];
    }
    for (
      let thisGreenBottle = numGreenBottles;
      thisGreenBottle > 0;
      thisGreenBottle--
    ) {
      let numPossibleLabels = Math.pow(2, thisGreenBottle);
      predictions = await this.getPredictions(
        labels,
        numLabels,
        numPossibleLabels,
        localPrediction
      );

      let result = await purCalc.getPur(predictions, labels, thisGreenBottle);
      // console.log(predictions.length);
      // console.log(thisGreenBottle);
      // console.log(labels.length);
      // console.log(numPossibleLabels);
      // console.log(numLabels);
      // console.log("*********************************888");
      console.log(result);
      results.push({ ...result });
    }

    res.send({
      message: "fucntion ran successfully",
      result: results,
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

  getPredictions(labels, numLabels, numPossibleLabels, localPrediction) {
    return new Promise((resolve, reject) => {
      // let predictions = [];
      let predictions = localPrediction;
      let seed = [];
      // for (let i = 0; i < labels.length; i++) {
      //   predictions[i] = [];
      // }
      for (let i = 0; i < numPossibleLabels; i++) {
        seed[i] = 1.0 / parseFloat(numPossibleLabels);
      }

      for (let thisSample = 0; thisSample < labels.length; thisSample++) {
        seed = this.shuffle(seed);
        // console.log(seed);

        let thisLabel = labels[thisSample];
        if (seed[thisLabel] === 0 || !seed[thisLabel]) {
          seed[thisLabel] = 1.0 / parseFloat(numPossibleLabels);
          seed = this.zeroNext(seed, thisLabel);
        }
        util.copyArray(seed, 0, predictions[thisSample], 0, numLabels);
      }

      let errorIndex = this.check(predictions, labels);
      if (errorIndex >= 0) {
        console.log("error in predictions at line " + errorIndex);
        // return null;
        reject(null);
      }

      // return predictions;
      resolve(predictions);
    });
  }

  shuffle(ar) {
    for (let i = ar.length - 1; i > 0; i--) {
      let index = util.nextInt(i + 1);
      // Simple swap
      let a = ar[index];
      ar[index] = ar[i];
      ar[i] = a;
    }

    return ar;
  }

  zeroNext(seed, thisLabel) {
    let numLabels = seed.length;
    let nextIndex = thisLabel + 1;
    let done = false;
    while (!done) {
      if (nextIndex >= numLabels) {
        nextIndex = 0;
      }
      if (seed[nextIndex] > 0) {
        seed[nextIndex] = 0;
        done = true;
      }
      nextIndex++;
    }

    return seed;
  }

  check(predictions, labels) {
    let numSamples = predictions.length;
    let numLabels = predictions[0].length;
    for (let i = 0; i < numSamples; i++) {
      let labelIndex = labels[i];
      if (labelIndex >= numLabels) {
        return i;
      }
      if (predictions[i][labelIndex] < 0.000000001) {
        return i;
      }
      let sum = 0;

      for (let j = 0; j < numLabels; j++) {
        sum += predictions[i][j];
      }
      if (Math.abs(sum - 1) > 0.00001) {
        return i;
      }
    }
    return -1;
  }
}

module.exports = PurCalculatorTenGreenBottlesTest;
