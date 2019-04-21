import React, { Component, Fragment } from "react";
import Form from "./Form";
import Button from "@material-ui/core/Button";
import Papa from "papaparse";
import List from "../components/List";
import MyDialog from "../components/Dialog";
import { endPoint } from "../../config";

import "./fileuploader.css";

class FileUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {},
      results: []
    };
  }

  //componentDidMount() {}

  //static getDerivedStateFromProps(props, state) { return null; }

  //shouldComponentUpdate(nextProps, nextState) {}

  //componentDidUpdate(prevProps, prevState) {}

  //componentDidCatch(error, info) {}

  //componentWillUnmount() {}

  handleChange = (val, key) => {
    const { form } = this.state;
    if (key === "file") {
      this.setFile();
    } else {
      this.setState({ form: { ...form, [key]: val } });
    }
  };

  submitForm = () => {
    const { form = {}, results = [] } = this.state;
    let arr = results;
    // if (!this.isValidForm) return;
    // return;
    fetch(`${endPoint.url}/file/testfile`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(res => {
        // console.log(res);
        if (res && res.code === 200) {
          arr.push(res);
          this.setState({ results: this.format(arr) });
        } else {
          alert("error");
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  format = data => {
    let arr = [];
    for (let d of data) {
      if (!d.formated) {
        arr.push({
          primaryText: d.response.testName,
          secondryText: d.response.testDec,
          results: d.result,
          formated: true
        });
      } else {
        arr.push({ ...d });
      }
    }
    return arr;
  };

  isValidForm = form => {
    return Object.values(form).length === 3;
  };

  setFile = () => {
    const { form } = this.state;
    let obj = {};
    const input = document.getElementById("file-input");
    if (input.files.length === 0) return;
    for (let i = 0; i < input.files.length; i++) {
      let file = input.files[i];
      Papa.parse(file, {
        skipEmptyLines: true,
        header: false,
        complete: f => {
          f.data.splice(0, 1);
          let fName = file.name.split(".")[0];
          if (!obj.files) {
            obj.files = {};
          }
          obj["files"] = { ...obj.files, [fName]: f.data };
          this.setState({ form: { ...form, ...obj } });
        },
        error: e => console.log(e)
      });
    }
  };

  handleDialog = open => {
    this.setState({ open });
  };

  render() {
    const { form, results } = this.state;
    const {
      username = "",
      testname = "",
      testDes = "",
      iterations = ""
    } = form;
    const formProps = {
      username,
      testname,
      testDes,
      iterations,
      handleChange: this.handleChange
    };

    return (
      <div className="file-root">
        <Form {...formProps} />
        <Button variant="contained" color="secondary" onClick={this.submitForm}>
          Upload
        </Button>
        <List data={results} />
        {/* <MyDialog open={open} /> */}
      </div>
    );
  }
}

export default FileUploader;
