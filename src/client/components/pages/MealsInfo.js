import React from "react";
import "../../style/meals.css";

export function MealsInfo({ title, location, price }) {
  return (
    <div className="meal-info">
      <div>
        <img
          src="https://via.placeholder.com/200x150"
          className="meal-info-img"
          alt="Placeholder image"
        ></img>
        <h3 className="pink-text meal-info-header">{title}</h3>
      </div>
      <div className="meal-info-details">
        <p>
          Dinner in <span className="green-text">{location}</span>
        </p>
        <p className="price">DKK {price}</p>
      </div>
    </div>
  );
}