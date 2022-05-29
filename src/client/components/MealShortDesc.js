import React from "react";
import "../style/general.css";

export function MealShortDesc({ title, location, price }) {
  return (
    <div className="mealShortDesc">
      <div>
        <img src="https://via.placeholder.com/200x150"></img>
        <h3 className="pinkText">{title}</h3>
      </div>
      <div className="mealShortDescInfo">
        <p>
          Dinner in <span className="greenText">{location}</span>
        </p>
        <p>
          DKK <span>{price}</span>
        </p>
      </div>
    </div>
  );
}
