import React, { Component, Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

class Form extends Component {
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
      handleChange = () => {},
      uName,
      tName,
      tDec,
      iterations
    } = this.props;

    return (
      <div className="form-root">
        <TextField
          id="field1"
          label="User name"
          value={uName}
          onChange={e => handleChange(e.target.value, "uName")}
          margin="normal"
        />
        <TextField
          id="field2"
          label="Test name"
          value={tName}
          onChange={e => handleChange(e.target.value, "tName")}
          margin="normal"
        />
        <TextField
          id="field3"
          label="Test description"
          value={tDec}
          onChange={e => handleChange(e.target.value, "tDec")}
          margin="normal"
          multiline
          rowsMax="6"
        />
        <FormControl>
          <InputLabel htmlFor="iterations">Iterations</InputLabel>
          <Select
            value={iterations}
            autoWidth={true}
            onChange={e => handleChange(e.target.value, "iterations")}
            inputProps={{
              name: "iterations",
              id: "iterations",
              className: "selectInput"
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={100}>100</MenuItem>
            <MenuItem value={500}>500</MenuItem>
          </Select>
        </FormControl>

        <div className="form-file-root">
          <input
            id="file-input"
            type="file"
            accept=".csv"
            onChange={e => handleChange("e", "file")}
          />
        </div>
      </div>
    );
  }
}

export default Form;
