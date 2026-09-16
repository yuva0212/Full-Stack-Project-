package com.example.rocket.repository;

import com.example.rocket.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findByOrganizerUserId(Long userId);

    List<Event> findByStatus(String status);
}