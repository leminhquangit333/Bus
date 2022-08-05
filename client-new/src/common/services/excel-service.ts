import FileSaver from "file-saver";
import * as XLSX from "xlsx"

export class ExcelService {
  //   wscols = [
  //     {
  //       wch: (size of row),
  //     },
  //   ];
  // header: [key: a, label: ba]
  //data list object with key in header
  static exportToXlSX(
    header: any,
    data: any[],
    wscols: any[],
    fileName: string
  ) {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const Heading = [header];
    setTimeout(()=>{},200)
    const ws = XLSX?.utils.json_to_sheet(Heading, {
      header: Object.keys(header),
      skipHeader: true,
    });
    ws["!cols"] = wscols;
    XLSX.utils.sheet_add_json(ws, data, {
      header: Object.keys(header),
      skipHeader: true,
      origin: -1, //ok
    });
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const dataExcel = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(dataExcel, fileName + fileExtension);
  }
}
