import React from "react";
import PropTypes from "prop-types";
import "../style/general.css";
import { useState, useEffect } from "react";
import { MealDetails } from "./MealDetails";
import { Link } from "react-router-dom";
import { MealReviews } from "./MealReviews";

export function AddMeal() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [when, setWhen] = useState("");
    const [maxReservations, setMaxReservations] = useState();
    const [price, setPrice] = useState();
    const [message, setMessage] = useState("");
    const [isDone, setIsDone] = useState(false);

    const today = new Date();
    const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();

    const handleAddNewMealSubmit = async (e) => {
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
            let res = await fetch("/api/meals", {
                method: "POST",
                headers: { "Content-Type": "Application/json" },
                body: JSON.stringify(mealData),
            });

            let resJson = await res.json();
            if (res.status === 201) {
                // setFullname("");
                // setEmail("");
                // setPhone("");
                setMessage(`Hooray! You've added ${title}.`);
                setIsDone(false);
            } else {
                setMessage("Sorry! You cannot add meal due to some issues.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    //   const getMealById = async () => {
    //     const data = await fetch(`api/meals/${id}`);
    //     const jsonData = await data.json();
    //     setMeal(jsonData);
    //   };

    return (
      <>
        <h1>Add new meal</h1>
        <form onSubmit={handleAddNewMealSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Description"
            value={description}
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Where (fx Aalborg, Odence)"
            value={location}
            name="location"
            onChange={(e) => setLocation(e.target.value)}
          ></input>
          <input
            type="date"
            placeholder="When"
            name="when"
            onChange={(e) => setWhen(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Max number of reservations"
            value={maxReservations}
            name="max_reservations"
            onChange={(e) => setMaxReservations(e.target.value)}
          ></input>
          <input
            type="number"
            placeholder="Price"
            min="1"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
          ></input>
          {!isDone && <button>Create meal</button>}
          {isDone && (
            <button type="submit" disabled>
              Creating meal...
            </button>
          )}
          <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
      </>
    );
}
