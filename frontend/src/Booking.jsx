import { useEffect, useState } from "react";

function Booking() {

    const [students, setStudents] = useState([]);
    const [events, setEvents] = useState([]);
    const [bookings, setBookings] = useState([]);

    const [formData, setFormData] = useState({
        studentId: "",
        eventId: ""
    });


    // =====================================================
    // FETCH STUDENTS
    // =====================================================

    const fetchStudents = async () => {

        try {

            const response = await fetch(
                "http://localhost:8080/api/users"
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to fetch users"
                );
            }

            const users = await response.json();

            const studentUsers =
                users.filter(
                    (user) =>
                        user.role === "STUDENT"
                );

            setStudents(studentUsers);

        } catch (error) {

            console.error(
                "Error fetching students:",
                error
            );
        }
    };


    // =====================================================
    // FETCH EVENTS
    // =====================================================

    const fetchEvents = async () => {

        try {

            const response = await fetch(
                "http://localhost:8080/api/events"
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to fetch events"
                );
            }

            const data =
                await response.json();

            setEvents(data);

        } catch (error) {

            console.error(
                "Error fetching events:",
                error
            );
        }
    };


    // =====================================================
    // FETCH BOOKINGS
    // =====================================================

    const fetchBookings = async () => {

        try {

            const response = await fetch(
                "http://localhost:8080/api/bookings"
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to fetch bookings"
                );
            }

            const data =
                await response.json();

            setBookings(data);

        } catch (error) {

            console.error(
                "Error fetching bookings:",
                error
            );
        }
    };


    // =====================================================
    // LOAD DATA
    // =====================================================

    useEffect(() => {

        fetchStudents();
        fetchEvents();
        fetchBookings();

    }, []);


    // =====================================================
    // INPUT CHANGE
    // =====================================================

    const handleChange = (event) => {

        const { name, value } =
            event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };


    // =====================================================
    // REGISTER
    // =====================================================

    const handleSubmit = async (event) => {

        event.preventDefault();


        if (!formData.studentId) {

            alert("Please select a student");

            return;
        }


        if (!formData.eventId) {

            alert("Please select an event");

            return;
        }


        const requestBody = {

            student: {
                userId:
                    Number(formData.studentId)
            },

            event: {
                eventId:
                    Number(formData.eventId)
            }
        };


        try {

            const response = await fetch(
                "http://localhost:8080/api/bookings",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            requestBody
                        )
                }
            );


            if (!response.ok) {

                const message =
                    await response.text();

                alert(message);

                return;
            }


            const newBooking =
                await response.json();


            setBookings([
                ...bookings,
                newBooking
            ]);


            alert(
                "Registration successful"
            );


            setFormData({
                studentId: "",
                eventId: ""
            });


        } catch (error) {

            console.error(
                "Error creating booking:",
                error
            );

            alert(
                "Something went wrong"
            );
        }
    };


    // =====================================================
    // CANCEL BOOKING
    // =====================================================

    const handleCancel = async (id) => {

        const confirmCancel =
            window.confirm(
                "Cancel this registration?"
            );


        if (!confirmCancel) {
            return;
        }


        try {

            const response = await fetch(
                `http://localhost:8080/api/bookings/${id}/cancel`,
                {
                    method: "PUT"
                }
            );


            if (!response.ok) {

                const message =
                    await response.text();

                alert(message);

                return;
            }


            const cancelledBooking =
                await response.json();


            setBookings(
                bookings.map(
                    (booking) =>
                        booking.bookingId === id
                            ? cancelledBooking
                            : booking
                )
            );


            alert(
                "Registration cancelled"
            );


        } catch (error) {

            console.error(
                "Error cancelling booking:",
                error
            );

            alert(
                "Something went wrong"
            );
        }
    };


    return (

        <div className="booking-container">

            <h1>
                Event Management System
            </h1>


            {/* ==========================================
                REGISTRATION FORM
            ========================================== */}

            <h2>
                Event Registration
            </h2>


            <form onSubmit={handleSubmit}>

                {/* Student */}

                <select
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    required
                >

                    <option value="">
                        Select Student
                    </option>


                    {students.map(
                        (student) => (

                            <option
                                key={
                                    student.userId
                                }
                                value={
                                    student.userId
                                }
                            >
                                {
                                    student.userName
                                }
                            </option>

                        )
                    )}

                </select>


                {/* Event */}

                <select
                    name="eventId"
                    value={formData.eventId}
                    onChange={handleChange}
                    required
                >

                    <option value="">
                        Select Event
                    </option>


                    {events
                        .filter(
                            (event) =>
                                event.status ===
                                "OPEN"
                        )
                        .map(
                            (event) => (

                                <option
                                    key={
                                        event.eventId
                                    }
                                    value={
                                        event.eventId
                                    }
                                >
                                    {
                                        event.eventName
                                    }
                                    {" - "}
                                    {
                                        event.eventDate
                                    }
                                </option>

                            )
                        )}

                </select>


                <button type="submit">
                    Register
                </button>

            </form>


            {/* ==========================================
                BOOKINGS
            ========================================== */}

            <h2>
                Registrations
            </h2>


            <table>

                <thead>

                    <tr>

                        <th>
                            Booking ID
                        </th>

                        <th>
                            Student
                        </th>

                        <th>
                            Event
                        </th>

                        <th>
                            Event Date
                        </th>

                        <th>
                            Booking Date
                        </th>

                        <th>
                            Status
                        </th>

                        <th>
                            Action
                        </th>

                    </tr>

                </thead>


                <tbody>

                    {bookings.length === 0 ? (

                        <tr>

                            <td colSpan="7">
                                No registrations
                            </td>

                        </tr>

                    ) : (

                        bookings.map(
                            (booking) => (

                                <tr
                                    key={
                                        booking.bookingId
                                    }
                                >

                                    <td>
                                        {
                                            booking.bookingId
                                        }
                                    </td>


                                    <td>
                                        {
                                            booking
                                                .student
                                                .userName
                                        }
                                    </td>


                                    <td>
                                        {
                                            booking
                                                .event
                                                .eventName
                                        }
                                    </td>


                                    <td>
                                        {
                                            booking
                                                .event
                                                .eventDate
                                        }
                                    </td>


                                    <td>
                                        {
                                            booking
                                                .bookingDate
                                        }
                                    </td>


                                    <td>
                                        {
                                            booking.status
                                        }
                                    </td>


                                    <td>

                                        {booking.status ===
                                            "CONFIRMED" && (

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleCancel(
                                                        booking.bookingId
                                                    )
                                                }
                                            >
                                                Cancel
                                            </button>

                                        )}

                                    </td>

                                </tr>

                            )
                        )

                    )}

                </tbody>

            </table>

        </div>
    );
}

export default Booking;