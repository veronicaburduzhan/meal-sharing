const express = require("express");
const router = express.Router();
const knex = require("../database");

const validationValues = new Set([
  "number_of_guests",
  "meal_id",
  "created_date",
  "contact_phonenumber",
  "contact_name",
  "contact_email",
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
    if ("number_of_guests" in validRequestInput) {
      if (isNaN(Number(validRequestInput.number_of_guests))) {
        throw new Error();
      }
    }
    if ("meal_id" in validRequestInput) {
      if (isNaN(Number(validRequestInput.meal_id))) {
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
    const reservations = await knex("reservations");
    response.json(reservations);
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
        message: "Cannot add reservation(s). Check input data!",
      });
      return;
    }
    const insertReservation = await knex("reservations").insert(
      validRequestInput
    );
    response.json(insertReservation);
  } catch (error) {
    throw error;
  }
});

router.get("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    if (!isNaN(parseInt(id, 10))) {
      const selectReservation = await knex("reservations").where({ id: id });
      if (selectReservation.length === 0) {
        response.send(`There is no reservation with a such id.`);
        return;
      } else {
        response.json(selectReservation);
      }
    } else {
      response.send(400, "Please, provide valid reservation id!");
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
    const updateReservation = await knex("reservations")
      .where({ id: id })
      .update(validRequestInput);
    response.json(updateReservation);
  } catch (error) {
    throw error;
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const deleteReservation = await knex("reservations")
      .where({ id: id })
      .del();
    response.json(deleteReservation);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
