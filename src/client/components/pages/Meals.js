import React from "react";
import "../../style/meals.css";
import { useState, useEffect } from "react";
import { MealsInfo } from "./MealsInfo";
import { Link } from "react-router-dom";
import { SearchMeal } from "./SearchMeal";

export function Meals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
const [searchValue, setSearchValue] = useState("");

const handleSearch = (e) => {
  setSearchValue(e.target.value);
};

  const getMeals = async () => {
    if (searchValue === "") {
      const data = await fetch("/api/meals");
      const jsonData = await data.json();
      setMeals(jsonData);
      setIsLoading(false);
    } else {
      const data = await fetch("/api/meals?title=" + String(searchValue));
      const jsonData = await data.json();
      setMeals(jsonData);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getMeals();
  }, [searchValue]);

  const renderMeals = meals.map((meal, i) => {
    return (
      <Link to={`meals/${meal.id}`} className="mealInfoLink" key={meal.id}>
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
      <h1 className="pinkText">What is your next delicious expirience?</h1>
      <SearchMeal handleSearch={handleSearch} />
      <section className="mealsSection">
        <div className="mealsWrapper">
          {isLoading ? <p>Loading...</p> : ""}
          {renderMeals}
        </div>
      </section>
    </div>
  );
}
