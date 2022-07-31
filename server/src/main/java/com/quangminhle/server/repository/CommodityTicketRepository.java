package com.quangminhle.server.repository;

import com.quangminhle.server.entity.CommodityTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommodityTicketRepository extends JpaRepository<CommodityTicket, Long> {

}
