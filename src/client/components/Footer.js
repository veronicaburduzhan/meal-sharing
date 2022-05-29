import React from "react";
import "../style/general.css";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer>
      <section className="footerSectionWrapper">
        <h3>
          <Link to="/">EatTogether</Link>
        </h3>
        <nav>
          <ul>
            <Link to="#">
              <li className="links">Insta</li>
            </Link>
            <Link to="#">
              <li className="links">FB</li>
            </Link>
            <Link to="#">
              <li className="links">Twitter</li>
            </Link>
          </ul>
        </nav>
      </section>
      <section className="footerSectionWrapper">
        <p>EatTogether - Copyright 2022</p>
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
