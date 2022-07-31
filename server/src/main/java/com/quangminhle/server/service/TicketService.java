package com.quangminhle.server.service;

import com.quangminhle.server.dto.TicketDto;

import java.util.Date;
import java.util.List;

public interface TicketService {
    TicketDto bookTicket(TicketDto ticketDto);

    Long deleteTicket(TicketDto ticketDto) throws Exception;

    List<TicketDto> findAllByTime(Date start, Date end);

    List<TicketDto> findAllByCodeOrPhone(String trim);
}
