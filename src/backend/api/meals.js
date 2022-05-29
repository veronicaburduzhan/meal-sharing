const express = require("express");
const router = express.Router();
const knex = require("../database");

const validationValues = new Set([
  "title",
  "description",
  "location",
  "when",
  "max_reservations",
  "price",
  "created_date",
]);

// this function checks if input data valid and makes possible to update only neccesary data in table
function checkRequestInput(table) {
  try {
    let validRequestInput = {};
    for (const key in table) {
      if (validationValues.has(key)) {
        validRequestInput[key] = table[key];
      }
    }
    if ("when" in validRequestInput) {
      const whenFormatted = new Date(validRequestInput.when);
      if (!Date.parse(whenFormatted)) {
        throw new Error();
      }
    }
    if ("max_reservations" in validRequestInput) {
      if (isNaN(Number(validRequestInput.max_reservations))) {
        throw new Error();
      }
    }
    if ("price" in validRequestInput) {
      if (isNaN(Number(validRequestInput.price))) {
        throw new Error();
      }
    }
    if ("created_date" in validRequestInput) {
      const createdDateFormatted = new Date(validRequestInput.created_date);
      if (!Date.parse(createdDateFormatted)) {
        throw new Error();
      }
    }
    return validRequestInput;
  } catch (error) {
    throw error;
  }
}

router.get("/", async (request, response) => {
  try {
    const {
      maxPrice,
      title,
      availableReservations,
      createdAfter,
      limit,
      popularMeals,
    } = request.query;
    let meals = knex("meals");
    let filteredMeals = [];
    if (Object.keys(request.query).length === 0) {
      response.json(await meals);
      return;
    }

    if (maxPrice) {
      if (isNaN(Number(maxPrice))) {
        return response.send(400, "Please provide valid number for maxPrice.");
      } else {
        filteredMeals = await meals.where("price", "<", maxPrice);
      }
    }
    if (availableReservations) {
      // this query doesn't work, I've tryed different ways but still don't know how to fix it
      filteredMeals = await meals
        .join("reservations", "meals.id", "=", "reservations.meal_id")
        .select(
          "meals.title",
          "meals.description",
          "meals.location",
          "meals.when",
          "meals.max_reservations",
          knex.raw(`SUM(reservations.number_of_guests) AS total_guests`),
          knex.raw(
            `(meals.max_reservations - SUM(reservations.number_of_guests)) AS avaliable_reservations`
          ),
          "meals.price",
          "meals.created_date"
        )
        .groupBy("meals.id")
        .having(
          knex.raw(
            "(meals.max_reservations - SUM(reservations.number_of_guests)) > 0"
          )
        );
    }
    if (title) {
      filteredMeals = await meals.where(`title`, `like`, `%${title}%`);
    }
    if (createdAfter) {
      const selectedMealDate = new Date(createdAfter);
      if (Date.parse(selectedMealDate)) {
        filteredMeals = await meals.where(
          `created_date`,
          `>`,
          selectedMealDate
        );
      } else {
        return response.send(
          400,
          "Please provide valid date for createdAfter."
        );
      }
    }
    if (limit) {
      if (isNaN(Number(limit))) {
        return response.send(400, "Please provide valid number for limit.");
      } else {
        filteredMeals = await meals.limit(limit);
      }
    }

    if (popularMeals) {
      filteredMeals = await meals
        .join("reviews", "meals.id", "=", "reviews.meal_id")
        .select("meals.id", "meals.title", "location", "price")
        .where("reviews.stars", ">", "3")
        .groupBy("meal_id")
        .limit(4);
    }

    if (filteredMeals.length === 0) {
      return response.send(404, "There is no meal matching your search.");
    } else {
      response.json(filteredMeals);
    }
  } catch (error) {
    throw error;
  }
});

router.post("/", async (request, response) => {
  try {
    const validRequestInput = checkRequestInput(request.body);
    if (Object.keys(request.body).length === 0) {
      response.send(422, "Cannot add meal(s). Check input data!");
      return;
    }
    const insertMeal = await knex("meals").insert(validRequestInput);
    response.json(insertMeal);
  } catch (error) {
    throw error;
  }
});

router.get("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    if (!isNaN(parseInt(id, 10))) {
      const selectMeal = await knex("meals").where({ id: id });
      if (selectMeal.length === 0) {
        response.send(404, "There is no meal with a such id.");
        return;
      } else {
        response.json(selectMeal);
      }
    } else {
      response.send(400, "Please, provide valid meal id!");
    }
  } catch (error) {
    throw error;
  }
});

router.put("/:id", async (request, response) => {
  try {
    const validRequestInput = checkRequestInput(request.body);
    const id = request.params.id;
    if (Object.keys(request.body).length === 0) {
      response.send(422, "There is no data to update. Check input!");
      return;
    }
    const updateMeal = await knex("meals")
      .where({ id: id })
      .update(validRequestInput);
    response.json(updateMeal);
  } catch (error) {
    throw error;
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const deleteMeal = await knex("meals").where({ id: id }).del();
    response.json(deleteMeal);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
