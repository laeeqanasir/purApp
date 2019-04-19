import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { endPoint } from "../../config";
import { tests } from "../../utils/tests";
import { dialogConfirmText, dialogTitlText } from "../../utils/testStrings";
import Table from "../components/table/Table";

// Button components

import Button from "@material-ui/core/Button";

//alert components

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import WithTestHOC from "./WithTestHoc";

//styling JSS stuff
export const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: "0rem",
    textAlign: "center",
    marginBottom: 10
  },
  paper: {
    padding: theme.spacing.unit * 2,
    marginTop: "2rem",
    textAlign: "center",
    color: theme.palette.text.secondary,
    minWidth: 235
  },

  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  testDesc: {
    textAlign: "justify"
  }
});

class PurTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      data: "",
      iterations: { bottleTest: 10, Suboptimal: 0, SideOptimal: 2 }
    };
  }

  //API CALLS ONCLICK OF BUTTONS
  //Initiates test one and get results from server
  // https://pur-calc-server.herokuapp.com

  testOneClick = test => {
    const { iterations } = this.state;
    //done
    this.calculateProgress(true, 50);

    fetch(`${endPoint.url}${test.endPoint}=${iterations["Suboptimal"]}`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(res => {
        // console.log(res);

        if (res.message) {
          this.calculateProgress(false);
          this.setState({
            data: this.getData(res),
            open: true
          });
        }
      });
  };

  getData = ({ result, keys }) => {
    let arr = [];
    let key;
    for (let i = 0; i < result.length; i++) {
      let rec = result[i];
      let res = [];
      for (let k of keys) {
        key = Object.keys(k)[0];
        if (key === "pur" && rec[key] < 0) {
          res.push(`${rec[key]}*`);
        } else {
          res.push(rec[key]);
        }
      }
      arr.push(res);
    }
    return { keys, data: arr };
  };

  //Initiates test two and get results from server
  testTwoClick = test => {
    const { iterations } = this.state;

    this.calculateProgress(true, 50);
    fetch(`${endPoint.url}${test.endPoint}=${iterations["SideOptimal"]}`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(res => {
        this.calculateProgress(false);

        if (res.message) {
          this.setState({
            data: this.getData(res),
            open: true
          });
        }
      });
  };

  //Initiates test one and get results from server
  testThreeClick = test => {
    const { iterations } = this.state;
    const { handleLodaing, handleProgress } = this.props;

    this.calculateProgress(true, 10);
    //done
    fetch(`${endPoint.url}${test.endPoint}=${iterations["bottleTest"]}`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(res => {
        this.calculateProgress(false);
        if (res.message) {
          this.setState({
            data: this.getData(res),
            open: true
          });
        }
      });
  };

  calculateProgress = (show, inc = 0) => {
    console.log(show);

    const { handleProgress, handleLodaing } = this.props;
    if (show) {
      handleLodaing(true);
      this.intrvl = setInterval(() => {
        const { completed } = this.props;
        if (completed > 100) {
          handleProgress(10);
        } else {
          handleProgress(completed + inc);
        }
      }, 500);
    } else {
      console.log(this.intrvl);
      handleLodaing(false);
      clearInterval(this.intrvl);
      handleProgress(0);
    }
  };

  //to open/close dialog
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleIterationInput = (value, test) => {
    const { iterations } = this.state;
    this.setState({ iterations: { ...iterations, [test]: value } });
  };

  render() {
    const { data, iterations } = this.state;

    // console.log(data);
    //getting CSS properties from parent
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={0}
        >
          {tests["purTest"].map((test, i) => {
            return (
              <Grid key={i} item xs={12} sm={8} id={`${test.testName}`}>
                <Paper className={classes.paper}>
                  <h2>{test.heading}</h2>
                  <p className={classes.testDesc}>{test.desc}</p>
                  {test.button && (
                    <test.button
                      {...test.btnProps}
                      className={classes.button}
                      onClick={() => this[test.onClick](test)}
                    >
                      {test.buttonText}

                      {test.buttonIcon && (
                        <test.buttonIcon className={classes.rightIcon} />
                      )}
                    </test.button>
                  )}
                  {test.testIterationDropDown && (
                    <test.testIterationDropDown
                      {...test.dropdownProps}
                      value={iterations[test.testName]}
                      handleChange={this.handleIterationInput}
                    />
                  )}
                </Paper>
              </Grid>
            );
          })}
        </Grid>

        {/* Dialog code */}

        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>{dialogTitlText}</DialogTitle>
          <DialogContent>
            <Table tHead={data.keys} tRow={data.data} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              {dialogConfirmText}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

PurTest.propTypes = {
  classes: PropTypes.object.isRequired
};

export default WithTestHOC(withStyles(styles)(PurTest));
// "proxy": "http://localhost:3001",
