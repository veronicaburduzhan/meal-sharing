import React from "react";
import PropTypes from "prop-types";
import "../../style/forms.css";

import "../../style/meals.css";
import { useState, useEffect } from "react";
import { MealByIdInfo } from "./MealByIdInfo";
import { useParams } from "react-router-dom";
import { MealReviews } from "./MealReviews";
import { BookMeal } from "./BookMeal";
import { LeaveReview } from "./LeaveReview";
import { PageNotFound } from "./Page404";

export function MealById() {
  const [meal, setMeal] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [availiableMeals, setAvailableMeals] = useState([]);

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

  const getAvailableMeals = async () => {
    const data = await fetch(`api/meals?availableReservations=true`);
    const jsonData = await data.json();
    setAvailableMeals(jsonData);
  };

  // const seatReserved = reservations
  //   .filter((reservation) => reservation.meal_id === id)
  //   .map((guests) => guests.number_of_guests)
  //   .reduce((prev, curr) => prev + curr, 0);

  // const maxReservations = meal.map((meal) => meal.max_reservations)[0];
  // const seatAvailable = maxReservations - seatReserved;

  useEffect(() => {
    getMealById();
    getReservations();
    getReviews();
    getAvailableMeals();
  }, []);

  const mealToBook = availiableMeals.find(
    (meal) => parseInt(meal.id) === parseInt(id)
  );

  const renderMeal = meal.map((meal, i) => {
    return (
      <MealByIdInfo
        index={i}
        key={meal.id}
        title={meal.title}
        location={meal.location}
        description={meal.description}
        when={meal.when
          .split("T")
          .join(" ")
          .slice(0, meal.when.length - 8)}
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
          created_date={review.created_date
            .split("T")
            .join(" ")
            .slice(0, review.created_date.length - 8)}
          stars={review.stars}
        ></MealReviews>
      );
    });

  return (
    renderMeal.length > 0 ? (
        <div className="container">
          <section className="mealContainer">
            <section className="mealByIdInfo">{renderMeal}</section>
          </section>
          <section className="bookReviewContainer">
            <section className="reservationSection">
              {mealToBook ? (
                <BookMeal id={id} />
              ) : (
                <div className="formStyle border">
                  <h2>
                    Book your <span className="greenText">seat</span>
                  </h2>
                  Sorry, there are no availiable seats left.
                </div>
              )}
            </section>
            <section className="reviewSection">
              {renderReviews}
              <LeaveReview id={id} />
            </section>
          </section>
        </div>
      ) : (
        <PageNotFound />
      )
  );
}
