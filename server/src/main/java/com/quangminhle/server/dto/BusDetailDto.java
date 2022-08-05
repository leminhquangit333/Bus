package com.quangminhle.server.dto;

import com.quangminhle.server.entity.Bus;
import com.quangminhle.server.entity.Seat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BusDetailDto {

    private Long busId;

    private Long scheduceId;

    private String licensePlate;

    private String busName;

    private Long startDate;

    private List<Seat> seats;

    private Integer numOfFreeSeat;

    private String departure;

    private String destination;
}
