package com.quangminhle.server.repository;

import com.quangminhle.server.entity.Scheduce;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ScheduceRepository extends JpaRepository<Scheduce, Long> {


    @Query(value = "select s from Scheduce s WHERE (s.startDate between :start and :end)")
    List<Scheduce> findDetailByDate(@Param("start") Date start, @Param("end") Date end);
}
