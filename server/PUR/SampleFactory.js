/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const Util = require("./utils");
const util = new Util();

class SamplesFactory {
  getPredictions(numSamples, numLabels) {
    let predictions = [];
    for (let i = 0; i < numSamples; i++) {
      predictions[i] = new Array(numLabels);
    }
    let prior = 1.0 / parseFloat(numLabels).toFixed(1);
    for (let thisSample = 0; thisSample < numSamples; thisSample++) {
      let sum = 0;
      for (let thisLabel = 0; thisLabel < numLabels; thisLabel++) {
        predictions[thisSample][thisLabel] = prior;
      }
    }
    return predictions;
  }
  // // let numSamples, let numLabels, double noisePower
  getNoisyPredictions(numSamples, numLabels, noisePower) {
    let predictions = [];
    for (let i = 0; i < numSamples; i++) {
      predictions[i] = [];
    }
    const prior = 1.0 / parseFloat(numLabels);
    for (let thisSample = 0; thisSample < numSamples; thisSample++) {
      let sum = 0;
      for (let thisLabel = 0; thisLabel < numLabels; thisLabel++) {
        if (predictions[thisSample] == undefined) continue;
        let r = util.nextDouble(); //R.nextDouble()

        predictions[thisSample][thisLabel] =
          (1 - noisePower) * prior + noisePower * r;

        sum += predictions[thisSample][thisLabel];
      }
      for (let thisLabel = 0; thisLabel < numLabels; thisLabel++) {
        predictions[thisSample][thisLabel] /= sum;
      }
    }

    return predictions;
  }

  // let numSamples, let numLabels
  getLabels(numSamples, numLabels) {
    let labels = [];
    for (let i = 0; i < numSamples; i++) {
      labels[i] = util.nextInt(numLabels); //r.nextInt()
    }
    return labels;
  }
}

module.exports = SamplesFactory;
