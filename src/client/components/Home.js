import React from "react";
import "../style/general.css";
import { useState, useEffect } from "react";
import { MealShortDesc } from "./MealShortDesc";
import { Link } from "react-router-dom";

export function Home() {
  const [meals, setMeals] = useState([]);

  const fetchItem = async () => {
    const data = await fetch("/api/meals?popularMeals=true");
    const jsonData = await data.json();
    setMeals(jsonData);
  };

  useEffect(() => {
    fetchItem();
  }, []);

  const renderMeals = meals.map((meal, i) => {
    return (
      <Link to={`meals/${meal.id}`} className="mealShortDescLink" key={meal.id}>
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
      <h1>Eat Together</h1>
      <p>
        From home or abroad, join intimate culinary experiences led by
        passionate hosts and chefs that will take your breath away.
      </p>
      <section className="mealsSection">
        <div className="mealsWrapper">{renderMeals}</div>
      </section>
    </>
  );
}
