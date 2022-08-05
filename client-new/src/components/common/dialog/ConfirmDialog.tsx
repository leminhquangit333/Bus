import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { WithTranslation } from "react-i18next";
import { withRouter, RouteComponentProps } from "react-router";
import { DialogActions } from "@material-ui/core";
import { AiOutlineFileDone } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";

type TState = {
  openDialog: boolean;
  busData: any;
};
type TProps = {
  openDialog: boolean;
  title: string | "Xác Nhận";
  content: string;
  onChange: (result: any) => void;
};
class ConfirmDialog extends Component<
  RouteComponentProps & WithTranslation & TProps,
  TState
> {
  componentDidMount() {
    this.setState({ openDialog: this.props.openDialog });
  }

  componentDidUpdate(prevProps: TProps) {
    if (prevProps.openDialog !== this.props.openDialog) {
      this.setState({ openDialog: this.props.openDialog });
    }
  }
  render() {
    return (
      <Dialog open={this.state.openDialog}>
        <DialogTitle>{this.props.title}</DialogTitle>
        <DialogContent>{this.props.content}</DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              this.props.onChange(false);
            }}
            variant="outlined"
            startIcon={<MdOutlineCancel />}
            color="secondary"
          >
            Thoát
          </Button>
          <Button
            onClick={() => {
              this.props.onChange(true);
            }}
            variant="outlined"
            startIcon={<AiOutlineFileDone />}
            color="primary"
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
export default ConfirmDialog;
