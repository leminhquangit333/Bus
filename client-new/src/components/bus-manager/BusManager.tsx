import React, { Component } from "react";

import { WithTranslation } from "react-i18next";
import { withRouter, RouteComponentProps } from "react-router";
import { Button, Grid, Tooltip } from "@material-ui/core";
import { MdOutlinePostAdd } from "react-icons/md";
import { BusService } from "./BusService";
import Table from "../common/Table";
import { TbSettings } from "react-icons/tb";
import BusDialog from "./BusDialog";

type TState = {
  tableData: any[];
  selectedRow: any;
  openBusDialog: boolean;
};
class BusManager extends Component<
  RouteComponentProps & WithTranslation,
  TState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      tableData: [],
      selectedRow: {},
      openBusDialog: false,
    };
  }

  componentDidMount() {
    this.setState(
      {
        tableData: [],
        selectedRow: {},
        openBusDialog: false,
      },
      () => this.findAllBus()
    );
  }

  findAllBus() {
    let tableData: any[] = [];
    BusService.findAllBus()
      .then((res) => {
        if (res?.data) {
          tableData = res.data;
        }
      })
      .finally(() => this.setState({ tableData }));
  }

  editBus(row: any) {
    this.setState({ selectedRow: row, openBusDialog: true });
  }

  saveDialog(data: any, result: boolean) {
    if (result) {
      BusService.saveBus(data).then((res) => {
        if(res?.data){
          alert("Lưu Thành Công !!!");
          // eslint-disable-next-line no-restricted-globals
          location.reload();
        } else {
          alert("Đã có lỗi xảy ra vui lòng kiểm tra lại !!!");
          // eslint-disable-next-line no-restricted-globals
          location.reload();
        }
      });
    }
    this.setState({ openBusDialog: false });
  }

  render() {
    const columns = [
      {
        Header: "Biển Số",
        accessor: "licensePlate",
      },

      {
        Header: "Loại Xe",
        accessor: "busName",
      },
      {
        Header: "Số Ghế",
        accessor: "numberOfSeat",
      },
      {
        Header: "Số Ghế Phụ",
        accessor: "numberOfExtraSeat",
      },
      {
        Header: "",
        accessor: "scheduceId",
        Cell: (p: any) => (
          <Tooltip title="Chỉnh Sửa">
            <Button
              startIcon={<TbSettings />}
              color="primary"
              variant="outlined"
              onClick={() => this.editBus(p?.cell?.row?.original)}
            />
          </Tooltip>
        ),
      },
    ];

    const { openBusDialog, selectedRow } = this.state;
    return (
      <Grid
        container
        direction="column"
        alignContent="center"
        justifyContent="center"
      >
        {openBusDialog && (
          <BusDialog
            busData={selectedRow}
            openDialog={openBusDialog}
            onChange={(busData: any, result: boolean) =>
              this.saveDialog(busData, result)
            }
          />
        )}
        <Grid item xs style={{ padding: 24, fontSize: 40 }} className="text">
          Quản Lý Xe Khách
        </Grid>
        <Grid item xs style={{ paddingTop: 12, fontSize: 40 }} container>
          <Grid item xs={10}></Grid>
          <Button
            endIcon={<MdOutlinePostAdd />}
            color="primary"
            variant="outlined"
            style={{ marginLeft: 12, marginTop: 10 }}
            onClick={() =>
              this.setState({
                selectedRow: {
                  busName: undefined,
                  licensePlate: undefined,
                  numberOfExtraSeat: 20,
                  numberOfSeat: 46,
                },
                openBusDialog: true,
              })
            }
          >
            Thêm Xe
          </Button>
        </Grid>
        <Grid item xs style={{ paddingTop: 12 }} className="full-width">
          <Table columns={columns} data={this.state.tableData} />
        </Grid>
      </Grid>
    );
  }
}
export default withRouter(BusManager);
