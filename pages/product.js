import React from "react";
import Nav from "../components/nav";
import styles from "./styles";

const Product = () => (
  <div>
    <Nav />
    <div className="hero">
      <h1 className="title">Product Page</h1>
      <p className="description">
        Product page is not changed frequently. <br />
        So we can set the stale-while-revalidate which allow the browser use
        stale content and revalidate in the background.
      </p>
    </div>
    <style jsx>{styles}</style>
  </div>
);
export default Product;

export const getServerSideProps = async ({ res }) => {
  if (res) {
    res.setHeader("Cache-Control", "max-age=0, stale-while-revalidate=60");
  }

  return { props: {} };
};
