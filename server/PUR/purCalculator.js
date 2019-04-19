class Result {
  constructor() {
    this.pur;
    this.priorEntropy;
    this.posteriorEntropy;
  }

  toString() {
    return this.priorEntropy + "\t" + this.posteriorEntropy + "\t" + this.pur;
  }
}

class PurCalculator {
  getPur(predictions, labels, noiseFactor) {
    return new Promise((res, rej) => {
      let numLabels = predictions[0].length;
      let priorEntropy = this.getPriorEntropy(labels, numLabels);
      let posteriorEntropy = this.getPosteriorEntropy(predictions, labels);

      res(this.getPurCalc(priorEntropy, posteriorEntropy, noiseFactor));
    });
  }

  getPurCalc(priorEntropy, posteriorEntropy, noiseFactor) {
    let r = new Result();
    r.priorEntropy = priorEntropy;
    r.posteriorEntropy = posteriorEntropy;
    r.pur = (priorEntropy - posteriorEntropy) / priorEntropy;
    r.n = noiseFactor;
    return r;
  }

  getPriorEntropy(labels, numLabels) {
    let hist = [];
    let sum = 0.0;
    let numSamples = labels.length;
    for (let i = 0; i < numSamples; i++) {
      let pos = labels[i];
      if (!hist[pos]) {
        hist[pos] = 0;
      }
      hist[pos]++;
    }
    for (let i = 0; i < numLabels; i++) {
      if (hist[i] > 0) {
        let p = parseFloat(hist[i]) / parseInt(numSamples);
        sum -= p * Math.log(p);
      }
    }
    return sum / Math.log(2);
  }

  getPosteriorEntropy(predictions, labels) {
    let numSamples = predictions.length;
    let log2 = Math.log(2);
    let sumLogP = 0.0;
    // console.log("labelIndex", predictions);
    for (let i = 0; i < numSamples; i++) {
      let labelIndex = labels[i];
      let logp = Math.log(predictions[i][labelIndex]);
      sumLogP -= logp / log2;
    }
    let posteriorEntropy = parseFloat(sumLogP / numSamples);

    return posteriorEntropy;
  }
}

module.exports = PurCalculator;
