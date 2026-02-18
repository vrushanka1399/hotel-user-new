import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Explore() {
  const [list, setList] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await axios.get(
      "https://firestore.googleapis.com/v1/projects/ecompract/databases/(default)/documents/listings"
    );

    if (!res.data.documents) {
      setList([]);
      return;
    }

    const arr = res.data.documents.map((d) => {
      const f = d.fields || {};

      return {
        id: d.name.split("/").pop(),

        name: f.name?.stringValue || "",
        price: f.price?.integerValue || "",
        city: f.city?.stringValue || "",
        image: f.image?.stringValue || "",
      };
    });

    setList(arr);
  };

  return (
    <div className="grid">
      {list.map((h) => (
        <Link
          key={h.id}
          to={`/explore/${h.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="card">
            <img src={h.image} className="hotel-img" alt="" />

            <h3>{h.name}</h3>
            <p>₹{h.price}/night</p>
            <p>{h.city}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
