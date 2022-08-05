import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { WithTranslation } from "react-i18next";
import { withRouter, RouteComponentProps } from "react-router";
import { DialogActions, Grid, Input, TextField } from "@material-ui/core";
import { MdOutlineCancel } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";
import _ from "lodash";

type TState = {
  openDialog: boolean;
  busData: any;
};
type TProps = {
  openDialog: boolean;
  busData: any;
  onChange: (busData: any, result: boolean) => void;
};
class BusDialog extends Component<TProps, TState> {
  constructor(props: any) {
    super(props);
    this.state = {
      busData: {},
      openDialog: false,
    };
  }
  componentDidMount() {
    this.setState({
      openDialog: this.props.openDialog,
      busData: _.cloneDeep(this.props.busData),
    });
  }

  componentDidUpdate(prevProps: TProps) {
    if (prevProps.openDialog !== this.props.openDialog) {
      this.setState({ openDialog: this.props.openDialog });
    }
    if (prevProps.busData !== this.props.busData) {
      this.setState({ busData: _.cloneDeep(this.props.busData) });
    }
  }

  onCloseDialog(result: boolean) {
    this.props.onChange(this.state.busData, result);
  }

  validSaveData() {
    const { busData } = this.state;
    const busProps = _.cloneDeep(this.props.busData);
    return (
      busData?.busName &&
      busData?.busName?.length &&
      busData?.licensePlate &&
      busData?.licensePlate?.length &&
      (busData?.busName !== busProps?.busName ||
        busData?.licensePlate !== busProps.licensePlate)
    );
  }

  render() {
    const { busData } = this.state;
    return (
      <Dialog open={this.props.openDialog}>
        <DialogTitle style={{ minWidth: 300 }}>Cài Đặt Xe Khách</DialogTitle>
        <DialogContent>
          <Grid container direction="column">
            <TextField
              label="Biển Số"
              color="primary"
              required
              defaultValue={busData?.licensePlate}
              style={{ paddingBottom: 24 }}
              onChange={(evt: any) => {
                busData.licensePlate = evt?.target?.value;
                this.setState({ busData });
              }}
            />
            <TextField
              label="Loại Xe"
              color="primary"
              required
              defaultValue={busData?.busName}
              style={{ paddingBottom: 24 }}
              onChange={(evt: any) => {
                busData.busName = evt?.target?.value;
                this.setState({ busData });
              }}
            />
            <TextField
              label="Số Ghế"
              color="primary"
              required
              disabled
              defaultValue={busData?.numberOfSeat}
              style={{ paddingBottom: 24 }}
              // onChange={(evt: any) => {
              //   busData.numberOfSeat = evt?.target?.value;
              //   this.setState({ busData });
              // }}
            />
            <TextField
              label="Số Ghế Phụ"
              color="secondary"
              required
              disabled
              defaultValue={busData?.numberOfExtraSeat}
              style={{ paddingBottom: 24 }}
              // onChange={(evt: any) => {
              //   busData.numberOfExtraSeat = evt?.target?.value;
              //   this.setState({ busData });
              // }}
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            startIcon={<MdOutlineCancel />}
            color="secondary"
            onClick={() => this.onCloseDialog(false)}
          >
            Thoát
          </Button>
          <Button
            variant="outlined"
            startIcon={<AiOutlineFileDone />}
            color="primary"
            onClick={() => this.onCloseDialog(true)}
            disabled={!this.validSaveData()}
          >
            Lưu Lại
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
export default BusDialog;
