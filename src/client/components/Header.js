import React from "react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="container">
      <h3>
        <Link to="/">MealShare</Link>
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
