import React from "react";

export function MealByIdInfo({ title, description, location, price, when }) {
    return (
      <>
        <img
          className="meal-by-id-info-img"
          src="https://via.placeholder.com/450x370"
        ></img>
        <div className="border">
          <h1 className="meal-by-id-info-header pink-text">{title}</h1>
          <p className="price meal-by-id-info-text">DKK {price}</p>
          <p className="meal-by-id-info-text">
            Dinner in <span className="green-text">{location}</span> | Date:
            <span className="green-text"> {when}</span>
          </p>
          <p className="meal-by-id-info-text">{description}</p>
        </div>
      </>
    );
}
