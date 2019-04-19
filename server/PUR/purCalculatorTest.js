const PurCalculator = require("./purCalculator");

class PurCalculatorTest {
  testGetPurTwoLabelNoInfo() {
    console.log("getPur");
    let predictions = [];
    let labels = [];

    this.getTestPredictions(predictions, labels, 0.0);
    let instance = new PurCalculator();
    let expResult = 0.0;
    let result = instance.getPur(predictions, labels);
  }

  testGetPurTwoLabelLotsOfInfo() {
    console.log("getPur");
    let numSamples = 10000000;
    let numLabels = 2;
    let predictions = new double[numSamples][numLabels]();
    let labels = new int[numSamples]();

    this.getTestPredictions(predictions, labels, 1000.0);
    let instance = new PurCalculator();
    let expResult = 1.0;
    let result = instance.getPur(predictions, labels);
  }

  getTestPredictions(predictions, labels, signalStrength) {
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
