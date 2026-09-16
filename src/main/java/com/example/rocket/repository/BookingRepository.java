package com.example.rocket.repository;

import com.example.rocket.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository
        extends JpaRepository<Booking, Long> {

    boolean existsByStudentUserIdAndEventEventId(
            Long userId,
            Long eventId
    );

    long countByEventEventIdAndStatus(
            Long eventId,
            String status
    );

    List<Booking> findByStudentUserId(
            Long userId
    );

    List<Booking> findByEventEventId(
            Long eventId
    );

    List<Booking> findByStudentUserIdAndStatus(
            Long userId,
            String status
    );

    List<Booking> findByEventEventIdAndStatus(
            Long eventId,
            String status
    );
}