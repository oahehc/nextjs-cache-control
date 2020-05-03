import React from "react";
import etag from "etag";
import Nav from "../components/nav";
import styles from "../styles/styles";

const Tos = () => (
  <div>
    <Nav />
    <div className="hero">
      <h1 className="title">Terms of service</h1>
      <p className="description">
        Terms of service is usually not change. <br />
        So we can provide a longer max-age or even add immutable property to
        save the bandwidth.
      </p>
    </div>
    <style jsx>{styles}</style>
  </div>
);

export default Tos;

export const getServerSideProps = async ({ res }) => {
  if (res) {
    res.setHeader("Cache-Control", "max-age=60, immutable");
    res.setHeader("ETag", etag("Terms of service"));
  }

  return { props: {} };
};
