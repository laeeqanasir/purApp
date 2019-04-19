import React, { Component, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { homeButtons } from "./config";

import "./home.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  //componentDidMount() {}

  //static getDerivedStateFromProps(props, state) { return null; }

  //shouldComponentUpdate(nextProps, nextState) {}

  //componentDidUpdate(prevProps, prevState) {}

  //componentDidCatch(error, info) {}

  //componentWillUnmount() {}

  render() {
    const { classes, history } = this.props;

    return (
      <div>
        <Grid container spacing={24} direction="column">
          <Grid item xs={12}>
            <Grid container spacing={24}>
              <Grid item xs={12} className={classes.descRoot}>
                <p className={classes.intro}>description</p>
              </Grid>
              {homeButtons(history).map((menu, i) => {
                return (
                  <Grid key={i} item xs={12} className={classes.item}>
                    <menu.button
                      key={i}
                      {...menu.buttonProps}
                      className={classes.btnRoot}
                      onClick={menu.onClick}
                    >
                      {menu.buttonText}
                      {menu.buttonIcon && <menu.buttonIcon />}
                    </menu.button>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styles = theme => ({
  intro: {
    textAlign: "center"
  },
  item: {
    textAlign: "center"
  },
  btnRoot: {
    minWidth: 200
  },
  descRoot: {
    minHeight: 100
  }
});

export default withStyles(styles)(Home);
