import React from "react";
import Nav from "../components/nav";
import styles from "../styles/styles";

const Lambda = () => (
  <div>
    <Nav />
    <div className="hero">
      <h1 className="title">server-side renders</h1>
      <p className="description">
        server-side renders at runtime (uses getInitialProps or
        getServerSideProps)
      </p>
    </div>
    <style jsx>{styles}</style>
  </div>
);

export default Lambda;

export const getServerSideProps = async () => {
  return { props: {} };
};
