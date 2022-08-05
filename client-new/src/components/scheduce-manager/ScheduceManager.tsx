import React, { Component } from "react";

import { WithTranslation } from "react-i18next";
import { withRouter, RouteComponentProps } from "react-router";
import { Button, Grid, Tooltip } from "@material-ui/core";
import { MdFindReplace, MdOutlinePostAdd } from "react-icons/md";
import { ScheduceService } from "./ScheduceService";
import Table from "../common/Table";
import { DateUtils } from "../../common/utils/DateUtils";
import { AiFillPrinter, AiOutlineEdit } from "react-icons/ai";
import { ExcelService } from "../../common/services/excel-service";

type TState = {
  startDate: Date;
  endDate: Date;
  tableData: any[];
};
class ScheduceManager extends Component<
  RouteComponentProps & WithTranslation,
  TState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      tableData: [],
    };
  }

  findBusByDate() {
    const { startDate, endDate } = this.state;
    ScheduceService.getBusByScheduceDate(
      startDate.getTime(),
      endDate.getTime()
    ).then((res) => this.setState({ tableData: res.data }));
  }

  exportListTicketByScheduce(row: any) {
    ScheduceService.getTicketByScheduceId(row?.original?.scheduceId).then(
      (res: any) => {
        if (res?.data) {
          const licensePlate = row?.original?.licensePlate;
          const time = DateUtils.formatDate(
            row?.original?.startDate,
            "date-edit"
          );
          const fileName = `${licensePlate}-${time}`;
          if (res?.data?.busTicketExportDtos) {
            const header = {
              code: "Mã Vé",
              name: "Họ Và Tên",
              phoneNumber: "Số Điện Thoại",
              departure: "Nơi Đi",
              destination: "Nơi Đến",
              price: "Giá Vé",
              note: "Ghi Chú",
            };
            const wscols = [
              { wch: 15 },
              { wch: 15 },
              { wch: 12 },
              { wch: 15 },
              { wch: 15 },
              { wch: 10 },
              { wch: 30 },
            ];
            ExcelService.exportToXlSX(
              header,
              res?.data?.busTicketExportDtos,
              wscols,
              "ve-xe-" + fileName
            );
          }
          if (res?.data?.commodityTicketExportDtos) {
            const header = {
              code: "Mã Vé",
              sender: "Tên Người Gửi",
              senderPhone: "SĐT Người Gửi",
              receiver: "Tên Người Nhận",
              receiverPhone: "SĐT Người Nhận",
              departure: "Nơi Đi",
              destination: "Nơi Đến",
              weight: "Khối Lượng",
              price: "Giá",
              note: "Ghi Chú",
            };
            const wscols = [
              { wch: 15 },
              { wch: 15 },
              { wch: 12 },
              { wch: 15 },
              { wch: 12 },
              { wch: 15 },
              { wch: 15 },
              { wch: 8 },
              { wch: 10 },
              { wch: 30 },
            ];
            ExcelService.exportToXlSX(
              header,
              res?.data?.commodityTicketExportDtos,
              wscols,
              "hang-hoa-" + fileName
            );
          }
        }
      }
    );
  }

  render() {
    const { startDate, endDate } = this.state;
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
          <Grid>
            <Tooltip title="Chỉnh Sửa">
              <Button
                startIcon={<AiOutlineEdit />}
                color="primary"
                variant="outlined"
                onClick={() => this.findBusByDate()}
              />
            </Tooltip>
            <Tooltip title="Xuất Danh Sách Vé">
              <Button
                startIcon={<AiFillPrinter />}
                color="primary"
                variant="outlined"
                onClick={() => this.exportListTicketByScheduce(p?.cell?.row)}
              />
            </Tooltip>
          </Grid>
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
        <Grid item xs style={{ padding: 24, fontSize: 40 }} className="text">
          Quản Lý Lịch Trình
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
          <Button
            endIcon={<MdOutlinePostAdd />}
            color="primary"
            variant="outlined"
            style={{ marginLeft: 12, marginTop: 10 }}
            disabled={startDate > endDate}
            onClick={() => this.exportListTicketByScheduce(1)}
          >
            Thêm lịch chạy
          </Button>
        </Grid>
        <Grid item xs style={{ paddingTop: 12 }} className="full-width">
          <Table columns={columns} data={this.state.tableData} />
        </Grid>
      </Grid>
    );
  }
}
export default withRouter(ScheduceManager);
