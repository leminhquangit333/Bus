import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  DialogActions,
  Grid,
  Typography,
} from "@material-ui/core";
import { MdOutlineCancel } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";
import _ from "lodash";
import { TicketManagerService } from "./TicketManagerService";
import { TbArmchair2 } from "react-icons/tb";
import "./TicketManager.scss";

type TState = {
  openDialog: boolean;
  scheduceId: any;
  scheduceDetail: any;
  selectedFloor: number;
  dataBus: any;
  selectedSeatId: number[];
};

type TProps = {
  openDialog: boolean;
  scheduceId: any;
  onChange: (
    result: boolean,
    busData?: any,
    seletedScheduceId?: number[]
  ) => void;
};

const busFloor = {
  floor1: 1,
  floor2: 2,
  extraFloor: 3,
};

const numSeat = 23;
class BookTicketDialog extends Component<TProps, TState> {
  constructor(props: any) {
    super(props);
    this.state = {
      scheduceId: null,
      openDialog: false,
      scheduceDetail: {},
      selectedFloor: busFloor.floor1,
      dataBus: {},
      selectedSeatId: [],
    };
  }
  componentDidMount() {
    this.setState(
      {
        openDialog: this.props.openDialog,
        scheduceId: _.cloneDeep(this.props.scheduceId),
        selectedFloor: busFloor.floor1,
      },
      () => this.getBusDetail()
    );
  }

  componentDidUpdate(prevProps: TProps) {
    if (prevProps.openDialog !== this.props.openDialog) {
      this.setState({ openDialog: this.props.openDialog });
    }
  }

  getBusDetail() {
    const { scheduceId } = this.state;
    if (!scheduceId) {
      return;
    }
    let dataBus: any = {};
    TicketManagerService.getBusDetailById(scheduceId)
      .then((res: any) => {
        if (res?.data) {
          dataBus = res.data;
        }
      })
      .finally(() => this.setState({ dataBus }));
  }

  bookTicket() {}

  validSaveData() {
    return !!this.state.selectedSeatId?.length;
  }
  renderBusSeat() {
    const { selectedFloor } = this.state;

    if (selectedFloor !== busFloor.extraFloor) {
      return (
        <Grid item container direction="column">
          <Grid item xs container direction="row" style={{ paddingTop: 12 }}>
            {[19, 16, 15, 10, 9, 4, 3].map((item) => {
              const id =
                selectedFloor === busFloor.floor1 ? item : item + numSeat;
              return this.renderSeat(id, this.getSeatColor(id));
            })}
          </Grid>
          <Grid item xs style={{ paddingTop: 12, paddingLeft: 6 }}>
            {this.renderSeat(
              selectedFloor === busFloor.floor1 ? 20 : 20 + numSeat,
              this.getSeatColor(
                selectedFloor === busFloor.floor1 ? 20 : 20 + numSeat
              )
            )}
          </Grid>
          <Grid item xs container direction="row">
            {[21, 17, 14, 11, 8, 5, 2].map((item) => {
              const id =
                selectedFloor === busFloor.floor1 ? item : item + numSeat;
              return this.renderSeat(id, this.getSeatColor(id));
            })}
          </Grid>
          <Grid item xs style={{ paddingTop: 12, paddingLeft: 6 }}>
          {this.renderSeat(
              selectedFloor === busFloor.floor1 ? 22 : 22 + numSeat,
              this.getSeatColor(
                selectedFloor === busFloor.floor1 ? 22 : 22 + numSeat
              )
            )}
          </Grid>
          <Grid item xs container direction="row">
            {" "}
            {[23, 18, 13, 12, 7, 6, 1].map((item) => {
              const id =
                selectedFloor === busFloor.floor1 ? item : item + numSeat;
              return this.renderSeat(id, this.getSeatColor(id));
            })}
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid item container direction="column">
          <Grid item xs container direction="row" style={{ paddingTop: 12 }}>
            {[56, 55, 54, 53, 52, 51, 50, 49, 48, 47].map((item) => {
              return this.renderSeat(item, this.getSeatColor(item));
            })}
          </Grid>
          <Grid item xs container direction="row">
            {" "}
            {[66, 65, 64, 63, 62, 61, 60, 59, 58, 57].map((item) => {
              return this.renderSeat(item, this.getSeatColor(item));
            })}
          </Grid>
        </Grid>
      );
    }
  }

