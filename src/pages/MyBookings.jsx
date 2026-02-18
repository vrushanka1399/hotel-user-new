import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyBookings() {
  const [list, setList] = useState([]);
  const email = localStorage.getItem("user");

  useEffect(() => {
    load();
  }, [load]);

  const load = async () => {
    const res = await axios.get(
      "https://firestore.googleapis.com/v1/projects/ecompract/databases/(default)/documents/bookings"
    );

    if (!res.data.documents) {
      setList([]);
      return;
    }

    const arr = res.data.documents.map((d) => {
      const f = d.fields || {};

      return {
        id: d.name.split("/").pop(),
        hotel: f.hotel?.stringValue || "",
        price: Number(f.price?.integerValue || f.price?.stringValue || 0),
        image: f.image?.stringValue || "",
        guests: Number(f.guests?.integerValue || 0),
        checkIn: f.checkIn?.stringValue || "",
        checkOut: f.checkOut?.stringValue || "",
        email: f.email?.stringValue || "",
        status: f.status?.stringValue || "Pending",
      };
    });

    // ONLY CURRENT USER
    setList(arr.filter((b) => b.email === email));
  };

  const deleteBooking = async (id) => {
    await axios.delete(
      `https://firestore.googleapis.com/v1/projects/ecompract/databases/(default)/documents/bookings/${id}`
    );

    load();
  };

  // nights calculation
  const nights = (a, b) =>
    Math.max(
      1,
      Math.ceil((new Date(b) - new Date(a)) / (1000 * 60 * 60 * 24))
    );

  const totalAmount = list.reduce(
    (sum, b) => sum + b.price * nights(b.checkIn, b.checkOut),
    0
  );

  return (
    <div style={{ padding: 30 }}>
      <h2 style={{ color: "white" }}>My Bookings</h2>

      <div className="grid">
        {list.map((b) => (
          <div className="card" key={b.id}>
            {b.image && <img src={b.image} width="100%" alt="" />}

            <h3>{b.hotel}</h3>

            <p>Guests: {b.guests}</p>

            <p>
              {b.checkIn} → {b.checkOut}
            </p>

            <p>₹{b.price}/night</p>

            <b>Status: {b.status}</b>

            <br />

            <button
              onClick={() => deleteBooking(b.id)}
              style={{
                marginTop: 10,
                background: "#c79a5b",
                border: "none",
                padding: "6px 12px",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {list.length > 0 && (
        <h3 style={{ color: "#000", marginTop: 30 }}>
          Total Amount: ₹{totalAmount}
        </h3>
      )}
    </div>
  );
}
