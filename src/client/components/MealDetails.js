import React from "react";
import PropTypes from "prop-types";
import "../style/general.css";
import { useState, useEffect } from "react";

export function MealDetails({ title, description, location, price, when, max_reservations }) {
    return (
    <div className="mealDesc">
  
        <img src="https://via.placeholder.com/200x150"></img>
        <p>
          Dinner in <span className="greenText">{location}</span>
        </p>
        <p>Date: {when}</p>
        <p>{description}</p>
        <p>DKK {price}</p>
 
    </div>
  );
}
