import React from "react";
import "../../style/reviews.css";

export function MealReviews({
  title,
  description,
  stars,
  created_date,
}) {
  return (
    <div className="review-style">
      <h3 className="pink-text review-header">{title}</h3>
      <p className="review-text">
        Rating: <span className="green-text">{stars}</span>
      </p>
      <p className="review-text">
        Date: <span className="green-text">{created_date}</span>
      </p>
      <p className="review-text">{description}</p>
    </div>
  );
}
