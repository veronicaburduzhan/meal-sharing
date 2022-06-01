const express = require("express");
const router = express.Router();
const knex = require("../database");

const validationValues = new Set([
  "title",
  "description",
  "meal_id",
  "stars",
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
    if ("meal_id" in validRequestInput) {
      if (isNaN(Number(validRequestInput.meal_id))) {
        throw new Error();
      }
    }

    if ("stars" in validRequestInput) {
      if (isNaN(Number(validRequestInput.stars))) {
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
    const reviews = await knex("reviews");
    response.json(reviews);
  } catch (error) {
    throw error;
  }
});

router.post("/", async (request, response) => {
  try {
    const validRequestInput = checkRequestInput(request.body);
    if (Object.keys(request.body).length === 0) {
      response.statusCode = 422;
      response.json({
        message: "Cannot add review(s). Check input data!",
      });
      return;
    }
    const insertReview = await knex("reviews").insert(validRequestInput);
    response.json(insertReview);
  } catch (error) {
    throw error;
  }
});

router.get("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    if (isNaN(parseInt(id, 10))) {
      response.send(400, "Please, provide valid review id!");
      return;
    }
    const selectReview = await knex("reviews").where({ id: id });
    if (selectReview.length === 0) {
      response.send(`There is no review with a such id.`);
      return;
    } else {
      response.json(selectReview);
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
    const updateReview = await knex("reviews")
      .where({ id: id })
      .update(validRequestInput);
    response.json(updateReview);
  } catch (error) {
    throw error;
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const deleteReview = await knex("reviews").where({ id: id }).del();
    response.json(deleteReview);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
