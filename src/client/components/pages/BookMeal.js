import React from "react";
import { useState, useEffect } from "react";

export function BookMeal({ id, seatAvailable }) {
  const [phone, setPhone] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState();
  const [isDone, setIsDone] = useState(false);

  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    if (
      phone !== "" &&
      fullname !== "" &&
      email !== "" &&
      numberOfGuests !== ""
    ) {
      const reservationData = {
        number_of_guests: numberOfGuests,
        created_date: date,
        contact_phonenumber: phone,
        contact_name: fullname,
        contact_email: email,
        meal_id: id,
      };
      try {
        setIsDone(true);
        const response = await fetch("api/reservations", {
          method: "POST",
          headers: { "Content-Type": "Application/json" },
          body: JSON.stringify(reservationData),
        });
        if (response.ok) {
          alert("Hooray! You've just booked your seat(s).");
          setFullname("");
          setEmail("");
          setPhone("");
          setIsDone(false);
          return response.json;
        } else {
          alert(
            `Sorry! You cannot book your seat(s) due to ${response.status}.`
          );
          return;
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please, fill empty fields before submit!");
      return;
    }
  };

  return (
    <form onSubmit={handleReservationSubmit} className="formStyle border">
      <h2>
        Book your <span className="greenText">seat</span>
      </h2>
      {seatAvailable < 1 ? (
        <p>No availiable seats</p>
      ) : (
        <>
          <input
            type="text"
            placeholder="Name"
            value={fullname}
            name="contact_name"
            onChange={(e) => setFullname(e.target.value)}
          ></input>
          <input
            type="number"
            placeholder="Phone"
            value={phone}
            name="contact_phonenumber"
            onChange={(e) => setPhone(e.target.value)}
          ></input>
          <input
            type="email"
            placeholder="Email"
            value={email}
            name="contact_email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="number"
            placeholder="Select guests"
            min="1"
            max={seatAvailable.toString()}
            name="number_of_guests"
            onChange={(e) => setNumberOfGuests(e.target.value)}
          ></input>
        </>
      )}
      {!isDone && <button className="btn">Book seat</button>}
      {isDone && (
        <button className="btn" type="submit" disabled>
          Processing your reservation...
        </button>
      )}
    </form>
  );
}
