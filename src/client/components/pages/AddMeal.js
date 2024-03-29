import React from "react";
import "../../style/forms.css";
import { useState, useEffect } from "react";


export function AddMeal() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [when, setWhen] = useState("");
    const [maxReservations, setMaxReservations] = useState();
    const [price, setPrice] = useState();
    const [isDone, setIsDone] = useState(false);

    const today = new Date();
    const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();

  const handleAddNewMealSubmit = async (e) => {
      if (
        title !== "" &&
        description !== "" &&
        location !== "" &&
        when !== "" &&
        description !== "" &&
        maxReservations !== "" &&
        price !== ""
      ) {
        e.preventDefault();
        const mealData = {
          title: title,
          description: description,
          location: location,
          when: when,
          max_reservations: Number(maxReservations),
          price: Number(price),
          created_date: date,
        };
        try {
          setIsDone(true);
          const response = await fetch("/api/meals", {
            method: "POST",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify(mealData),
          });
          if (response.ok) {
            setTitle("");
            setDescription("");
            setLocation("");
            setWhen("");
            setMaxReservations();
            setPrice("");
            alert(`Hooray! You've added ${title}.`);
            setIsDone(false);
          } else {
            alert(`Sorry! You cannot add meal due to ${response.status}.`);
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
      <section className="container">
        <h1 className="pink-text container-header">Add new meal</h1>
        <form onSubmit={handleAddNewMealSubmit} className="form-style border">
          <input
            className="input-form"
            type="text"
            placeholder="Title"
            value={title}
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <input
            className="input-form"
            type="text"
            placeholder="Description"
            value={description}
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          ></input>
          <input
            className="input-form"
            type="text"
            placeholder="Where (fx Aalborg, Odence)"
            value={location}
            name="location"
            onChange={(e) => setLocation(e.target.value)}
          ></input>
          <input
            className="input-form"
            type="date"
            placeholder="When"
            name="when"
            onChange={(e) => setWhen(e.target.value)}
          ></input>
          <input
            className="input-form"
            type="text"
            placeholder="Max number of reservations"
            value={maxReservations}
            name="max_reservations"
            onChange={(e) => setMaxReservations(e.target.value)}
          ></input>
          <input
            className="input-form"
            type="number"
            placeholder="Price"
            min="1"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
          ></input>
          {!isDone && <button className="submit-btn">Create meal</button>}
          {isDone && (
            <button type="submit" className="submit-btn" disabled>
              Creating meal...
            </button>
          )}
        </form>
      </section>
    );
}
