import React from "react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="container">
      <h3>
        <Link to="/" className="greenText">
          MealShare
        </Link>
      </h3>
      <nav>
        <ul>
          <Link to="/">
            <li className="links">Home</li>
          </Link>
          <Link to="/AddMeal">
            <li className="links">Add Meal</li>
          </Link>
          <Link to="/Meals">
            <li className="links">Meals</li>
          </Link>
          <Link to="*">
            <li className="links">Contacts</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}
