import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FileSaver from "file-saver";
// Button components

import { buttonText, endPoint } from "../../config";
import { tests } from "../../utils/tests";

import { styles } from "../test/index";

class FileWriter extends Component {
  state = { data: "", open: false };
  testOneClick = test => {
    this.props.handleLodaing(true);
    fetch(`${endPoint.url}${test.endPoint}`, {
      method: "GET"
    })
      .then(res => res.blob())
      .then(res => {
        this.props.handleLodaing(false);
        // converting data into zip file form saving
        FileSaver.saveAs(res, "dataset.csv");
      })
      .catch(e => {
        this.props.handleLodaing(false);
        this.setState({
          data: "Error",
          open: true
        });
      });
  };

  render() {
    const { classes } = this.props;
    const { data = "" } = this.state;

    return (
      <div className={classes.root}>
        {/* Using grid to align tests in a single row */}
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={24}
        >
          {tests["fileTest"].map((test, i) => {
            return (
              <Grid key={i} item xs={12} sm={6}>
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
                </Paper>
              </Grid>
            );
          })}
          {/* <Grid item xs={12}>
            <h1>File writer</h1>
          </Grid> */}
          {/* <Grid item xs={12} sm={4}>
            <Paper className={classes.paper}>
              <h2>Create file test</h2>
              <p>Some descripton of the test</p>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={this.testOneClick}
              >
                {buttonText}
                <DeleteIcon className={classes.rightIcon} />
              </Button>
            </Paper>
          </Grid> */}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(FileWriter);
