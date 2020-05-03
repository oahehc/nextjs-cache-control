import React from "react";
import etag from "etag";
import Nav from "../components/nav";
import styles from "../styles/styles";

const List = () => (
  <div>
    <Nav />
    <div className="hero">
      <h1 className="title">List Page</h1>
      <p className="description">
        The list page might change frequently. <br />
        Therefore, we should revalidate the cache is staled or not on every
        request.
      </p>
    </div>
    <style jsx>{styles}</style>
  </div>
);

export default List;

export const getServerSideProps = async ({ res }) => {
  if (res) {
    const etagKey = `list_${Date.now()}`;

    res.setHeader("Cache-Control", "max-age=0");
    res.setHeader("ETag", etag(etagKey));
  }

  return { props: {} };
};
