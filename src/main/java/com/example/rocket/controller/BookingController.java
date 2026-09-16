package com.example.rocket.controller;

import com.example.rocket.entity.Booking;
import com.example.rocket.service.BookingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    private final BookingService bookingService;


    public BookingController(
            BookingService bookingService) {

        this.bookingService = bookingService;
    }


    // =====================================================
    // REGISTER FOR EVENT
    // =====================================================

    @PostMapping
    public ResponseEntity<Booking> createBooking(
            @RequestBody Booking booking) {

        Booking createdBooking =
                bookingService.createBooking(booking);

        return new ResponseEntity<>(
                createdBooking,
                HttpStatus.CREATED
        );
    }


    // =====================================================
    // GET ALL BOOKINGS
    // =====================================================

    @GetMapping
    public ResponseEntity<List<Booking>>
    getAllBookings() {

        return ResponseEntity.ok(
                bookingService.getAllBookings()
        );
    }


    // =====================================================
    // GET BOOKING BY ID
    // =====================================================

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                bookingService.getBookingById(id)
        );
    }


    // =====================================================
    // GET BOOKINGS BY STUDENT
    // =====================================================

    @GetMapping("/student/{userId}")
    public ResponseEntity<List<Booking>>
    getBookingsByStudent(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                bookingService
                        .getBookingsByStudent(userId)
        );
    }


    // =====================================================
    // GET BOOKINGS BY EVENT
    // =====================================================

    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<Booking>>
    getBookingsByEvent(
            @PathVariable Long eventId) {

        return ResponseEntity.ok(
                bookingService
                        .getBookingsByEvent(eventId)
        );
    }


    // =====================================================
    // CANCEL BOOKING
    // =====================================================

    @PutMapping("/{id}/cancel")
    public ResponseEntity<Booking> cancelBooking(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                bookingService.cancelBooking(id)
        );
    }


    // =====================================================
    // DELETE BOOKING
    // =====================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBooking(
            @PathVariable Long id) {

        bookingService.deleteBooking(id);

        return ResponseEntity.ok(
                "Booking deleted successfully"
        );
    }
}