import React from "react";
import Nav from "../components/nav";
import styles from "../styles/styles";

const SSG = () => (
  <div>
    <Nav />
    <div className="hero">
      <h1 className="title">server-side generated</h1>
      <p className="description">
        ● (SSG) automatically generated as static HTML + JSON (uses
        getStaticProps)
      </p>
    </div>
    <style jsx>{styles}</style>
  </div>
);

export default SSG;

export const getStaticProps = async () => {
  return { props: {} };
};
