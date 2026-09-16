import { useState } from "react";

import User from "./User";
import Event from "./Event";
import Booking from "./Booking";

function App() {

    const [activeModule, setActiveModule] = useState("dashboard");

    return (
        <div className="app">

            {/* =========================================
                SIDEBAR
            ========================================= */}

            <aside className="sidebar">

                <div className="brand">

                    <div className="brand-icon">
                        EM
                    </div>

                    <div>
                        <h2>EventHub</h2>
                        <span>Management System</span>
                    </div>

                </div>


                <div className="sidebar-menu">

                    <p className="menu-title">
                        MAIN MENU
                    </p>


                    <button
                        className={
                            activeModule === "dashboard"
                                ? "menu-item active"
                                : "menu-item"
                        }
                        onClick={() =>
                            setActiveModule("dashboard")
                        }
                    >
                        <span className="menu-icon">⌂</span>
                        Dashboard
                    </button>


                    <button
                        className={
                            activeModule === "user"
                                ? "menu-item active"
                                : "menu-item"
                        }
                        onClick={() =>
                            setActiveModule("user")
                        }
                    >
                        <span className="menu-icon">👥</span>
                        Users
                    </button>


                    <button
                        className={
                            activeModule === "event"
                                ? "menu-item active"
                                : "menu-item"
                        }
                        onClick={() =>
                            setActiveModule("event")
                        }
                    >
                        <span className="menu-icon">📅</span>
                        Events
                    </button>


                    <button
                        className={
                            activeModule === "booking"
                                ? "menu-item active"
                                : "menu-item"
                        }
                        onClick={() =>
                            setActiveModule("booking")
                        }
                    >
                        <span className="menu-icon">🎟</span>
                        Registrations
                    </button>


                    <p className="menu-title second-title">
                        SYSTEM
                    </p>


                    <button
                        className="menu-item"
                        onClick={() =>
                            alert(
                                "Attendance module will be available next."
                            )
                        }
                    >
                        <span className="menu-icon">✓</span>
                        Attendance
                    </button>


                    <button
                        className="menu-item"
                        onClick={() =>
                            alert(
                                "Payment module is not required for the current use case."
                            )
                        }
                    >
                        <span className="menu-icon">₹</span>
                        Payments
                    </button>

                </div>


                <div className="sidebar-footer">

                    <div className="footer-avatar">
                        EM
                    </div>

                    <div>
                        <strong>Event Admin</strong>
                        <span>Administrator</span>
                    </div>

                </div>

            </aside>


            {/* =========================================
                MAIN AREA
            ========================================= */}

            <main className="main-content">

                {/* TOP BAR */}

                <header className="topbar">

                    <div>

                        <span className="breadcrumb">
                            Event Management
                        </span>

                        <h1>
                            {activeModule === "dashboard" &&
                                "Dashboard"}

                            {activeModule === "user" &&
                                "User Management"}

                            {activeModule === "event" &&
                                "Event Management"}

                            {activeModule === "booking" &&
                                "Registration Management"}
                        </h1>

                    </div>


                    <div className="topbar-right">

                        <div className="status-indicator">
                            <span className="status-dot"></span>
                            System Online
                        </div>

                        <div className="profile-circle">
                            A
                        </div>

                    </div>

                </header>


                {/* =====================================
                    DASHBOARD
                ===================================== */}

                {activeModule === "dashboard" && (

                    <section className="dashboard">

                        <div className="welcome-card">

                            <div>

                                <span className="welcome-label">
                                    WELCOME BACK
                                </span>

                                <h2>
                                    Event Management Dashboard
                                </h2>

                                <p>
                                    Manage users, organize technical
                                    events and handle student
                                    registrations from one place.
                                </p>

                            </div>

                            <div className="welcome-icon">
                                📅
                            </div>

                        </div>


                        {/* STAT CARDS */}

                        <div className="stats-grid">

                            <div className="stat-card">

                                <div className="stat-icon users-icon">
                                    👥
                                </div>

                                <div>

                                    <span>
                                        TOTAL USERS
                                    </span>

                                    <strong>
                                        Manage
                                    </strong>

                                    <p>
                                        Students & Organizers
                                    </p>

                                </div>

                            </div>


                            <div className="stat-card">

                                <div className="stat-icon events-icon">
                                    📅
                                </div>

                                <div>

                                    <span>
                                        EVENTS
                                    </span>

                                    <strong>
                                        Manage
                                    </strong>

                                    <p>
                                        Technical Events
                                    </p>

                                </div>

                            </div>


                            <div className="stat-card">

                                <div className="stat-icon booking-icon">
                                    🎟
                                </div>

                                <div>

                                    <span>
                                        REGISTRATIONS
                                    </span>

                                    <strong>
                                        Manage
                                    </strong>

                                    <p>
                                        Student Registrations
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* QUICK ACTIONS */}

                        <div className="section-heading">

                            <div>
                                <h2>Quick Actions</h2>
                                <p>
                                    Access the main modules quickly.
                                </p>
                            </div>

                        </div>


                        <div className="quick-actions">

                            <button
                                className="action-card"
                                onClick={() =>
                                    setActiveModule("user")
                                }
                            >

                                <div className="action-icon">
                                    👥
                                </div>

                                <div>
                                    <h3>
                                        Manage Users
                                    </h3>

                                    <p>
                                        Create, edit and delete
                                        students and organizers.
                                    </p>
                                </div>

                                <span className="arrow">
                                    →
                                </span>

                            </button>


                            <button
                                className="action-card"
                                onClick={() =>
                                    setActiveModule("event")
                                }
                            >

                                <div className="action-icon">
                                    📅
                                </div>

                                <div>
                                    <h3>
                                        Manage Events
                                    </h3>

                                    <p>
                                        Create and manage
                                        technical events.
                                    </p>
                                </div>

                                <span className="arrow">
                                    →
                                </span>

                            </button>


                            <button
                                className="action-card"
                                onClick={() =>
                                    setActiveModule("booking")
                                }
                            >

                                <div className="action-icon">
                                    🎟
                                </div>

                                <div>
                                    <h3>
                                        Registrations
                                    </h3>

                                    <p>
                                        Register students and
                                        manage cancellations.
                                    </p>

                                </div>

                                <span className="arrow">
                                    →
                                </span>

                            </button>

                        </div>


                        {/* APPLICATION FLOW */}

                        <div className="flow-section">

                            <div className="section-heading">

                                <div>

                                    <h2>
                                        Application Flow
                                    </h2>

                                    <p>
                                        How the event system works.
                                    </p>

                                </div>

                            </div>


                            <div className="flow-container">

                                <div className="flow-step">

                                    <div className="flow-number">
                                        01
                                    </div>

                                    <div>
                                        <strong>
                                            User
                                        </strong>

                                        <span>
                                            Create Student /
                                            Organizer
                                        </span>
                                    </div>

                                </div>


                                <div className="flow-line"></div>


                                <div className="flow-step">

                                    <div className="flow-number">
                                        02
                                    </div>

                                    <div>
                                        <strong>
                                            Event
                                        </strong>

                                        <span>
                                            Organizer creates
                                            event
                                        </span>
                                    </div>

                                </div>


                                <div className="flow-line"></div>


                                <div className="flow-step">

                                    <div className="flow-number">
                                        03
                                    </div>

                                    <div>
                                        <strong>
                                            Registration
                                        </strong>

                                        <span>
                                            Student registers
                                            for event
                                        </span>
                                    </div>

                                </div>


                                <div className="flow-line"></div>


                                <div className="flow-step">

                                    <div className="flow-number">
                                        04
                                    </div>

                                    <div>
                                        <strong>
                                            Attendance
                                        </strong>

                                        <span>
                                            Event-day check-in
                                        </span>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </section>

                )}


                {/* =====================================
                    USER MODULE
                ===================================== */}

                {activeModule === "user" && (

                    <section className="module-card">

                        <User />

                    </section>

                )}


                {/* =====================================
                    EVENT MODULE
                ===================================== */}

                {activeModule === "event" && (

                    <section className="module-card">

                        <Event />

                    </section>

                )}


                {/* =====================================
                    BOOKING MODULE
                ===================================== */}

                {activeModule === "booking" && (

                    <section className="module-card">

                        <Booking />

                    </section>

                )}

            </main>

        </div>
    );
}

export default App;