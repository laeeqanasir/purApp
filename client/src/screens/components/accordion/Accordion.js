import React, { Component, Fragment } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";

import "./accordion.css";

class MyAccordion extends Component {
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
    const { accordHeading, accordBody = () => {}, uuid } = this.props;

    return (
      <div>
        <AccordionItem key={uuid} className="test-accord-item">
          <AccordionItemHeading className="test-accord-item-head">
            <AccordionItemButton>{accordHeading}</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>{accordBody()}</AccordionItemPanel>
        </AccordionItem>
      </div>
    );
  }
}

export default MyAccordion;
