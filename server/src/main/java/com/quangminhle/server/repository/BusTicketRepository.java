package com.quangminhle.server.repository;

import com.quangminhle.server.entity.BusTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface BusTicketRepository extends JpaRepository<BusTicket, Long> {

  @Query(value = "select bt from BusTicket bt WHERE (bt.scheduce.startDate between :start and :end)")
  List<BusTicket> findByTimeRange(@Param("start") Date start, @Param("end") Date end);

  @Query(value = "select bt from BusTicket bt WHERE bt.code = :codeOrPhone or bt.phoneNumber = :codeOrPhone")
  List<BusTicket> findByCodeOrPhone(@Param("codeOrPhone") String codeOrPhone);
}
