import React from "react";
import "../style/home.css";
import { useState, useEffect } from "react";
import { MealsInfo } from "./pages/MealsInfo";
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
        <MealsInfo
          index={i}
          key={meal.id}
          title={meal.title}
          location={meal.location}
          price={meal.price}
        ></MealsInfo>
      </Link>
    );
  });
  return (
    <div className="center">
      <div className="banner">
        <h1>MealShare</h1>
        <p>
          From home or abroad, join intimate culinary experiences led by
          passionate hosts and chefs that will take your breath away.
        </p>
      </div>
      <section className="container mealsSection">
        <div className="mealsWrapper">{renderMeals}</div>
      </section>
    </div>
  );
}
