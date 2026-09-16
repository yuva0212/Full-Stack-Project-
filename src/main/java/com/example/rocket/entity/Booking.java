package com.example.rocket.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(
        name = "bookings",
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {
                                "user_id",
                                "event_id"
                        }
                )
        }
)
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    /*
     * Many bookings can belong to one student.
     */
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User student;

    /*
     * Many bookings can belong to one event.
     */
    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private LocalDate bookingDate;


    public Booking() {
    }


    public Booking(
            Long bookingId,
            User student,
            Event event,
            String status,
            LocalDate bookingDate) {

        this.bookingId = bookingId;
        this.student = student;
        this.event = event;
        this.status = status;
        this.bookingDate = bookingDate;
    }


    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }


    public User getStudent() {
        return student;
    }

    public void setStudent(User student) {
        this.student = student;
    }


    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDate bookingDate) {
        this.bookingDate = bookingDate;
    }
}