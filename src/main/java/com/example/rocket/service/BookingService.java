package com.example.rocket.service;

import com.example.rocket.entity.Booking;
import com.example.rocket.entity.Event;
import com.example.rocket.entity.Role;
import com.example.rocket.entity.User;
import com.example.rocket.repository.BookingRepository;
import com.example.rocket.repository.EventRepository;
import com.example.rocket.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;


    public BookingService(
            BookingRepository bookingRepository,
            UserRepository userRepository,
            EventRepository eventRepository) {

        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
    }


    // =====================================================
    // CREATE / REGISTER
    // =====================================================

    public Booking createBooking(Booking booking) {

        // ---------------------------------------------
        // 1. Validate student
        // ---------------------------------------------

        if (booking.getStudent() == null ||
                booking.getStudent().getUserId() == null) {

            throw new RuntimeException(
                    "Student is required"
            );
        }

        Long studentId =
                booking.getStudent().getUserId();


        User student =
                userRepository.findById(studentId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Student not found with id: "
                                                + studentId
                                )
                        );


        // ---------------------------------------------
        // 2. Only STUDENT can register
        // ---------------------------------------------

        if (student.getRole() != Role.STUDENT) {

            throw new RuntimeException(
                    "Only STUDENT can register for an event"
            );
        }


        // ---------------------------------------------
        // 3. Validate event
        // ---------------------------------------------

        if (booking.getEvent() == null ||
                booking.getEvent().getEventId() == null) {

            throw new RuntimeException(
                    "Event is required"
            );
        }

        Long eventId =
                booking.getEvent().getEventId();


        Event event =
                eventRepository.findById(eventId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Event not found with id: "
                                                + eventId
                                )
                        );


        // ---------------------------------------------
        // 4. Event must be OPEN
        // ---------------------------------------------

        if (!"OPEN".equalsIgnoreCase(
                event.getStatus())) {

            throw new RuntimeException(
                    "Registration is closed for this event"
            );
        }


        // ---------------------------------------------
        // 5. Event date must not be past
        // ---------------------------------------------

        if (event.getEventDate() != null &&
                event.getEventDate()
                        .isBefore(LocalDate.now())) {

            throw new RuntimeException(
                    "Cannot register for a past event"
            );
        }


        // ---------------------------------------------
        // 6. Duplicate registration check
        // ---------------------------------------------

        boolean alreadyRegistered =
                bookingRepository
                        .existsByStudentUserIdAndEventEventId(
                                studentId,
                                eventId
                        );


        if (alreadyRegistered) {

            throw new RuntimeException(
                    "Student is already registered for this event"
            );
        }


        // ---------------------------------------------
        // 7. Capacity check
        // ---------------------------------------------

        long confirmedCount =
                bookingRepository
                        .countByEventEventIdAndStatus(
                                eventId,
                                "CONFIRMED"
                        );


        if (confirmedCount >= event.getCapacity()) {

            throw new RuntimeException(
                    "Event is full"
            );
        }


        // ---------------------------------------------
        // 8. Create booking
        // ---------------------------------------------

        booking.setStudent(student);
        booking.setEvent(event);

        booking.setStatus("CONFIRMED");

        booking.setBookingDate(
                LocalDate.now()
        );


        return bookingRepository.save(booking);
    }


    // =====================================================
    // GET ALL BOOKINGS
    // =====================================================

    public List<Booking> getAllBookings() {

        return bookingRepository.findAll();
    }


    // =====================================================
    // GET BOOKING BY ID
    // =====================================================

    public Booking getBookingById(Long id) {

        return bookingRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Booking not found with id: "
                                        + id
                        )
                );
    }


    // =====================================================
    // GET BOOKINGS BY STUDENT
    // =====================================================

    public List<Booking> getBookingsByStudent(
            Long userId) {

        return bookingRepository
                .findByStudentUserId(userId);
    }


    // =====================================================
    // GET BOOKINGS BY EVENT
    // =====================================================

    public List<Booking> getBookingsByEvent(
            Long eventId) {

        return bookingRepository
                .findByEventEventId(eventId);
    }


    // =====================================================
    // CANCEL BOOKING
    // =====================================================

    public Booking cancelBooking(Long id) {

        Booking booking =
                getBookingById(id);


        if ("CANCELLED".equalsIgnoreCase(
                booking.getStatus())) {

            throw new RuntimeException(
                    "Booking is already cancelled"
            );
        }


        Event event = booking.getEvent();


        // Student can cancel only before event date
        if (event.getEventDate() != null &&
                !LocalDate.now().isBefore(
                        event.getEventDate()
                )) {

            throw new RuntimeException(
                    "Registration can only be cancelled before the event"
            );
        }


        booking.setStatus("CANCELLED");


        return bookingRepository.save(booking);
    }


    // =====================================================
    // DELETE BOOKING
    // =====================================================

    public void deleteBooking(Long id) {

        if (!bookingRepository.existsById(id)) {

            throw new RuntimeException(
                    "Booking not found with id: "
                            + id
            );
        }

        bookingRepository.deleteById(id);
    }
}