import Button from "@material-ui/core/Button";
import updateIcon from "@material-ui/icons/Update";
import { testStrings } from "./testStrings";
import Dropdown from "../screens/components/Dropdown";

const buttonText = "Run test";

const purTest = [
  {
    index: 1,
    heading: testStrings[1].heading,
    desc: testStrings[1].desc,
    button: Button,
    btnProps: { variant: "contained", color: "secondary" },
    onClick: "testTwoClick", // give function name here and then make same name function in side js file
    buttonText: buttonText,
    buttonIcon: updateIcon,
    testIterationDropDown: Dropdown,
    testName: testStrings[1].testName,
    endPoint: "/pur/noSideOptimal?iteration", // no space
    dropdownProps: {
      test: testStrings[1].testName,
      sampleRange: testStrings[1].sampleRange,
      defaultVal: testStrings[1].defaultVal
    }
  },
  {
    index: 0,
    heading: testStrings[0].heading,
    desc: testStrings[0].desc,
    button: Button,
    btnProps: { variant: "contained", color: "secondary" },
    onClick: "testOneClick", // give function name here and then make same name function in side js file
    buttonText: buttonText,
    buttonIcon: updateIcon,
    testIterationDropDown: Dropdown,
    testName: testStrings[0].testName,
    endPoint: "/pur/noSideSuboptimal?iteration",

    dropdownProps: {
      test: testStrings[0].testName,
      sampleRange: testStrings[0].sampleRange,
      defaultVal: testStrings[0].defaultVal
    }
  },
  {
    index: 2,
    heading: testStrings[2].heading,
    desc: testStrings[2].desc,
    button: Button,
    btnProps: { variant: "contained", color: "secondary" },
    onClick: "testThreeClick", // give function name here and then make same name function in side js file
    buttonText: buttonText,
    buttonIcon: updateIcon,
    testIterationDropDown: Dropdown,
    testName: testStrings[2].testName,
    endPoint: "/pur/bottleTest?iteration",

    dropdownProps: {
      test: testStrings[2].testName,
      sampleRange: testStrings[2].sampleRange,
      defaultVal: testStrings[2].defaultVal
    }
  }
];

const fileTest = [
  {
    index: 3,
    heading: testStrings[3].heading,
    desc: testStrings[3].desc,
    button: Button,
    btnProps: { variant: "contained", color: "secondary" },
    onClick: "testOneClick", // give function name here and then make same name function inside js file
    buttonText: buttonText,
    buttonIcon: updateIcon,
    testName: testStrings[2].testName,
    endPoint: "/file/createFile"
  }
];

export const tests = {
  purTest: purTest,
  fileTest: fileTest
};

export { purTest, fileTest };
