package com.quangminhle.server.repository;

import com.quangminhle.server.entity.Bus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface BusRepository extends JpaRepository<Bus, Long> {
}
