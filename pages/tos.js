import React from "react";
import generateETag from "../utils/generateETag";
import Nav from "../components/nav";
import styles from "../styles/styles";

const Tos = () => (
  <div>
    <Nav />
    <div className="hero">
      <h1 className="title">Terms of service</h1>
      <p className="description">
        The terms of service are usually not changed. <br />
        So we can provide a longer max-age or even add an immutable property to
        save the bandwidth.
      </p>
    </div>
    <style jsx>{styles}</style>
  </div>
);

export default Tos;

export const getServerSideProps = async ({ res }) => {
  if (res) {
    res.setHeader("Cache-Control", "public, max-age=30, immutable");
    res.setHeader("ETag", generateETag());
  }

  return { props: {} };
};
