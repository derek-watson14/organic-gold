import React from "react"

const ColorTitle = ({ text, marginBottom }) => {
  let backgroundWidth;
  if (text.length < 10) {
    backgroundWidth = text.length * 16.5;
  } else {
    backgroundWidth = text.length * 15;
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