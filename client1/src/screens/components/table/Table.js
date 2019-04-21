import React, { Component, Fragment } from "react";

import "./table.css";

class Table extends Component {
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
  getValue = obj => {
    return Object.values(obj)[0];
  };

  render() {
    const { tHead, tRow } = this.props;
    return (
      <table className="result-table-root">
        <tbody>
          <tr>
            {tHead.map((th, i) => {
              return <th key={i}>{this.getValue(th)}</th>;
            })}
          </tr>
          {tRow.map((tr, i) => {
            return (
              <tr key={i}>
                {tr.map((td, i) => {
                  return <td key={i}>{td}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Table;
