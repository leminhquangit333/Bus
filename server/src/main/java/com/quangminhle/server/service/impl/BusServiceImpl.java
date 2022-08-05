package com.quangminhle.server.service.impl;

import com.quangminhle.server.dto.*;
import com.quangminhle.server.entity.*;
import com.quangminhle.server.repository.BusRepository;
import com.quangminhle.server.repository.ScheduceRepository;
import com.quangminhle.server.repository.SeatRepository;
import com.quangminhle.server.service.BusService;
import com.quangminhle.server.uitls.DateUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
  private Bus bus;

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
    List<Scheduce> scheduceList = scheduceRepository.findDetailByDate(start, end)
            .stream()
            .sorted(Comparator.comparing(Scheduce::getStartDate).reversed())
            .collect(Collectors.toList());
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

  @Override
  @Transactional
  public Long saveBus(BusDto busDetail) throws Exception {
    Bus bus = new Bus();
    if (Objects.nonNull(busDetail.getId())) {
      Optional<Bus> busOptional = busRepository.findById(busDetail.getId());
      if (!busOptional.isPresent()) {
        throw new Exception("error get bus");
      }
      bus = busOptional.get();
    }
    bus.setBusName(busDetail.getBusName());
    bus.setLicensePlate(busDetail.getLicensePlate());
    bus.setNumberOfSeat(busDetail.getNumberOfSeat());
    bus.setNumberOfExtraSeat(busDetail.getNumberOfExtraSeat());
    busRepository.save(bus);
    return bus.getId();
  }

  @Override
  public ExportDto exportScheduce(Long scheduceId) throws Exception {
    Optional<Scheduce> scheduceOptional
            = this.scheduceRepository.findById(scheduceId);
    if (!scheduceOptional.isPresent()) {
      throw new Exception("error get scheduce");
    }

    Scheduce scheduce = scheduceOptional.get();

    List<BusTicketExportDto> busTicketExportDtos = new ArrayList<>();
    for(BusTicket busTicket : scheduce.getBusTicketList()){
      BusTicketExportDto busTicketExportDto = new BusTicketExportDto(busTicket);
      busTicketExportDtos.add(busTicketExportDto);
    }
    List<CommodityTicketExportDto> commodityTicketExportDtos = new ArrayList<>();
    for(CommodityTicket commodityTicket : scheduce.getCommodityTicketList()){
      CommodityTicketExportDto commodityTicketExportDto = new CommodityTicketExportDto(commodityTicket);
      commodityTicketExportDtos.add(commodityTicketExportDto);
    }
    return new ExportDto(busTicketExportDtos,commodityTicketExportDtos);

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
    busDetailDto.setDeparture(scheduce.getDeparture().getName());
    busDetailDto.setDestination(scheduce.getDestination().getName());
    busDetailDto.setNumOfFreeSeat(scheduce.getBus().getNumberOfSeat()
            + scheduce.getBus().getNumberOfExtraSeat()
            - scheduce.getBusTicketList().size());
  }
}
