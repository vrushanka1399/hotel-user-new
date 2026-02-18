import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Details() {
  const { id } = useParams();

  const [hotel, setHotel] = useState(null);
  const [guests, setGuests] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [loading, setLoading] = useState(true);

  const email = localStorage.getItem("user");

  const loadHotel = useCallback(async () => {
    try {
      const res = await axios.get(
        `https://firestore.googleapis.com/v1/projects/ecompract/databases/(default)/documents/listings/${id}`
      );

      const f = res.data.fields || {};

      setHotel({
        name: f.name?.stringValue || "",
        price: Number(f.price?.integerValue || 0),
        city: f.city?.stringValue || "",
        address: f.address?.stringValue || "",
        pincode: f.pincode?.stringValue || "",
        image: f.image?.stringValue || "",
      });

      setLoading(false);
    } catch (error) {
      console.error("Error loading hotel:", error);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadHotel();
  }, [loadHotel]);

  const bookNow = async () => {
    if (!guests || !checkIn || !checkOut) {
      alert("Fill all fields");
      return;
    }

    try {
      await axios.post(
        "https://firestore.googleapis.com/v1/projects/ecompract/databases/(default)/documents/bookings",
        {
          fields: {
            hotel: { stringValue: hotel.name || "" },
            image: { stringValue: hotel.image || "" },
            city: { stringValue: hotel.city || "" },
            guests: { integerValue: String(Number(guests)) },
            checkIn: { stringValue: checkIn || "" },
            checkOut: { stringValue: checkOut || "" },
            email: { stringValue: email || "" },
            status: { stringValue: "Pending" },
            price: { integerValue: String(Number(hotel.price || 0)) },
          },
        }
      );

      alert("Booking sent for approval");
    } catch (error) {
      console.error("Booking error:", error.response?.data || error);
      alert("Something went wrong while booking.");
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (!hotel) return <p style={{ textAlign: "center" }}>Hotel not found</p>;

  return (
    <div style={{ width: "800px", margin: "auto", padding: 20 }}>
      <img
        src={hotel.image}
        alt={hotel.name}
        style={{
          width: "100%",
          height: "300px",
          objectFit: "cover",
          borderRadius: 12,
        }}
      />

      <h2>{hotel.name}</h2>
      <p>₹{hotel.price}/night</p>
      <p>{hotel.address}</p>
      <p>{hotel.city}</p>
      <p>{hotel.pincode}</p>

      <input
        placeholder="Guests"
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
      />

      <br />

      <input
        type="date"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
      />

      <input
        type="date"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
      />

      <br />
      <br />

      <button onClick={bookNow}>Book Now</button>
    </div>
  );
}
