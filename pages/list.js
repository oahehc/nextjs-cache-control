import React from "react";
import Nav from "../components/nav";
import generateETag from "../utils/generateETag";
import styles from "../styles/styles";

const List = () => (
  <div>
    <Nav />
    <div className="hero">
      <h1 className="title">List Page</h1>
      <p className="description">
        The list page might change frequently. <br />
        Therefore, we should re-validate whether the cache is stale or not on
        every request.
      </p>
    </div>
    <style jsx>{styles}</style>
  </div>
);

export default List;

export const getServerSideProps = async ({ res }) => {
  if (res) {
    res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
    res.setHeader("ETag", generateETag(10));
  }

  return { props: {} };
};
