import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

//alert components

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

//styling JSS stuff
export const styles = theme => ({});

class MyDialog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      data,
      handleDialog,
      open = false,
      classes,
      renderBody
    } = this.props;

    return (
      <div className={classes.root}>
        {/* Dialog code */}
        <Dialog
          open={open}
          onClose={() => handleDialog(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"data.message"}</DialogTitle>
          <DialogContent>
            <div className="modal-content-row">
              {data && data.keys.map((k, i) => <p key={i}>{k}</p>)}
            </div>
            {data &&
              data.data.map((r, i) => {
                return (
                  <div className="modal-content-row" key={i}>
                    {r.map((itm, i) => (
                      <p key={i}>{itm}</p>
                    ))}
                  </div>
                );
              })}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleDialog(false)}
              color="primary"
              autoFocus
            >
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

MyDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

// withStyles takes styles in Js object form and inject them as props to pass component.
export default withStyles(styles)(MyDialog);
