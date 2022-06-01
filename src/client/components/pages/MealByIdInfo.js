import React from "react";

export function MealByIdInfo({ title, description, location, price, when, max_reservations }) {
    return (
      <>
        <img src="https://via.placeholder.com/450x370"></img>
        <div className="border">
          <h1 className="pinkText">{title}</h1>
          <p className="price">DKK {price}</p>
          <p>
            Dinner in <span className="greenText">{location}</span> | Date:
            <span className="greenText"> {when}</span>
          </p>
          <p>{description}</p>
        </div>
      </>
    );
}
