import React from "react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="container">
      <h3>
        <Link to="/" className="green-text">
          MealShare
        </Link>
      </h3>
      <nav>
        <ul className="nav-list">
          <Link to="/">
            <li className="links nav-links">Home</li>
          </Link>
          <Link to="/AddMeal">
            <li className="links nav-links">Add Meal</li>
          </Link>
          <Link to="/Meals">
            <li className="links nav-links">Meals</li>
          </Link>
          <Link to="*">
            <li className="links nav-links">Contacts</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}
