package com.quangminhle.server.service;

import com.quangminhle.server.dto.BusDetailDto;
import com.quangminhle.server.dto.BusDto;

import java.util.Date;
import java.util.List;

public interface BusService {
    List<BusDetailDto> getBusListByDate(Date start, Date end);

    List<BusDto> findAll();

    BusDetailDto getBusDetail(Long scheduceId) throws Exception;
}
