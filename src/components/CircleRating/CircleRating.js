import React from "react";
import "./circle-rating.scss";

class CircleRating extends React.Component {
  componentDidMount() {
    /*
    rating={60}
    width={40}
    ratingColor={"#06cf10"}
    textColor={"#fff"}
    bgColor={"#e2e2e2"}
    ratingWidth={5}
    */

    const {
      rating = 0,
      width = 50,
      ratingColor = "#06cf10",

      ratingWidth = 5,
    } = this.props;

    const canvas = document.getElementById("canvas");
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
      onePercent * rating,
      false
    );
    // ctx.arc(x, y, radius, angel_start, angel_end, anticlockwise);
    ctx.lineWidth = ratingWidth;
    if (rating >= 80) {
      ctx.strokeStyle = ratingColor;
    } else if (rating >= 50) {
      ctx.strokeStyle = "yellow";
    } else if (rating >= 30) {
      ctx.strokeStyle = "tomato";
    }
    ctx.lineWidth = ratingWidth;
    ctx.stroke();
  }
  render() {
    const {
      rating = 0,
      width = 50,
      textColor = "black",
      bgColor = "#fff",
      fontSize = "10px",
      fontWeight = "normal",
    } = this.props; //60, 100
    return (
      <div className="test-wrapper">
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
            id="canvas"
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
              transform: 'translateX(-50%)',
              left:( width / 2) + 2
            }}
          >
            {rating}
            <span
              style={{
                color: `${textColor}`,
                fontSize: `${fontSize - 5}px`,
                fontWeight: `normal`,
              }}
            >
              <sup>%</sup>
            </span>
          </span>
        </div>
      </div>
    );
  }
}

export default CircleRating;
