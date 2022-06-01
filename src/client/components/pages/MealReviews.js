import React from "react";
import "../../style/reviews.css";

export function MealReviews({
  title,
  description,
  stars,
  created_date,
}) {
  return (
    <div className="reviewStyle">
      <h3 className="pinkText">{title}</h3>
        <p>
          Rating: <span className="greenText">{stars}</span>
        </p>
        <p>
          Date: <span className="greenText">{created_date}</span>
        </p>
        <p>{description}</p>
    </div>
  );
}
