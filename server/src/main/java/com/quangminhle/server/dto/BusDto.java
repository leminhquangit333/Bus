package com.quangminhle.server.dto;

import com.quangminhle.server.entity.Bus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BusDto {
  private Long id;

  private String licensePlate;

  private String busName;

  private Integer numberOfSeat;

  private Integer numberOfExtraSeat;

  public BusDto(Bus bus) {
    this.id = bus.getId();
    this.licensePlate = bus.getLicensePlate();
    this.busName = bus.getBusName();
    this.numberOfSeat = bus.getNumberOfSeat();
    this.numberOfExtraSeat = bus.getNumberOfExtraSeat();
  }
}
