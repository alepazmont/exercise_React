import React from "react";
const Home = () => {
  return (
    <div className="block-message">
      <h2 className="title">Home</h2>
      <p>
        This React app and its corresponding Node.js API have been created for
        the Full Stack Developer Bootcamp at Upgrade Hub. The theme of Marvel
        has been chosen due to its multitude of characters, but upon accessing
        the official Marvel API, I found many shortcomings. The idea is to
        continue working on it to provide the information that the official API
        lacks.
      </p>

      <p>
        For any collaboration or inquiry, please contact <a href="mailto:info@alepaz.online">info@alepaz.online</a>
      </p>

      <p>April 2024.</p>
    </div>
  );
};

export default Home;
