import React from "react";
import "../../style/forms.css";

export function SearchMeal({ handleSearch }) {
  return (
    <section className="formStyle border searchSection">
      <input
        className="searchMealInput"
        type="text"
        onChange={handleSearch}
        placeholder="Search meals"
      ></input>
    </section>
  );
}
