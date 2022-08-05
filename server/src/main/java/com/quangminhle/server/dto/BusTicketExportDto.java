package com.quangminhle.server.dto;

import com.quangminhle.server.entity.BusTicket;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BusTicketExportDto {

  private String code;

  private String name;

  private String phoneNumber;

  private String departure;

  private String destination;

  private Long price;

  private String note;

  public BusTicketExportDto(BusTicket busTicket) {
    this.code = busTicket.getCode();
    this.name = busTicket.getName();
    this.phoneNumber = busTicket.getPhoneNumber();
    this.departure = busTicket.getDeparture();
    this.destination = busTicket.getDestination();
    this.price = busTicket.getPrice();
    this.note = busTicket.getNote();
  }
}
