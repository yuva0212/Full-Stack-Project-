import { useEffect, useState } from "react";

function User() {

    const [users, setUsers] = useState([]);

    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        mobileNo: "",
        role: "STUDENT"
    });

    const [editingId, setEditingId] = useState(null);

    // =========================
    // GET ALL USERS
    // =========================
    const fetchUsers = async () => {

        try {

            const response = await fetch(
                "http://localhost:8080/api/users"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }

            const data = await response.json();

            setUsers(data);

        } catch (error) {

            console.error("Error fetching users:", error);

        }
    };


    // =========================
    // LOAD USERS WHEN PAGE OPENS
    // =========================
    useEffect(() => {

        fetchUsers();

    }, []);


    // =========================
    // HANDLE INPUT CHANGE
    // =========================
    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };


    // =========================
    // CREATE / UPDATE USER
    // =========================
    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            // =========================
            // UPDATE
            // =========================
            if (editingId !== null) {

                const response = await fetch(
                    `http://localhost:8080/api/users/${editingId}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(formData)
                    }
                );

                if (!response.ok) {

                    const errorMessage = await response.text();

                    alert(errorMessage);

                    return;
                }

                const updatedUser = await response.json();

                setUsers(
                    users.map((user) =>
                        user.userId === editingId
                            ? updatedUser
                            : user
                    )
                );

                alert("User updated successfully");

                // Reset form
                setFormData({
                    userName: "",
                    email: "",
                    mobileNo: "",
                    role: "STUDENT"
                });

                setEditingId(null);

                return;
            }


            // =========================
            // CREATE
            // =========================
            const response = await fetch(
                "http://localhost:8080/api/users",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(formData)
                }
            );

            if (!response.ok) {

                const errorMessage = await response.text();

                alert(errorMessage);

                return;
            }

            const newUser = await response.json();

            setUsers([
                ...users,
                newUser
            ]);

            alert("User created successfully");

            // Reset form
            setFormData({
                userName: "",
                email: "",
                mobileNo: "",
                role: "STUDENT"
            });

        } catch (error) {

            console.error("Error saving user:", error);

            alert("Something went wrong");

        }
    };


    // =========================
    // EDIT USER
    // =========================
    const handleEdit = (user) => {

        setEditingId(user.userId);

        setFormData({
            userName: user.userName,
            email: user.email,
            mobileNo: user.mobileNo,
            role: user.role
        });

    };


    // =========================
    // DELETE USER
    // =========================
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const response = await fetch(
                `http://localhost:8080/api/users/${id}`,
                {
                    method: "DELETE"
                }
            );

            if (!response.ok) {

                const errorMessage = await response.text();

                alert(errorMessage);

                return;
            }

            // Remove user from frontend
            setUsers(
                users.filter(
                    (user) => user.userId !== id
                )
            );

            // If deleting currently edited user
            if (editingId === id) {

                setEditingId(null);

                setFormData({
                    userName: "",
                    email: "",
                    mobileNo: "",
                    role: "STUDENT"
                });
            }

            alert("User deleted successfully");

        } catch (error) {

            console.error("Error deleting user:", error);

            alert("Something went wrong");

        }
    };


    // =========================
    // CANCEL EDIT
    // =========================
    const handleCancel = () => {

        setEditingId(null);

        setFormData({
            userName: "",
            email: "",
            mobileNo: "",
            role: "STUDENT"
        });
    };


    return (

        <div className="user-container">

            <h1>Event Management System</h1>


            {/* =========================
                CREATE / EDIT FORM
            ========================= */}

            <h2>
                {editingId !== null
                    ? "Edit User"
                    : "Create User"
                }
            </h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="userName"
                    placeholder="User Name"
                    value={formData.userName}
                    onChange={handleChange}
                    required
                />


                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />


                <input
                    type="text"
                    name="mobileNo"
                    placeholder="Mobile Number"
                    value={formData.mobileNo}
                    onChange={handleChange}
                    required
                />


                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                >

                    <option value="STUDENT">
                        Student
                    </option>

                    <option value="ORGANIZER">
                        Organizer
                    </option>

                </select>


                {/* Submit button */}

                <button type="submit">

                    {editingId !== null
                        ? "Update User"
                        : "Create User"
                    }

                </button>


                {/* Cancel button only during edit */}

                {editingId !== null && (

                    <button
                        type="button"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>

                )}

            </form>


            {/* =========================
                USER TABLE
            ========================= */}

            <h2>Users</h2>

            <table>

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Name</th>

                        <th>Email</th>

                        <th>Mobile</th>

                        <th>Role</th>

                        <th>Actions</th>

                    </tr>

                </thead>


                <tbody>

                    {users.length === 0 ? (

                        <tr>

                            <td colSpan="6">
                                No users found
                            </td>

                        </tr>

                    ) : (

                        users.map((user) => (

                            <tr key={user.userId}>

                                <td>
                                    {user.userId}
                                </td>

                                <td>
                                    {user.userName}
                                </td>

                                <td>
                                    {user.email}
                                </td>

                                <td>
                                    {user.mobileNo}
                                </td>

                                <td>
                                    {user.role}
                                </td>

                                <td>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleEdit(user)
                                        }
                                    >
                                        Edit
                                    </button>


                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDelete(
                                                user.userId
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>
    );
}

export default User;