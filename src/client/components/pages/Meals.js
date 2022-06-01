import React from "react";
import "../../style/meals.css";
import { useState, useEffect } from "react";
import { MealsInfo } from "./MealsInfo";
import { Link } from "react-router-dom";

export function Meals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchItem = async () => {
    const data = await fetch("/api/meals", {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });
    const jsonData = await data.json();
    setMeals(jsonData);
    setIsLoading(false)
  };

  useEffect(() => {
    setIsLoading(true);
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
    <div className="container">
      <h1>What is your next delicious expirience?</h1>
      <p></p>
      <section className="mealsSection">
        <div className="mealsWrapper">
          {isLoading ? <p>Loading...</p> : ""}
          {renderMeals}
        </div>
      </section>
    </div>
  );
}
