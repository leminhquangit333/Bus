import React, { Component } from "react";

import { WithTranslation } from "react-i18next";
import { withRouter, RouteComponentProps } from "react-router";
import { Button, Grid, Tooltip } from "@material-ui/core";
import { MdFindReplace } from "react-icons/md";
import { TicketManagerService } from "./TicketManagerService";
import Table from "../common/Table";
import { FaRegEye } from "react-icons/fa";
import { DateUtils } from "../../common/utils/DateUtils";
import BookTicketDialog from "./BookTicketDialog";

type TState = {
  startDate: Date;
  endDate: Date;
  tableData: any[];
  onBookTicketDialog: boolean;
  selectedScheduceId: any;
  openBookTicketDetail: boolean;
  busData: any;
  selectedSeatIds?: number[];
};
class TicketManager extends Component<
  RouteComponentProps & WithTranslation,
  TState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      tableData: [],
      onBookTicketDialog: false,
      selectedScheduceId: null,
      openBookTicketDetail: false,
      busData: {},
      selectedSeatIds: [],
    };
  }

  findBusByDate() {
    const { startDate, endDate } = this.state;
    TicketManagerService.getBusByScheduceDate(
      startDate.getTime(),
      endDate.getTime()
    ).then((res: any) => this.setState({ tableData: res.data }));
  }

  render() {
    const { startDate, endDate, onBookTicketDialog, selectedScheduceId } =
      this.state;
    const columns = [
      {
        Header: "Ngày Giờ Khởi Hành",
        accessor: "startDate",
        Cell: (p: any) =>
          DateUtils.formatDate(p?.cell?.value, "date+time-edit"),
      },
      {
        Header: "Biển Số",
        accessor: "licensePlate",
      },

      {
        Header: "Loại Xe",
        accessor: "busName",
      },
      {
        Header: "Điểm Đi",
        accessor: "departure",
      },
      {
        Header: "Điểm Đến",
        accessor: "destination",
      },
      {
        Header: "Số Ghế Còn Trống",
        accessor: "numOfFreeSeat",
      },
      {
        Header: "",
        accessor: "scheduceId",
        Cell: (p: any) => (
          <Tooltip title="Đặt vé">
            <Button
              startIcon={<FaRegEye />}
              color="primary"
              variant="outlined"
              onClick={() =>
                this.setState({
                  onBookTicketDialog: true,
                  selectedScheduceId: p?.cell?.value,
                })
              }
            />
          </Tooltip>
        ),
      },
    ];
    return (
      <Grid
        container
        direction="column"
        alignContent="center"
        justifyContent="center"
      >
        {onBookTicketDialog && (
          <BookTicketDialog
            scheduceId={selectedScheduceId}
            onChange={(
              result: boolean,
              busData?: any,
              selectedSeatIds?: number[]
            ) => {
              if (result) {
                this.setState({
                  openBookTicketDetail: true,
                  busData,
                  selectedSeatIds,
                });
              }
              this.setState({onBookTicketDialog: false})
            }}
            openDialog={onBookTicketDialog}
          />
        )}
        <Grid item xs style={{ padding: 24, fontSize: 40 }} className="text">
          Quản Lý Đặt Vé
        </Grid>
        <Grid item xs style={{ paddingTop: 12, fontSize: 40 }}>
          <label htmlFor="start" style={{ padding: 12, fontSize: 24 }}>
            Từ
          </label>
          <input
            type="date"
            name="begin"
            placeholder="dd-mm-yyyy"
            value={startDate.toISOString().slice(0, 10)}
            min="1997-01-01"
            max="2030-12-31"
            style={{ padding: 12, height: 12 }}
            onChange={(evt) =>
              this.setState({ startDate: new Date(evt.target.value) })
            }
          />
          <label htmlFor="start" style={{ padding: 12, fontSize: 24 }}>
            Đến
          </label>
          <input
            type="date"
            name="end"
            placeholder="dd-mm-yyyy"
            value={endDate.toISOString().slice(0, 10)}
            min="1997-01-01"
            max="2030-12-31"
            style={{ padding: 12, height: 12 }}
            onChange={(evt) =>
              this.setState({ endDate: new Date(evt.target.value) })
            }
          />
          <Button
            endIcon={<MdFindReplace />}
            color="secondary"
            variant="outlined"
            style={{ marginLeft: 12, marginTop: 10 }}
            disabled={startDate > endDate}
            onClick={() => this.findBusByDate()}
          >
            Tìm Kiếm
          </Button>
        </Grid>
        <Grid item xs style={{ paddingTop: 12 }} className="full-width">
          <Table columns={columns} data={this.state.tableData} />
        </Grid>
      </Grid>
    );
  }
}
export default withRouter(TicketManager);
