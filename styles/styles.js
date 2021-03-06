import css from "styled-jsx/css";

export default css`
  .hero {
    width: 100%;
    color: #333;
  }
  .title {
    margin: 0;
    width: 100%;
    padding-top: 80px;
    line-height: 1.15;
    font-size: 48px;
  }
  .title,
  .description {
    text-align: center;
  }
  .description {
    line-height: 1.5rem;
  }
  .gallery {
    display: flex;
    justify-content: center;
  }
  .gallery > figure {
    width: 40%;
  }
  .gallery img {
    width: 100%;
  }
`;
