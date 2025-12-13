//Referance from chagpt:"https://chatgpt.com/g/g-p-6931b1a54e548191b62a939dda79a3c1-programming/c/
// 693d7468-3e0c-8326-9e4f-0219b6acf7d3"
//Referance from Youtube:time:02:25:"https://youtu.be/tBObk72EYYw?si=2z-csRfIaL6bMlB6"
//Referance from stackover flow:"https://stackoverflow.com/questions/75927661/axioserror
// -request-failed-with-status-code-500-after-upgrading-to-php-8-x-and"
import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/bookings/my");
      setBookings(res.data || []);

    } catch (err) {
      console.error("Failed to fetch bookings:", err);
      setError(
        err.response?.data?.message ||
        "Failed to load your bookings. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p style={{ padding: 20 }}>Loading bookings...</p>;

  if (error)
    return (
      <p style={{ padding: 20, color: "red" }}>
        {error}
      </p>
    );

  return (
    <div style={{ padding: 20 }}>
      <h2>My Bookings</h2>

      {bookings.length === 0 && (
        <p>No bookings found.</p>
      )}

      {bookings.map((b) => (
        <div
          key={b.id}
          style={{
            border: "1px solid #ddd",
            marginBottom: 15,
            padding: 15,
            borderRadius: 6
          }}
        >
          <p><strong>Service Type:</strong> {b.serviceType}</p>
          <p><strong>From:</strong> {b.fromDate}</p>
          <p><strong>To:</strong> {b.toDate}</p>

          {/*  Car */}
          {b.serviceType === "car" && b.service && (
            <p>
              <strong>Car:</strong> {b.service.model} ({b.service.type}) – €
              {b.service.price_per_day}/day
            </p>
          )}

          {/*  Cook */}
          {b.serviceType === "cook" && b.service && (
            <p>
              <strong>Cook:</strong> {b.service.name} ({b.service.experience_years} yrs) – €
              {b.service.daily_rate}/day
            </p>
          )}

          <p><strong>Total Price:</strong> €{b.price}</p>
          <p><strong>Status:</strong> {b.status}</p>
          <p><strong>Payment:</strong> {b.paymentStatus}</p>
        </div>
      ))}
    </div>
  );
}