  getSeatColor(id: number) {
    const { dataBus, selectedSeatId } = this.state;
    const listFreeSeat = dataBus?.seats?.map((item: any) => +item.id);
    if (!listFreeSeat || !id || !listFreeSeat.includes(+id)) {
      return { seatColor: "red", backColor: "gray" };
    }
    if (!!listFreeSeat.includes(+id) && !selectedSeatId.includes(+id)) {
      return { seatColor: "aqua", backColor: "" };
    }
    return { seatColor: "yellow", backColor: "gray" };
  }

  renderSeat(id: any, color: any) {
    const { selectedFloor } = this.state;
    const text =
      selectedFloor === busFloor.floor1
        ? "A"
        : selectedFloor === busFloor.floor2
        ? "B"
        : "C";
    return (
      <Grid
        item
        xs
        className="busSeat"
        style={{ backgroundColor: color.backColor, marginRight: 10 }}
      >
        <Typography className="textBus" onClick={() => this.selectedSeat(+id)}>
          {text + id}
        </Typography>
        <TbArmchair2
          color={color.seatColor}
          title="aaaa"
          size={50}
          onClick={() => this.selectedSeat(+id)}
        />
      </Grid>
    );
  }

  selectedSeat(id: number) {
    const { dataBus, selectedSeatId } = this.state;
    const listFreeSeat = dataBus?.seats?.map((item: any) => +item.id);
    if (!listFreeSeat.includes(+id)) {
      alert("Chỗ này đã được đặt");
      return;
    }
    if (selectedSeatId.includes(id)) {
      this.setState({
        selectedSeatId: _.cloneDeep(selectedSeatId).filter(
          (item) => item !== id
        ),
      });
    } else {
      this.setState({
        selectedSeatId: selectedSeatId.concat(id),
      });
    }
  }

  render() {
    const {  selectedFloor } = this.state;
    return (
      <Dialog open={this.props.openDialog} className="dialog">
        <DialogTitle style={{ minWidth: 300 }}>Thông Tin Chỗ Ngồi</DialogTitle>
        <DialogContent>
          <Grid container direction="column">
            <Grid item xs container direction="row" justifyContent="flex-end">
              {" "}
              <Grid item xs={3} container direction="row">
                <Grid className="select"></Grid>
                <Typography>Đang Chọn</Typography>
              </Grid>
              <Grid item xs={2} container direction="row">
                <Grid className="booked"></Grid>
                <Typography>Đã Đặt</Typography>
              </Grid>
              <Grid item xs={2} container direction="row">
                <Grid className="still"></Grid>
                <Typography>Còn Chỗ</Typography>
              </Grid>
            </Grid>
            <Grid item xs container direction="row">
              <Grid item xs style={{ paddingRight: 12, minWidth: 150 }}>
                {" "}
                <Button
                  variant={
                    selectedFloor === busFloor.floor1 ? "contained" : "outlined"
                  }
                  startIcon={<TbArmchair2 />}
                  color="primary"
                  onClick={() =>
                    this.setState({ selectedFloor: busFloor.floor1 })
                  }
                >
                  Tầng 1
                </Button>
              </Grid>
              <Grid item xs style={{ paddingRight: 12, minWidth: 150 }}>
                {" "}
                <Button
                  variant={
                    selectedFloor === busFloor.floor2 ? "contained" : "outlined"
                  }
                  startIcon={<TbArmchair2 />}
                  color="primary"
                  onClick={() =>
                    this.setState({ selectedFloor: busFloor.floor2 })
                  }
                >
                  Tầng 2
                </Button>
              </Grid>
              <Grid item xs style={{ paddingRight: 12, minWidth: 200 }}>
                {" "}
                <Button
                  variant={
                    selectedFloor === busFloor.extraFloor
                      ? "contained"
                      : "outlined"
                  }
                  startIcon={<TbArmchair2 />}
                  color="primary"
                  onClick={() =>
                    this.setState({ selectedFloor: busFloor.extraFloor })
                  }
                >
                  Ghế Luồng
                </Button>
              </Grid>
            </Grid>
            <Grid item container>
              {this.renderBusSeat()}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            startIcon={<MdOutlineCancel />}
            color="secondary"
            onClick={() => this.props.onChange(false)}
          >
            Thoát
          </Button>
          <Button
            variant="outlined"
            startIcon={<AiOutlineFileDone />}
            color="primary"
            onClick={() =>
              this.props.onChange(
                true,
                this.state.dataBus,
                this.state.selectedSeatId
              )
            }
            disabled={!this.validSaveData()}
          >
            Lưu Lại
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
export default BookTicketDialog;
