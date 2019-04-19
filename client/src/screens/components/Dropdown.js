import React, { Component, Fragment } from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";

class Dropdown extends Component {
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
    const {
      classes,
      handleChange,
      value = "",
      sampleRange = [],
      test,
      defaultVal = 0
    } = this.props;

    return (
      <FormControl>
        <InputLabel htmlFor="iterations">{"Samples"}</InputLabel>
        <Select
          value={value}
          onChange={e => handleChange(e.target.value, test)}
          inputProps={{
            name: "iterations",
            id: "iterations"
          }}
        >
          <MenuItem value={defaultVal}>
            <em>Default</em>
          </MenuItem>
          {sampleRange.map((r, i) => {
            return (
              <MenuItem key={i} value={r}>
                {`${r}`}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  }
}
const styles = theme => {
  return {};
};
export default withStyles(styles)(Dropdown);
