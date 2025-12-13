//Referance from chatgpt:"https://chatgpt.com/share/693dcbc6-add0-8008-bf76-50f05659fc0d"
//Referance from youtube:"https://youtu.be/tBObk72EYYw?si=SQoC2lo2ycZgWCoi"

import { useEffect, useState } from "react";
import api from "../../api/api";

export default function AdminProviders() {
  const [providers, setProviders] = useState([]);
  const [editProvider, setEditProvider] = useState(null);//Stores provider currently being edited
  const [loading, setLoading] = useState(true);//Shows loading state while fetching data
  const [error, setError] = useState("");

  // Fetch all providers
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);//Runs once when the page loads
        const res = await api.get("/admin/providers");
        setProviders(res.data);//Saves provider list to state
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch providers");
      } finally {
        setLoading(false);
      }
    };
    fetchProviders();
  }, []);

  // Toggle provider status
  const toggleProvider = async (id) => {
    try {
      const res = await api.patch(`/admin/providers/${id}/toggle`);
      setProviders(providers.map(p => p.id === id ? res.data : p));
    } catch (err) {
      alert("Failed to update provider status");
    }
  };

  // Delete provider
  const deleteProvider = async (id) => {
    if (!window.confirm("Delete this provider?")) return;
    try {
      await api.delete(`/admin/providers/${id}`);
      setProviders(providers.filter(p => p.id !== id));
    } catch (err) {
      alert("Failed to delete provider");
    }
  };

  // update  provider
  //my own modifications
  const updateProvider = async () => {
    try {
      const res = await api.put(
        `/admin/providers/${editProvider.id}`,
        {
          name: editProvider.name,
          email: editProvider.email,
          isActive: editProvider.isActive,
        }
      );

      setProviders(
        providers.map(p => p.id === editProvider.id ? res.data : p)
      );
      setEditProvider(null);
    } catch (err) {
      alert("Failed to update provider");
    }
  };

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: 30 }}>
      <h2>Service Providers</h2>

      {/* 🔹 Edit Form */}
      {editProvider && (
        <div style={{ marginBottom: 20 }}>
          <input
            placeholder="Name"
            value={editProvider.name}
            onChange={(e) =>
              setEditProvider({ ...editProvider, name: e.target.value })
            }
          />
          <input
            placeholder="Email"
            value={editProvider.email}
            onChange={(e) =>
              setEditProvider({ ...editProvider, email: e.target.value })
            }
          />
          <select
            value={editProvider.isActive}
            onChange={(e) =>
              setEditProvider({
                ...editProvider,
                isActive: e.target.value === "true",
              })
            }
          >
            <option value="true">Active</option>
            <option value="false">Disabled</option>
          </select>

          <button onClick={updateProvider}>Save</button>
          <button onClick={() => setEditProvider(null)}>Cancel</button>
        </div>
      )}

      {/* Providers Table */}
      <table width="100%" border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.email}</td>
              <td>{p.role}</td>
              <td>{p.isActive ? "Active" : "Disabled"}</td>
              <td>
                <button onClick={() => setEditProvider(p)}>Edit</button>
                <button onClick={() => toggleProvider(p.id)}>
                  {p.isActive ? "Disable" : "Enable"}
                </button>
                <button
                  onClick={() => deleteProvider(p.id)}
                  style={{ background: "red", color: "#fff" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
