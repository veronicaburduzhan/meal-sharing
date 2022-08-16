import React from "react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer>
      <section className="footer-section">
        <ul className="footer-list">
          <Link to="#">
            <li className="links">
              <img
                className="social-media"
                src="https://cdn4.iconfinder.com/data/icons/social-media-black-white-2/600/Instagram_glyph_svg-512.png"
              ></img>
            </li>
          </Link>
          <Link to="#">
            <li className="links">
              <img
                className="social-media"
                src="https://cdn3.iconfinder.com/data/icons/social-media-black-white-2/512/BW_Facebook_2_glyph_svg-512.png"
              ></img>
            </li>
          </Link>
          <Link to="#">
            <li className="links">
              <img
                className="social-media"
                src="https://cdn3.iconfinder.com/data/icons/social-media-black-white-2/512/BW_Twitter_glyph_svg-512.png"
              ></img>
            </li>
          </Link>
        </ul>
      </section>
      <section className="footer-section">
        <p>
          <Link to="/" className="links">
            MealShare
          </Link>
          - Copyright 2022
        </p>
        <div className="legit-links">
          <Link to="#">
            <p className="links">Terms and Conditions</p>
          </Link>
          <Link to="#">
            <p className="links">Privacy Policy</p>
          </Link>
        </div>
      </section>
    </footer>
  );
}
