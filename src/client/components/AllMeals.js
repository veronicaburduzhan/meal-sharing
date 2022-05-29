import React from "react";
import "../style/general.css";
import { useState, useEffect } from "react";
import { MealShortDesc } from "./MealShortDesc";
import { Link } from "react-router-dom";

export function AllMeals() {
  const [meals, setMeals] = useState([]);

  const fetchItem = async () => {
    const data = await fetch("/api/meals");
    const jsonData = await data.json();
    setMeals(jsonData);
  };

  useEffect(() => {
    fetchItem();
  }, []);

  const renderMeals = meals.map((meal, i) => {
    return (
      <Link to={`meals/${meal.id}`} className="mealShortDescLink">
        <MealShortDesc
          index={i}
          key={meal.id}
          title={meal.title}
          location={meal.location}
          price={meal.price}
        ></MealShortDesc>
      </Link>
    );
  });
  return (
    <>
      <h1>What is your next delicious expirience?</h1>
      <p>
      </p>
      <section className="mealsSection">
        <div className="mealsWrapper">{renderMeals}</div>
      </section>
    </>
  );
}
