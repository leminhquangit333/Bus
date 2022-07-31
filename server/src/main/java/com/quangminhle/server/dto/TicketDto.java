package com.quangminhle.server.dto;

import com.quangminhle.server.entity.BusTicket;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TicketDto {
    private Long ticketId;

    private String code;

    private String customerName;

    private String customerPhone;

    private String note;

    private Long busId;

    private String licensePlate;

    private String busName;

    private Long startTime;

    private String seatName;

    private Long seatId;

    private Long scheduleId;

    private Long price;

    private String departure;

    private String destination;

    public TicketDto(BusTicket busTicket) {
        this.ticketId = busTicket.getId();
        this.customerName = busTicket.getName();
        this.customerPhone = busTicket.getPhoneNumber();
        this.code = busTicket.getCode();
        this.note = busTicket.getNote();
        this.busId = busTicket.getScheduce().getBus().getId();
        this.busName = busTicket.getScheduce().getBus().getBusName();
        this.licensePlate = busTicket.getScheduce().getBus().getLicensePlate();
        this.startTime = busTicket.getScheduce().getStartDate().getTime();
        this.seatName = busTicket.getSeat().getName();
        this.seatId = busTicket.getSeat().getId();
        this.scheduleId =  busTicket.getScheduce().getId();
        this.price = busTicket.getPrice();
        this.departure = busTicket.getDeparture();
        this.destination = busTicket.getDestination();
    }
}
