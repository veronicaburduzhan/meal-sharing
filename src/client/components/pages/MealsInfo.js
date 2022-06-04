import React from "react";
import "../../style/meals.css";

export function MealsInfo({ title, location, price }) {
  return (
    <div className="mealInfo">
      <div>
        <img src="https://via.placeholder.com/200x150"></img>
        <h3 className="pinkText">{title}</h3>
      </div>
      <div className="mealInfoDetails">
        <p>
          Dinner in <span className="greenText">{location}</span>
        </p>
        <p className="price">DKK {price}</p>
      </div>
    </div>
  );
}
