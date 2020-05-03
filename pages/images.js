import React from "react";
import styles from "../styles/styles";

const Images = () => (
  <div>
    <div className="hero">
      <h1 className="title">Images</h1>
      <div className="gallery">
        <figure>
          <img src="/static/fire.jpg" alt="fire" />
          <figcaption>Photo by Brooke Lewis from Pexelss</figcaption>
        </figure>
        <figure>
          <img src="/girl.jpg" alt="girl" />
          <figcaption>Photo by Chloe Amaya from Pexels</figcaption>
        </figure>
      </div>
    </div>
    <style jsx>{styles}</style>
  </div>
);

export default Images;
