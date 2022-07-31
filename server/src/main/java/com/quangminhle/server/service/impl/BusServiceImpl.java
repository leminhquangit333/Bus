package com.quangminhle.server.service.impl;

import com.quangminhle.server.dto.BusDetailDto;
import com.quangminhle.server.dto.BusDto;
import com.quangminhle.server.entity.Bus;
import com.quangminhle.server.entity.BusTicket;
import com.quangminhle.server.entity.Scheduce;
import com.quangminhle.server.entity.Seat;
import com.quangminhle.server.repository.BusRepository;
import com.quangminhle.server.repository.ScheduceRepository;
import com.quangminhle.server.repository.SeatRepository;
import com.quangminhle.server.service.BusService;
import com.quangminhle.server.uitls.DateUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class BusServiceImpl implements BusService {

  @Autowired
  private BusRepository busRepository;

  @Autowired
  private SeatRepository seatRepository;

  @Autowired
  private ScheduceRepository scheduceRepository;

  /**
   * @param start
   * @param end
   * @return
   */
  @Override
  public List<BusDetailDto> getBusListByDate(Date start, Date end) {
    DateUtils dateUtils = new DateUtils();
    start = dateUtils.getAtStartDate(start);
    end = dateUtils.getAtEndDate(end);
    log.info("start get bus start date {} end date {}", start, end);
    List<Scheduce> scheduceList = scheduceRepository.findDetailByDate(start, end);
    List<BusDetailDto> result = new ArrayList<>();
    for (Scheduce scheduce : scheduceList) {
      BusDetailDto busDetailDto = new BusDetailDto();
      this.setValueToBusDetail(busDetailDto, scheduce);
      result.add(busDetailDto);
    }
    return result;
  }

  @Override
  public List<BusDto> findAll() {
    List<Bus> buses = busRepository.findAll();
    List<BusDto> busDtos = new ArrayList<>();
    for (Bus bus : buses) {
      busDtos.add(new BusDto(bus));
    }

    return busDtos;
  }

  /**
   * @param scheduceId
   * @return
   * @throws Exception
   */
  @Override
  public BusDetailDto getBusDetail(Long scheduceId) throws Exception {
    log.info("start get bus detail for scheduce id {}", scheduceId);
    if (Objects.isNull(scheduceId)) {
      throw new Exception("no scheduce id");
    }

    Optional<Scheduce> scheduceOptional = scheduceRepository.findById(scheduceId);

    if (!scheduceOptional.isPresent()) {
      throw new Exception("no scheduce");
    }
    Scheduce scheduce = scheduceOptional.get();
    BusDetailDto busDetailDto = new BusDetailDto();
    this.setValueToBusDetail(busDetailDto, scheduce);
    List<Seat> busSeats = seatRepository.findAll();
    if (Objects.isNull(scheduce.getBusTicketList()) || scheduce.getBusTicketList().isEmpty()) {
      busDetailDto.setSeats(busSeats);
      return busDetailDto;
    }
    List<Seat> seatOfScheduceList = scheduce.getBusTicketList()
            .stream()
            .map(BusTicket::getSeat)
            .collect(Collectors.toList());
    busSeats.removeAll(seatOfScheduceList);
    busDetailDto.setSeats(busSeats);
    return busDetailDto;
  }

  /**
   * set value to bus detail
   *
   * @param busDetailDto
   * @param scheduce
   */
  private void setValueToBusDetail(BusDetailDto busDetailDto, Scheduce scheduce) {
    busDetailDto.setLicensePlate(scheduce.getBus().getLicensePlate());
    busDetailDto.setBusName(scheduce.getBus().getBusName());
    busDetailDto.setStartDate(scheduce.getStartDate().getTime());
    busDetailDto.setBusId(scheduce.getBus().getId());
    busDetailDto.setScheduceId(scheduce.getId());
    busDetailDto.setNumOfFreeSeat(scheduce.getBus().getNumberOfSeat()
            + scheduce.getBus().getNumberOfExtraSeat()
            - scheduce.getBusTicketList().size());
  }
}
