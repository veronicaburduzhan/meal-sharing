import React from "react";
import { useState, useEffect } from "react";

export function LeaveReview({ id }) {
  const [titleReview, setTitleReview] = useState("");
  const [descriptionReview, setDescriptionReview] = useState("");
  const [stars, setStars] = useState("");
  const [isDone, setIsDone] = useState(false);

  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (titleReview !== "" && stars !== "") {
      const reviewData = {
        title: titleReview,
        description: descriptionReview,
        meal_id: id,
        stars: stars,
        created_date: date,
      };
      try {
        setIsDone(true);
        const response = await fetch("api/reviews", {
          method: "POST",
          headers: { "Content-Type": "Application/json" },
          body: JSON.stringify(reviewData),
        });
        if (response.ok) {
          alert("Your review is posted.");
          setTitleReview("");
          setDescriptionReview("");
          setStars("");
          setIsDone(false);
          return response.json;
        } else {
          alert(
            `Sorry! You cannot add a new review due to ${response.status}.`
          );
          return;
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please, add title and reting before submit!");
      return;
    }
  };
  return (
    <form onSubmit={handleReviewSubmit} className="form-style border">
      <h2 className="form-header">
        Leave a <span className="green-text">review</span>
      </h2>
      <input
        className="input-form"
        type="text"
        placeholder="Title"
        value={titleReview}
        name="title"
        onChange={(e) => setTitleReview(e.target.value)}
      ></input>
      <input
        className="input-form"
        type="number"
        placeholder="Stars"
        value={stars}
        min="1"
        max="5"
        name="stars"
        onChange={(e) => setStars(e.target.value)}
      ></input>
      <input
        className="input-form"
        type="text"
        placeholder="Description"
        value={descriptionReview}
        name="description"
        onChange={(e) => setDescriptionReview(e.target.value)}
      ></input>
      {!isDone && <button className="submit-btn">Leave a review</button>}
      {isDone && (
        <button className="submit-btn" type="submit" disabled>
          Posting your review...
        </button>
      )}
    </form>
  );
}
