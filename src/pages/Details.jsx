import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Details() {
  const { id } = useParams();

  const [hotel, setHotel] = useState(null);
  const [guests, setGuests] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const email = localStorage.getItem("user");

  useEffect(() => {
   loadHotel();
}, [loadHotel]);

  const loadHotel = async () => {
    const res = await axios.get(
      `https://firestore.googleapis.com/v1/projects/ecompract/databases/(default)/documents/listings/${id}`
    );

    const f = res.data.fields;

    setHotel({
      name: f.name.stringValue,
      price: f.price.integerValue,
      city: f.city.stringValue,
      address: f.address.stringValue,
      pincode: f.pincode.stringValue,
      image: f.image.stringValue,
    });
  };

  const bookNow = async () => {
    if (!guests || !checkIn || !checkOut) {
      alert("Fill all fields");
      return;
    }

    await axios.post(
      "https://firestore.googleapis.com/v1/projects/ecompract/databases/(default)/documents/bookings",
      {
        fields: {
          hotel: { stringValue: hotel.name },
          image: { stringValue: hotel.image },
          city: { stringValue: hotel.city },
          guests: { integerValue: guests },
          checkIn: { stringValue: checkIn },
          checkOut: { stringValue: checkOut },
          email: { stringValue: email },
          status: { stringValue: "Pending" },
          price: { integerValue: hotel.price },

        },
      }
    );

    alert("Booking sent for approval");
  };

  if (!hotel) return null;

  return (
    <div style={{ width: "800px", margin: "auto" }}>
      <img
        src={hotel.image}
        style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: 12 }}
        alt=""
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

      <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />

      <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />

      <br />

      <button onClick={bookNow}>Book Now</button>
    </div>
  );
}
