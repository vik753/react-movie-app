import React from "react";

const Main = (props) => {
  const background = props.bg;
  return (
    <main>
      <div
        className="main-bg"
        style={{ backgroundImage: `${background}` }}
      ></div>
      <div className="main-wrapper" id="main-wrapper">
        {props.cards}
      </div>
    </main>
  );
};

export default Main;
