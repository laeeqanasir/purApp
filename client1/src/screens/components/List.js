import React, { Component, Fragment } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Avatar from "@material-ui/core/Avatar";
import Poll from "@material-ui/icons/Poll";
import Pageview from "@material-ui/icons/Pageview";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";

class MyList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDialog: false,
      dialogData: undefined
    };
  }

  //componentDidMount() {}

  //static getDerivedStateFromProps(props, state) { return null; }

  //shouldComponentUpdate(nextProps, nextState) {}

  //componentDidUpdate(prevProps, prevState) {}

  //componentDidCatch(error, info) {}

  //componentWillUnmount() {}

  handleDialog = (p, data) => {
    this.setState({ showDialog: p, dialogData: data });
  };

  render() {
    const { data = [], classes } = this.props;
    const { showDialog, dialogData } = this.state;
    return (
      <div>
        <List dense={false} className={classes.root}>
          {data.map((d, i) => {
            return (
              <ListItem key={i} button className={classes.container}>
                <Avatar>
                  <Poll />
                </Avatar>
                <ListItemText
                  primary={d.primaryText}
                  secondary={d.secondryText}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    aria-label="Comments"
                    onClick={() => this.handleDialog(true, d.results)}
                  >
                    <Pageview fontSize={"large"} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
        <ListDialog
          open={showDialog}
          handleClose={this.handleDialog}
          data={dialogData}
        />
      </div>
    );
  }
}

const ListDialog = ({ open = false, handleClose, data }) => {
  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false, undefined)}
      aria-labelledby="simple-dialog-title"
      disableBackdropClick
    >
      <DialogTitle id="simple-dialog-title">Results</DialogTitle>
      {data && (
        <DialogContent>
          <table className="fileUpload-list">
            <tbody>
              <tr>
                <th>posteriorEntropy</th>
                <th>priorEntropy</th>
                <th>pur</th>
              </tr>
              <tr>
                <td>{data["posteriorEntropy"]}</td>
                <td>{data["priorEntropy"]}</td>
                <td>{data["pur"]}</td>
              </tr>
            </tbody>
          </table>
        </DialogContent>
      )}
    </Dialog>
  );
};
const styles = theme => ({
  root: {
    minWidth: 400
  },
  container: {
    background: "#d6cfcf29"
  }
});
export default withStyles(styles)(MyList);
