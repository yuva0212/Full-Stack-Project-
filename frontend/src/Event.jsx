import { useEffect, useState } from "react";

function Event() {

    const [events, setEvents] = useState([]);
    const [organizers, setOrganizers] = useState([]);

    const [formData, setFormData] = useState({
        organizerId: "",
        eventName: "",
        eventDate: "",
        venue: "",
        capacity: "",
        price: "",
        status: "OPEN"
    });

    const [editingId, setEditingId] = useState(null);


    // =========================
    // GET EVENTS
    // =========================
    const fetchEvents = async () => {

        try {

            const response = await fetch(
                "http://localhost:8080/api/events"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch events");
            }

            const data = await response.json();

            setEvents(data);

        } catch (error) {

            console.error(
                "Error fetching events:",
                error
            );
        }
    };


    // =========================
    // GET ORGANIZERS
    // =========================
    const fetchOrganizers = async () => {

        try {

            const response = await fetch(
                "http://localhost:8080/api/users"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }

            const users = await response.json();

            const organizerUsers = users.filter(
                (user) => user.role === "ORGANIZER"
            );

            setOrganizers(organizerUsers);

        } catch (error) {

            console.error(
                "Error fetching organizers:",
                error
            );
        }
    };


    // =========================
    // LOAD DATA
    // =========================
    useEffect(() => {

        fetchEvents();
        fetchOrganizers();

    }, []);


    // =========================
    // INPUT CHANGE
    // =========================
    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };


    // =========================
    // CREATE / UPDATE
    // =========================
    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!formData.organizerId) {

            alert("Please select an organizer");

            return;
        }

        const requestBody = {

            organizer: {
                userId: Number(formData.organizerId)
            },

            eventName: formData.eventName,

            eventDate: formData.eventDate,

            venue: formData.venue,

            capacity: Number(formData.capacity),

            price: Number(formData.price),

            status: formData.status
        };


        try {

            // =========================
            // UPDATE
            // =========================
            if (editingId !== null) {

                const response = await fetch(
                    `http://localhost:8080/api/events/${editingId}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(requestBody)
                    }
                );

                if (!response.ok) {

                    const message =
                        await response.text();

                    alert(message);

                    return;
                }

                const updatedEvent =
                    await response.json();

                setEvents(
                    events.map((event) =>
                        event.eventId === editingId
                            ? updatedEvent
                            : event
                    )
                );

                alert("Event updated successfully");

            }

            // =========================
            // CREATE
            // =========================
            else {

                const response = await fetch(
                    "http://localhost:8080/api/events",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(requestBody)
                    }
                );

                if (!response.ok) {

                    const message =
                        await response.text();

                    alert(message);

                    return;
                }

                const newEvent =
                    await response.json();

                setEvents([
                    ...events,
                    newEvent
                ]);

                alert("Event created successfully");
            }


            resetForm();

        } catch (error) {

            console.error(
                "Error saving event:",
                error
            );

            alert("Something went wrong");
        }
    };


    // =========================
    // EDIT
    // =========================
    const handleEdit = (event) => {

        setEditingId(event.eventId);

        setFormData({

            organizerId:
                event.organizer.userId,

            eventName:
                event.eventName,

            eventDate:
                event.eventDate,

            venue:
                event.venue,

            capacity:
                event.capacity,

            price:
                event.price,

            status:
                event.status
        });
    };


    // =========================
    // DELETE
    // =========================
    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this event?"
            );

        if (!confirmDelete) {
            return;
        }


        try {

            const response = await fetch(
                `http://localhost:8080/api/events/${id}`,
                {
                    method: "DELETE"
                }
            );

            if (!response.ok) {

                const message =
                    await response.text();

                alert(message);

                return;
            }

            setEvents(
                events.filter(
                    (event) =>
                        event.eventId !== id
                )
            );

            alert("Event deleted successfully");

        } catch (error) {

            console.error(
                "Error deleting event:",
                error
            );

            alert("Something went wrong");
        }
    };


    // =========================
    // RESET FORM
    // =========================
    const resetForm = () => {

        setEditingId(null);

        setFormData({
            organizerId: "",
            eventName: "",
            eventDate: "",
            venue: "",
            capacity: "",
            price: "",
            status: "OPEN"
        });
    };


    return (

        <div className="event-container">

            <h1>
                Event Management System
            </h1>


            <h2>
                {editingId !== null
                    ? "Edit Event"
                    : "Create Event"
                }
            </h2>


            <form onSubmit={handleSubmit}>

                {/* Organizer */}

                <select
                    name="organizerId"
                    value={formData.organizerId}
                    onChange={handleChange}
                    required
                >

                    <option value="">
                        Select Organizer
                    </option>

                    {organizers.map(
                        (organizer) => (

                            <option
                                key={organizer.userId}
                                value={organizer.userId}
                            >
                                {organizer.userName}
                            </option>

                        )
                    )}

                </select>


                {/* Event Name */}

                <input
                    type="text"
                    name="eventName"
                    placeholder="Event Name"
                    value={formData.eventName}
                    onChange={handleChange}
                    required
                />


                {/* Event Date */}

                <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    required
                />


                {/* Venue */}

                <input
                    type="text"
                    name="venue"
                    placeholder="Venue"
                    value={formData.venue}
                    onChange={handleChange}
                    required
                />


                {/* Capacity */}

                <input
                    type="number"
                    name="capacity"
                    placeholder="Capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    min="1"
                    required
                />


                {/* Price */}

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    required
                />


                {/* Status */}

                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >

                    <option value="OPEN">
                        OPEN
                    </option>

                    <option value="CLOSED">
                        CLOSED
                    </option>

                    <option value="CANCELLED">
                        CANCELLED
                    </option>

                </select>


                {/* Submit */}

                <button type="submit">

                    {editingId !== null
                        ? "Update Event"
                        : "Create Event"
                    }

                </button>


                {/* Cancel */}

                {editingId !== null && (

                    <button
                        type="button"
                        onClick={resetForm}
                    >
                        Cancel
                    </button>

                )}

            </form>


            <h2>
                Events
            </h2>


            <table>

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Organizer</th>

                        <th>Event Name</th>

                        <th>Date</th>

                        <th>Venue</th>

                        <th>Capacity</th>

                        <th>Price</th>

                        <th>Status</th>

                        <th>Actions</th>

                    </tr>

                </thead>


                <tbody>

                    {events.length === 0 ? (

                        <tr>

                            <td colSpan="9">
                                No events found
                            </td>

                        </tr>

                    ) : (

                        events.map(
                            (event) => (

                                <tr
                                    key={
                                        event.eventId
                                    }
                                >

                                    <td>
                                        {
                                            event.eventId
                                        }
                                    </td>

                                    <td>
                                        {
                                            event
                                                .organizer
                                                .userName
                                        }
                                    </td>

                                    <td>
                                        {
                                            event.eventName
                                        }
                                    </td>

                                    <td>
                                        {
                                            event.eventDate
                                        }
                                    </td>

                                    <td>
                                        {
                                            event.venue
                                        }
                                    </td>

                                    <td>
                                        {
                                            event.capacity
                                        }
                                    </td>

                                    <td>
                                        ₹
                                        {
                                            event.price
                                        }
                                    </td>

                                    <td>
                                        {
                                            event.status
                                        }
                                    </td>

                                    <td>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleEdit(
                                                    event
                                                )
                                            }
                                        >
                                            Edit
                                        </button>


                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDelete(
                                                    event.eventId
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

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

export default Event;