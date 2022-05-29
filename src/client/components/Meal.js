import React from "react";
import PropTypes from "prop-types";
import "../style/general.css";
import { useState, useEffect } from "react";
import { MealDetails } from "./MealDetails";
import { Link, useParams } from "react-router-dom";
import { MealReviews } from "./MealReviews";

export function Meal() {
  const [meal, setMeal] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState("");
  const [isDone, setIsDone] = useState(false);

  const [phone, setPhone] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState();

  const [titleReview, setTitleReview] = useState("");
  const [descriptionReview, setDescriptionReview] = useState("");
  const [stars, setStars] = useState("");

  const { id } = useParams();

  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    const reservationData = {
      number_of_guests: numberOfGuests,
      created_date: date,
      contact_phonenumber: phone,
      contact_name: fullname,
      contact_email: email,
      meal_id: id,
    };

    try {
      setIsDone(true);
      let res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify(reservationData),
      });

      let resJson = await res.json();
      if (res.status === 201) {
        setFullname("");
        setEmail("");
        setPhone("");
        setMessage("Hooray! You've just booked your seat(s).");
        setIsDone(false);
      } else {
        setMessage("Sorry! You cannot book your seat(s) due to some issues.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      title: titleReview,
      description: descriptionReview,
      meal_id: id,
      stars: stars,
      created_date: date,
    };

    try {
      setIsDone(true);
      let res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify(reservationData),
      });

      let resJson = await res.json();
      if (res.status === 201) {
        // setFullname("");
        // setEmail("");
        // setPhone("");
        setMessage("Your review is posted.");
        setIsDone(false);
      } else {
        setMessage("Sorry! You cannot add a new review due to some issues.");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    .filter((reservation) => reservation.meal_id === Number(id))
    .map((guests) => guests.number_of_guests)
    .reduce((prev, curr) => prev + curr, 0);

  const maxReservations = meal.map((meal) => meal.max_reservations)[0];
  const seatAvailable = maxReservations - seatReserved;

  const mealTitle = meal.map((meal) => meal.title)[0];

  useEffect(() => {
    getMealById();
    getReservations();
    getReviews();
  }, []);

  const renderMeal = meal.map((meal, i) => {
    return (
      <MealDetails
        index={i}
        key={meal.id}
        title={meal.title}
        location={meal.location}
        description={meal.description}
        when={meal.when}
        price={meal.price}
      ></MealDetails>
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

  //const createdDate = setDate(new Date());

  return (
    <>
      <h1>{mealTitle}</h1>
      <div className="container">
        <section className="mealContainer">
          <section className="mealByIdSection">{renderMeal}</section>
          <section className="formBookSection">
            <div>
              <form
                onSubmit={handleReviewSubmit}
                className="formStyle formWidth"
              >
                <h2>Book seat</h2>
                <input
                  type="text"
                  placeholder="Title"
                  value={fullname}
                  name="contact_name"
                  onChange={(e) => setFullname(e.target.value)}
                ></input>
                <input
                  type="number"
                  placeholder="Phone"
                  value={phone}
                  name="contact_phonenumber"
                  onChange={(e) => setPhone(e.target.value)}
                ></input>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  name="contact_email"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                <input
                  type="number"
                  placeholder="Select guests"
                  min="1"
                  max={seatAvailable}
                  name="number_of_guests"
                  onChange={(e) => setNumberOfGuests(e.target.value)}
                ></input>
                {!isDone && <button className="btn">Book seat</button>}
                {isDone && (
                  <button className="btn" type="submit" disabled>
                    Processing your reservation...
                  </button>
                )}
              </form>
            </div>
          </section>
        </section>
        <section className="reviewContainer">
          <section className="reviewSection">{renderReviews}</section>
          <section className="formReviewSection">
            <div>
              <form onSubmit={handleReviewSubmit} className="formStyle">
                <p>Leave your review</p>
                <input
                  type="text"
                  placeholder="Title"
                  value={titleReview}
                  name="title"
                  onChange={(e) => setTitleReview(e.target.value)}
                ></input>
                <input
                  type="number"
                  placeholder="Stars"
                  value={stars}
                  min="1"
                  max="5"
                  name="stars"
                  onChange={(e) => setStars(e.target.value)}
                ></input>
                <input
                  type="text"
                  placeholder="Description"
                  value={descriptionReview}
                  name="description"
                  onChange={(e) => setDescriptionReview(e.target.value)}
                ></input>
                {!isDone && <button className="btn">Leave a review</button>}
                {isDone && (
                  <button className="btn" type="submit" disabled>
                    Posting your review...
                  </button>
                )}
                <div className="message">
                  {message ? <p>{message}</p> : null}
                </div>
              </form>
            </div>
          </section>
        </section>
      </div>
    </>
  );
}
