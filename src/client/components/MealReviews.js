import React from "react";
import "../style/general.css";

export function MealReviews({
  title,
  description,
  stars,
  created_date,
}) {
  return (
    <div className="reviewStyle">
      <h3>{title}</h3>
      <div className="">
        <p>Rating: {stars}</p>
        <p>Date: {created_date}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}
