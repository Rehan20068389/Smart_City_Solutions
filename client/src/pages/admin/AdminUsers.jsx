//Referance from chatgpt:"https://chatgpt.com/share/693dcbc6-add0-8008-bf76-50f05659fc0d"
import { useEffect, useState } from "react";
import api from "../../api/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {//Updates the users state with the response data
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load users");
    }
  };

  // update user
  const updateUser = async () => {
    try {
      const res = await api.put(`/admin/users/${editUser.id}`, {//Updates the UI immediately with the new data
        name: editUser.name,
        email: editUser.email,
        isActive: editUser.isActive,
      });
      //Closes the edit form after saving
      setUsers(users.map(u => (u.id === editUser.id ? res.data : u)));
      setEditUser(null);
    } catch (err) {
      alert("Failed to update user");
    }
  };

  //user Enable and Disable
  const toggleUser = async (id) => {
    try {
      const res = await api.patch(`/admin/users/${id}/toggle`);//Updates the UI without page reload
      setUsers(users.map(u => (u.id === id ? res.data : u)));//Flips isActive status true or false
    } catch (err) { 
      alert("Failed to change user status");
    }
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: 30 }}>
      <h2>Users</h2>

      {/* Edit  Form*/}
      {editUser && (
        <div style={{ marginBottom: 20 }}>
          <input
            placeholder="Name"
            value={editUser.name}
            onChange={e =>
              setEditUser({ ...editUser, name: e.target.value })
            }
          />

          <input
            placeholder="Email"
            value={editUser.email}
            onChange={e =>
              setEditUser({ ...editUser, email: e.target.value })
            }
          />

          <select
            value={editUser.isActive ? "true" : "false"}
            onChange={e =>
              setEditUser({
                ...editUser,
                isActive: e.target.value === "true",
              })
            }
          >
            <option value="true">Active</option>
            <option value="false">Disabled</option>
          </select>

          <button onClick={updateUser}>Save</button>
          <button onClick={() => setEditUser(null)}>Cancel</button>
        </div>
      )}

      {/* user table*/}
      <table width="100%" border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.isActive ? "Active" : "Disabled"}</td>
              <td>
                {/* Edit Button */}
                <button onClick={() => setEditUser(u)}>Edit</button>

                {/* Enable / Disable Button */}
                <button
                  onClick={() => toggleUser(u.id)}
                  style={{
                    marginLeft: 10,
                    background: u.isActive ? "#e53935" : "#43a047",
                    color: "#fff",
                  }}
                >
                  {u.isActive ? "Disable" : "Enable"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
