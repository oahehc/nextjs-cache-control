import React from "react";
import generateETag from "../utils/generateETag";
import Nav from "../components/nav";
import styles from "../styles/styles";

const Product = () => (
  <div>
    <Nav />
    <div className="hero">
      <h1 className="title">Product Page</h1>
      <p className="description">
        The product page is not changed frequently. <br />
        So we can set the stale-while-revalidate which allows the browser to use
        stale content and revalidate in the background.
      </p>
    </div>
    <style jsx>{styles}</style>
  </div>
);
export default Product;

export const getServerSideProps = async ({ res }) => {
  if (res) {
    // res.setHeader("age", 2);
    // res.setHeader("date", "Sun, 03 May 2020 12:32:41 GMT");
    res.setHeader(
      "Cache-Control",
      "public,max-age=10,stale-while-revalidate=20"
    );
    res.setHeader("ETag", generateETag(30));
  }

  return { props: {} };
};
