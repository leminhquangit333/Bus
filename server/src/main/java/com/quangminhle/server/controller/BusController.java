package com.quangminhle.server.controller;

import com.quangminhle.server.dto.BusDetailDto;
import com.quangminhle.server.dto.BusDto;
import com.quangminhle.server.dto.ExportDto;
import com.quangminhle.server.dto.UserDto;
import com.quangminhle.server.repository.SeatRepository;
import com.quangminhle.server.service.BusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.zip.DataFormatException;

@RestController
@RequestMapping("api/v1/bus")
public class BusController {

  @Autowired
  private SeatRepository seatRepository;

  @Autowired
  private BusService busService;

  /**
   * @return all bus
   */
  @GetMapping(value = "/all")
  public ResponseEntity<List<BusDto>> getAllBus() {
    try {
      List<BusDto> busDetailDtos = new ArrayList<>();
      busDetailDtos = busService.findAll();
      return new ResponseEntity<>(busDetailDtos, HttpStatus.OK);
    } catch (Exception ex) {
      ex.printStackTrace();
    }
    return null;
  }

  /**
   * @param startDate
   * @param endDate
   * @return
   */
  @GetMapping
  public ResponseEntity<List<BusDetailDto>> findByDateRange(
          @RequestParam(value = "startDate") Long startDate,
          @RequestParam(value = "endDate") Long endDate
  ) {
    try {
      List<BusDetailDto> busDetailDtos = new ArrayList<>();
      Date start = new Date(startDate);
      Date end = new Date(endDate);
      if (start.after(end)) {
        throw new DataFormatException("no vaild data");
      }
      busDetailDtos = busService.getBusListByDate(start, end);
      return new ResponseEntity<>(busDetailDtos, HttpStatus.OK);
    } catch (Exception ex) {
      ex.printStackTrace();
    }
    return null;
  }

  @GetMapping(value = "/detail")
  public ResponseEntity<BusDetailDto> findBusDetail(
          @RequestParam(value = "scheduceId") Long scheduceId
  ) {
    try {
      BusDetailDto busDetailDtos = new BusDetailDto();
      busDetailDtos = busService.getBusDetail(scheduceId);
      return new ResponseEntity<>(busDetailDtos, HttpStatus.OK);
    } catch (Exception ex) {
      ex.printStackTrace();
    }
    return null;
  }

  @PostMapping(value = "/save")
  public ResponseEntity<Long> saveBus(
          @RequestBody BusDto busDto
  ) {
    try {
      Long id = busService.saveBus(busDto);
      if(id == null){
        throw new Exception("error get bus");
      }
      return new ResponseEntity<>(id, HttpStatus.OK);
    } catch (Exception ex) {
      ex.printStackTrace();
      return new ResponseEntity<>(null, HttpStatus.BAD_GATEWAY);
    }
  }

  @GetMapping(value = "/export")
  public ResponseEntity<ExportDto> exportScheduce(
          @RequestParam(value = "scheduceId") Long scheduceId
  ) {
    try {
      ExportDto result = new ExportDto();
      result = busService.exportScheduce(scheduceId);
      return new ResponseEntity<>(result, HttpStatus.OK);
    } catch (Exception ex) {
      ex.printStackTrace();
      return new ResponseEntity<>(null, HttpStatus.BAD_GATEWAY);
    }
  }
}
