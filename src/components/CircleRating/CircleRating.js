import React from "react";
// import "./circle-rating.scss";

class CircleRating extends React.Component {
  componentDidMount() {
    const {
      rating = 0,
      width = 40,
      ratingColor = "#06cf10",
      ratingWidth = 3,
      id,
    } = this.props;

    const canvas = document.getElementById(id);
    const ctx = canvas.getContext("2d");
    const pi = Math.PI;
    const oneDegree = pi / 180;
    const onePercent = (360 / 100) * oneDegree;

    // bg-circle
    ctx.beginPath();
    ctx.arc(
      width / 2,
      width / 2,
      width / 2 - ratingWidth,
      0,
      onePercent * 100,
      false
    );
    ctx.strokeStyle = "#707070";
    ctx.lineWidth = ratingWidth;
    ctx.stroke();

    // rating-circle
    ctx.beginPath();
    ctx.arc(
      width / 2,
      width / 2,
      width / 2 - ratingWidth,
      0,
      onePercent * (rating * 10),
      false
    );
    // ctx.arc(x, y, radius, angel_start, angel_end, anticlockwise);
    ctx.lineWidth = ratingWidth;
    ctx.strokeStyle = "tomato";
    if (rating * 10 >= 80) {
      ctx.strokeStyle = ratingColor;
    } else if (rating * 10 >= 40) {
      ctx.strokeStyle = "yellow";
    }
    ctx.lineWidth = ratingWidth;
    ctx.stroke();
  }
  render() {
    const {
      rating = 0,
      width = 40,
      textColor = "#fff",
      bgColor = "#000",
      fontSize = "14",
      fontWeight = "normal",
      id
    } = this.props; //60, 100

    return (
      <div
        className="canvas-wrapper"
        style={{
          overflow: "hidden",
          width: `${width}px`,
          height: `${width}px`,
          borderRadius: "50%",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: `${bgColor}`,
        }}
      >
        <canvas
          id={id}
          className="canvas"
          width={width}
          height={width}
          style={{
            transform: "rotate(-90deg)",
            position: "absolute",
          }}
        ></canvas>
        <span
          className="rating-label"
          style={{
            color: `${textColor}`,
            fontSize: `${fontSize}px`,
            fontWeight: `${fontWeight}`,
            display: "block",
            position: "absolute",
            zIndex: "100",
            // transform: "translateX(-50%)",
            // left: width / 2 + 1,
          }}
        >
          {rating || "NR"}
          <span
            style={{
              color: `${textColor}`,
              fontSize: `${fontSize - 6}px`,
              fontWeight: `normal`,
            }}
          >
            {/* <sup>{rating ? '%' : null}</sup> */}
          </span>
        </span>
      </div>
    );
  }
}

export default CircleRating;
