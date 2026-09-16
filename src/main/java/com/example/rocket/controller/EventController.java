package com.example.rocket.controller;

import com.example.rocket.entity.Event;
import com.example.rocket.service.EventService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:5173")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {

        this.eventService = eventService;
    }


    // =========================
    // CREATE EVENT
    // =========================
    @PostMapping
    public ResponseEntity<Event> createEvent(
            @RequestBody Event event) {

        Event createdEvent =
                eventService.createEvent(event);

        return new ResponseEntity<>(
                createdEvent,
                HttpStatus.CREATED
        );
    }


    // =========================
    // GET ALL EVENTS
    // =========================
    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {

        return ResponseEntity.ok(
                eventService.getAllEvents()
        );
    }


    // =========================
    // GET EVENT BY ID
    // =========================
    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                eventService.getEventById(id)
        );
    }


    // =========================
    // GET EVENTS BY ORGANIZER
    // =========================
    @GetMapping("/organizer/{userId}")
    public ResponseEntity<List<Event>>
    getEventsByOrganizer(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                eventService
                        .getEventsByOrganizer(userId)
        );
    }


    // =========================
    // UPDATE EVENT
    // =========================
    @PutMapping("/{id}")
    public ResponseEntity<Event> updateEvent(
            @PathVariable Long id,
            @RequestBody Event event) {

        return ResponseEntity.ok(
                eventService.updateEvent(id, event)
        );
    }


    // =========================
    // DELETE EVENT
    // =========================
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEvent(
            @PathVariable Long id) {

        eventService.deleteEvent(id);

        return ResponseEntity.ok(
                "Event deleted successfully"
        );
    }
}