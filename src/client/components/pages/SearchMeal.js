import React from "react";
import "../../style/forms.css";

export function SearchMeal({ handleSearch }) {
  return (
    <section className="form-style border search-section">
      <input
        className="input-form"
        type="text"
        onChange={handleSearch}
        placeholder="Search meals"
      ></input>
    </section>
  );
}
