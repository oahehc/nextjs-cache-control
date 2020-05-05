import React from "react";
import Nav from "../components/nav";
import styles from "../styles/styles";

const Static = () => (
  <div>
    <Nav />
    <div className="hero">
      <h1 className="title">Static</h1>
      <p className="description">
        ○ (Static) automatically rendered as static HTML (uses no initial props)
      </p>
    </div>
    <style jsx>{styles}</style>
  </div>
);

export default Static;
