import React from "react"

const ColorTitle = ({ text, marginBottom }) => {
  let backgroundWidth;
  let chars = text.length;
  if (chars < 10) {
    backgroundWidth = chars * 16.5;
  } else if (chars >= 10 && chars <= 20) {
    backgroundWidth = chars * 15.75;
  } else {
    backgroundWidth = chars * 15;
  }

  const containerStyle = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: marginBottom,
  }

  const backgroundStyle = {
    background: "linear-gradient(to top right, #FC9D81, #CA4874)",
    height: "35px",
    width: backgroundWidth,
    transform: "rotate(-2.5deg) translate(0px, 8px) skew(-7deg)",
  }

  const textStyle = {
    fontWeight: "normal",
    fontSize: "2.5em",
    position: "absolute",
    top: "0%",
    margin: 0,
    fontFamily: "'Boogaloo', cursive"
  }

  return (
    <div style={containerStyle}>
      <div style={backgroundStyle}></div>
      <h1 style={textStyle}>{text}</h1>
    </div>
  )
}

export default ColorTitle;