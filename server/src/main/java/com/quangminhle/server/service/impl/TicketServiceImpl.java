package com.quangminhle.server.service.impl;

import com.quangminhle.server.dto.TicketDto;
import com.quangminhle.server.entity.BusTicket;
import com.quangminhle.server.entity.Scheduce;
import com.quangminhle.server.entity.Seat;
import com.quangminhle.server.repository.BusRepository;
import com.quangminhle.server.repository.BusTicketRepository;
import com.quangminhle.server.repository.ScheduceRepository;
import com.quangminhle.server.repository.SeatRepository;
import com.quangminhle.server.service.TicketService;
import com.quangminhle.server.uitls.DateUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
@Slf4j
public class TicketServiceImpl implements TicketService {

  @Autowired
  private BusTicketRepository busTicketRepository;

  @Autowired
  private BusRepository busRepository;

  @Autowired
  private ScheduceRepository scheduceRepository;

  @Autowired
  private SeatRepository seatRepository;

  /**
   * @param ticketDto
   * @return
   */
  @Override
  public TicketDto bookTicket(TicketDto ticketDto) {
    Optional<Seat> seatOptional = seatRepository.findById(ticketDto.getSeatId());
    if (!seatOptional.isPresent()) {
      return null;
    }

    Optional<Scheduce> scheduceOptional = scheduceRepository.findById(ticketDto.getScheduleId());
    if (!scheduceOptional.isPresent()) {
      return null;
    }
    BusTicket busTicket = new BusTicket(null, ticketDto.getCustomerName(), ticketDto.getCode(),
            ticketDto.getCustomerPhone(), ticketDto.getNote(), ticketDto.getPrice(), seatOptional.get(),
            scheduceOptional.get(), ticketDto.getDeparture(), ticketDto.getDestination());
    busTicketRepository.save(busTicket);
    TicketDto ticket = new TicketDto(busTicket);
    return ticket;
  }

  @Override
  @Transactional
  public Long deleteTicket(TicketDto ticketDto) throws Exception {
    if (Objects.isNull(ticketDto.getTicketId())) {
      throw new Exception("no ticket code");
    }
    busTicketRepository.deleteById(ticketDto.getTicketId());
    return ticketDto.getTicketId();
  }

  @Override
  public List<TicketDto> findAllByTime(Date start, Date end) {
    DateUtils dateUtils = new DateUtils();
    start = dateUtils.getAtStartDate(start);
    end = dateUtils.getAtEndDate(end);
    log.info("start get ticket start date {} end date {}", start, end);
    List<BusTicket> busTickets = this.busTicketRepository.findByTimeRange(start, end);
    List<TicketDto> ticketDtos = new ArrayList<>();
    for (BusTicket busTicket : busTickets) {
      TicketDto ticket = new TicketDto(busTicket);
      ticketDtos.add(ticket);
    }
    return ticketDtos;
  }

  @Override
  public List<TicketDto> findAllByCodeOrPhone(String phoneOrCode) {
    log.info("start get ticket by code or phone {} ", phoneOrCode);
    List<BusTicket> busTickets = this.busTicketRepository.findByCodeOrPhone(phoneOrCode);
    List<TicketDto> ticketDtos = new ArrayList<>();
    for (BusTicket busTicket : busTickets) {
      TicketDto ticket = new TicketDto(busTicket);
      ticketDtos.add(ticket);
    }
    return ticketDtos;
  }
}
