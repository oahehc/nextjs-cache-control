import React from "react";
import Nav from "../components/nav";
import styles from "../styles/styles";

const Home = () => (
  <div>
    <Nav />
    <div className="hero">
      <h1 className="title">Home</h1>
      <p className="description">Next.js Default cache-control policy</p>
    </div>
    <style jsx>{styles}</style>
  </div>
);

export default Home;
