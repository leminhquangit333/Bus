package com.quangminhle.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExportDto {
  private List<BusTicketExportDto> busTicketExportDtos;

  private List<CommodityTicketExportDto> commodityTicketExportDtos;
}
