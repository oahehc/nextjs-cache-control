import React from "react";
import Nav from "../components/nav";
import styles from "../styles/styles";

const Test = () => (
  <div>
    <Nav />
    <div className="hero">
      <h1 className="title">Test</h1>
    </div>
    <style jsx>{styles}</style>
  </div>
);

export default Test;

export const getServerSideProps = async ({ res }) => {
  return { props: {} };
};
