import React from "react";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router'

const AboutMovie = (props) => {
  // console.log(props);
  return (
    <main>
      <div>
        <h2>About Movie, movie id: {props.match.params.id}</h2>
        <Link to="/">Go home</Link>
      </div>
    </main>

  );
}

export default withRouter(AboutMovie);
