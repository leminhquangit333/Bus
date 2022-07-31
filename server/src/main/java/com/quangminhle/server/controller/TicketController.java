package com.quangminhle.server.controller;

import com.quangminhle.server.dto.TicketDto;
import com.quangminhle.server.service.TicketService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.zip.DataFormatException;

@RestController
@Slf4j
@RequestMapping("api/v1/ticket")
public class TicketController {

    @Autowired
    private TicketService ticketService;
    @PostMapping(value = "/book")
    public ResponseEntity<TicketDto> bookTicket(@RequestBody(required = true) TicketDto ticketDto) {
        try {
            TicketDto result = new TicketDto();
            result = ticketService.bookTicket(ticketDto);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception ex){
            ex.printStackTrace();
        }
        return null;
    }

    @PostMapping(value = "/update")
    public ResponseEntity<TicketDto> updateTicket(@RequestBody(required = true) TicketDto ticketDto) {
        // update later
        TicketDto result = new TicketDto();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete")
    public ResponseEntity<Long> deleteTicket(@RequestBody(required = true) TicketDto ticketDto) {
        try {
            Long result;
            result = ticketService.deleteTicket(ticketDto);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    @GetMapping(value = "/find-by-code")
    public ResponseEntity<List<TicketDto>> findAllByCodeOrPhone (
            @RequestParam(value = "codeOrPhone") String codeOrPhone
    ){
        try{
            List<TicketDto> ticketDtos = this.ticketService.findAllByCodeOrPhone(codeOrPhone.trim());
            return new ResponseEntity<>(ticketDtos, HttpStatus.OK);

        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    @GetMapping(value = "/find-by-time")
    public ResponseEntity<List<TicketDto>> findAllByTime (
            @RequestParam(value = "startDate") Long startDate,
            @RequestParam(value = "endDate") Long endDate
    ){
        try{
            Date start = new Date(startDate);
            Date end = new Date(endDate);
            if (start.after(end)) {
                throw new DataFormatException("no vaild data");
            }
            List<TicketDto> ticketDtos = this.ticketService.findAllByTime(start, end);
            return new ResponseEntity<>(ticketDtos, HttpStatus.OK);

        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }
}
