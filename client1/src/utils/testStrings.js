export const dialogConfirmText = "0K";
export const dialogTitlText = "Results";
export const dropDownDefautltText = "Times roll the dice";
export const testStrings = [
  /// add strings here that we are going to use in tests each test has a index use same index here as well.
  {
    index: 0,
    testName: "Suboptimal",
    heading: "No Side Suboptimal",
    desc: `This test uses a 'fair coin' (two equally probable outcomes),tossed 10,000 times in each trial. Either side is equally likely to occur ('equal prior').For each toss, without any side information, the optimal prediction is 50/50.This test examines suboptimal predictions: predictions away from this 50/50 optimal.`,
    sampleRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    defaultVal: 0
  },
  {
    index: 1,
    heading: "No Side Optimal",
    testName: "SideOptimal",
    sampleRange: [2, 3, 4, 5, 6, 7, 8, 9],
    defaultVal: 2,

    desc: `This test creates an N-sided dice, and rolls it 10,000 times. 
  Each side is equally likely to occur. 
  N is varied from 2 to 10. (a two-diced dice is actually a coin)
  For each roll of the dice, the best possible predictions are created, 
  given no additional information ('side information') about the outcome.

  This prediction is simply 1/N, 
  and we are expecting that it will provide no information, 
  in other words that the 'prior entropy' is equal to the 'posterior entropy'.
  The 'prior entropy' is calculated from the distribution of outcomes. 
  The 'posterior entropy is calculated as the mean log probability of the prediction.

  For each value of N, the test asserts that:
  1.1 the prior entropy is equal to log(N) (to within 0.005)
  1.2 the posterior entropy is also equal to log(N) (to within 0.005)
  The 'proportion of uncertainty removed' is then zero (within corresponding limits)`
  },
  {
    index: 2,
    heading: "Bottle Test",
    testName: "bottleTest",
    sampleRange: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    defaultVal: 10,

    desc: `This test creates a random number between 1 and 1024 and measures the information 
  provided by a prediction of what is the random number, 
  where there is some informformtion provided, to make the prediction. 

  Initially, there are 10 bits of uncertainty about the identity of the number (2^10=1024). 

  Specifically, the predictor is told which fraction of the possible numbers, 
  this random number belongs to. 
  The prediction is then made, incorporating this information. 

  When the predictor is told which half of the numbers that the random number resides, 
  one bit of information is provided: the PUR is 10%.

  When the predictor is told which quarter of the numbers that the random number resides, 
  two bits of information are provided: the PUR is 20%.

  When the predictor is told which eigth of the numbers that the random number resides, 
  three bits of information are provided: the PUR is 30%.

  This continues until there is a choice between just two numbers, which is the chosen random number.
  There is one bit of uncertainty remaining and 10 have been removed; the PUR is 90%.`
  },
  {
    index: 3,
    heading: "Create file test",
    desc: "Some descripton of the test",
    testName: "fileWrite"
  }
];
