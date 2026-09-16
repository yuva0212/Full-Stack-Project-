package com.example.rocket.service;

import com.example.rocket.entity.Event;
import com.example.rocket.entity.Role;
import com.example.rocket.entity.User;
import com.example.rocket.repository.EventRepository;
import com.example.rocket.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public EventService(EventRepository eventRepository,
                        UserRepository userRepository) {

        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    // =========================
    // CREATE EVENT
    // =========================
    public Event createEvent(Event event) {

        if (event.getOrganizer() == null ||
                event.getOrganizer().getUserId() == null) {

            throw new RuntimeException(
                    "Organizer is required"
            );
        }

        Long organizerId =
                event.getOrganizer().getUserId();

        User organizer = userRepository.findById(organizerId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Organizer not found with id: "
                                        + organizerId
                        )
                );

        // Only organizer can create an event
        if (organizer.getRole() != Role.ORGANIZER) {

            throw new RuntimeException(
                    "Only ORGANIZER can create an event"
            );
        }

        // Capacity validation
        if (event.getCapacity() == null ||
                event.getCapacity() <= 0) {

            throw new RuntimeException(
                    "Capacity must be greater than 0"
            );
        }

        // Price validation
        if (event.getPrice() == null ||
                event.getPrice().compareTo(
                        java.math.BigDecimal.ZERO
                ) < 0) {

            throw new RuntimeException(
                    "Price cannot be negative"
            );
        }

        // Event status
        if (event.getStatus() == null ||
                event.getStatus().isBlank()) {

            event.setStatus("OPEN");
        }

        // Attach managed User entity
        event.setOrganizer(organizer);

        return eventRepository.save(event);
    }


    // =========================
    // GET ALL EVENTS
    // =========================
    public List<Event> getAllEvents() {

        return eventRepository.findAll();
    }


    // =========================
    // GET EVENT BY ID
    // =========================
    public Event getEventById(Long id) {

        return eventRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Event not found with id: " + id
                        )
                );
    }


    // =========================
    // GET EVENTS BY ORGANIZER
    // =========================
    public List<Event> getEventsByOrganizer(Long userId) {

        return eventRepository
                .findByOrganizerUserId(userId);
    }


    // =========================
    // UPDATE EVENT
    // =========================
    public Event updateEvent(Long id, Event updatedEvent) {

        Event existingEvent = getEventById(id);

        // Validate organizer
        if (updatedEvent.getOrganizer() == null ||
                updatedEvent.getOrganizer().getUserId() == null) {

            throw new RuntimeException(
                    "Organizer is required"
            );
        }

        Long organizerId =
                updatedEvent.getOrganizer().getUserId();

        User organizer = userRepository.findById(organizerId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Organizer not found with id: "
                                        + organizerId
                        )
                );

        if (organizer.getRole() != Role.ORGANIZER) {

            throw new RuntimeException(
                    "Selected user is not an ORGANIZER"
            );
        }

        // Capacity validation
        if (updatedEvent.getCapacity() == null ||
                updatedEvent.getCapacity() <= 0) {

            throw new RuntimeException(
                    "Capacity must be greater than 0"
            );
        }

        // Update fields
        existingEvent.setOrganizer(organizer);
        existingEvent.setEventName(
                updatedEvent.getEventName()
        );
        existingEvent.setEventDate(
                updatedEvent.getEventDate()
        );
        existingEvent.setVenue(
                updatedEvent.getVenue()
        );
        existingEvent.setCapacity(
                updatedEvent.getCapacity()
        );
        existingEvent.setPrice(
                updatedEvent.getPrice()
        );
        existingEvent.setStatus(
                updatedEvent.getStatus()
        );

        return eventRepository.save(existingEvent);
    }


    // =========================
    // DELETE EVENT
    // =========================
    public void deleteEvent(Long id) {

        if (!eventRepository.existsById(id)) {

            throw new RuntimeException(
                    "Event not found with id: " + id
            );
        }

        eventRepository.deleteById(id);
    }
}