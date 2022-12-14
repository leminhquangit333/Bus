package com.quangminhle.server.service;

import com.quangminhle.server.dto.BusDetailDto;
import com.quangminhle.server.dto.BusDto;
import com.quangminhle.server.dto.ExportDto;

import java.util.Date;
import java.util.List;

public interface BusService {
    List<BusDetailDto> getBusListByDate(Date start, Date end);

    List<BusDto> findAll();

    BusDetailDto getBusDetail(Long scheduceId) throws Exception;

    Long saveBus(BusDto busDetail) throws Exception;

  ExportDto exportScheduce(Long scheduceId) throws Exception;
}
