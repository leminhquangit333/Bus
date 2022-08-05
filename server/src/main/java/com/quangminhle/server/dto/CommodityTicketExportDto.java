package com.quangminhle.server.dto;

import com.quangminhle.server.entity.CommodityTicket;
import lombok.Data;

@Data
public class CommodityTicketExportDto {
  private String code;

  private String sender;

  private String senderPhone;

  private String receiver;

  private String receiverPhone;

  private String departure;

  private String destination;

  private Integer weight;

  private Long price;

  private String note;

  public CommodityTicketExportDto(CommodityTicket busTicket) {
    this.code = busTicket.getCode();
    this.sender = busTicket.getSender();
    this.senderPhone = busTicket.getSenderPhone();
    this.receiver = busTicket.getReceiver();
    this.receiverPhone = busTicket.getReceiverPhone();
    this.departure = busTicket.getDeparture();
    this.destination = busTicket.getDestination();
    this.weight = busTicket.getWeight();
    this.price = busTicket.getPrice();
    this.note = busTicket.getNote();
  }
}