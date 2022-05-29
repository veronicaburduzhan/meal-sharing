import React from "react";
import "../style/general.css";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header>
      <h3>
        <Link to="/">EatTogether</Link>
      </h3>
      <nav>
        <ul>
          <Link to="/">
            <li className="links">Home</li>
          </Link>
          <Link to="/AddMeal">
            <li className="links">Add Your Meal</li>
          </Link>
          <Link to="/Meals">
            <li className="links">Explore Meals</li>
          </Link>
          <Link to="/Contact">
            <li className="links">Contact us</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}
