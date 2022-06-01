import React from "react";
import PropTypes from "prop-types";
import "../../style/forms.css"

import "../../style/meals.css";
import { useState, useEffect } from "react";
import { MealByIdInfo } from "./MealByIdInfo";
import { useParams } from "react-router-dom";
import { MealReviews } from "./MealReviews";
import { BookMeal } from "./BookMeal";
import { LeaveReview } from "./LeaveReview";

export function MealById() {
  const [meal, setMeal] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [seats, setSeats] = useState("");

  const { id } = useParams();

  const getMealById = async () => {
    const data = await fetch(`api/meals/${id}`);
    const jsonData = await data.json();
    setMeal(jsonData);
  };

  const getReservations = async () => {
    const data = await fetch(`/api/reservations`);
    const jsonData = await data.json();
    setReservations(jsonData);
  };

  const getReviews = async () => {
    const data = await fetch(`/api/reviews`);
    const jsonData = await data.json();
    setReviews(jsonData);
  };

  const seatReserved = reservations
    .filter((reservation) => reservation.meal_id === id)
    .map((guests) => guests.number_of_guests)
    .reduce((prev, curr) => prev + curr, 0);
  
  const maxReservations = meal.map((meal) => meal.max_reservations)[0];
  const seatAvailable = maxReservations - seatReserved;

  useEffect(() => {
    getMealById();
    getReservations();
    getReviews();
  }, []);

  const renderMeal = meal.map((meal, i) => {
    return (
      <MealByIdInfo
        index={i}
        key={meal.id}
        title={meal.title}
        location={meal.location}
        description={meal.description}
        when={meal.when}
        price={meal.price}
      ></MealByIdInfo>
    );
  });

  const renderReviews = reviews
    .filter((review) => review.meal_id === Number(id))
    .map((review, i) => {
      return (
        <MealReviews
          index={i}
          key={review.id}
          title={review.title}
          description={review.description}
          created_date={review.created_date}
          stars={review.stars}
        ></MealReviews>
      );
    });

  return (
    <div className="container">
      <section className="mealContainer">
        <section className="mealByIdInfo">{renderMeal}</section>
      </section>
      <section className="bookReviewContainer">
        <section className="reservationSection">
          {seatAvailable < 1 ? (
            <p>No availiable seats</p>
          ) : (
            <BookMeal id={id} seatAvailable={seatAvailable} isDone={isDone} />
          )}
        </section>
        <section className="reviewSection">
          {renderReviews}
          <LeaveReview id={id} isDone={isDone} />
        </section>
      </section>
    </div>
  );
}
