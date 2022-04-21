const express = require("express");
const router = express.Router();
const knex = require("../database");

const reservationsColumns = new Set([
  "number_of_guests",
  "meal_id",
  "created_date",
  "contact_phonenumber",
  "contact_name",
  "contact_email",
]);

// this function checks if input data valid and makes possible to update only neccesary data in table

function checkTableData(table) {
  try {
    let validTableData = {};
    for (const key in table) {
      if (reservationsColumns.has(key)) {
        validTableData[key] = table[key];
      }
    }
    if ("number_of_guests" in validTableData) {
      if (isNaN(Number(validTableData.number_of_guests))) {
        throw new Error();
      }
    }
    if ("meal_id" in validTableData) {
      if (isNaN(Number(validTableData.meal_id))) {
        throw new Error();
      }
    }
    if ("created_date" in validTableData) {
      const createdDateFormatted = new Date(validTableData.created_date);
      if (!Date.parse(createdDateFormatted)) {
        throw new Error();
      }
    }
    return validTableData;
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
    const validTableData = checkTableData(request.body);
    if (Object.keys(request.body).length === 0) {
      response.statusCode = 422;
      response.json({
        message: "Cannot add reservation(s). Check input data!",
      });
      return;
    }
    const insertReservation = await knex("reservations").insert(validTableData);
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
    const validTableData = checkTableData(request.body);
    const id = request.params.id;
    if (Object.keys(request.body).length === 0) {
      response.send(422, "There is no data to update. Check input!");
      return;
    }
    const updateReservation = await knex("reservations")
      .where({ id: id })
      .update(validTableData);
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
