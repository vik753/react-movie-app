import React from "react";
import {withRouter} from 'react-router'

const Main = (props) => {
  // console.log(props);
  const background = props.bg;
  return (
    <main>
      <div
        className="main-bg"
        style={{backgroundImage: `${background}`}}
      />
      <div className="main-wrapper" id="main-wrapper">
        {props.cards}
      </div>
    </main>
  );
};

export default withRouter(Main);
