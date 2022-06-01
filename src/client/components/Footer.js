import React from "react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer>
      <section className="footerSection">
        <ul>
          <Link to="#">
            <li className="links">
              <img
                className="socialMedia"
                src="https://cdn4.iconfinder.com/data/icons/social-media-black-white-2/600/Instagram_glyph_svg-512.png"
              ></img>
            </li>
          </Link>
          <Link to="#">
            <li className="links">
              <img
                className="socialMedia"
                src="https://cdn3.iconfinder.com/data/icons/social-media-black-white-2/512/BW_Facebook_2_glyph_svg-512.png"
              ></img>
            </li>
          </Link>
          <Link to="#">
            <li className="links">
              <img
                className="socialMedia"
                src="https://cdn3.iconfinder.com/data/icons/social-media-black-white-2/512/BW_Twitter_glyph_svg-512.png"
              ></img>
            </li>
          </Link>
        </ul>
      </section>
      <section className="footerSection">
        <p>
          <Link to="/">EatTogether</Link> - Copyright 2022
        </p>
        <div>
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
