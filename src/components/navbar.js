import React from "react"
import { useSpring, animated } from "react-spring"
import useWindowScroll from "@react-hook/window-scroll"

import Image from "../components/image"

const Navbar = ({ navImage }) => {
  const scrollY = useWindowScroll(60);

  return (
    <div style={{ height: "365px", overflow: "hidden", position: "relative" }}>
      <div
        style={{
          background: "transparent",
          position: "absolute",
          top: "10%",
          left: "50%",
          zIndex: 5,
          width: "620px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          fontFamily: "'Helvetica Neue',Helvetica,Arial,sans-serif",
          color: "white",
          textDecoration: "none",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          padding: "10px 0px",
          borderRadius: "5px",
          marginLeft: "-310px",
          letterSpacing: "1px",
          fontWeight: 100,
        }}
      >
        <a href="#" style={{ color: "white", textDecoration: "none" }}>HOME</a>
        <a href="#" style={{ color: "white", textDecoration: "none" }}>THE BAND</a>
        <a href="#" style={{ color: "white", textDecoration: "none" }}>THE STUDIO</a>
        <a href="#" style={{ color: "white", textDecoration: "none" }}>A/V</a>
        <a href="#" style={{ color: "white", textDecoration: "none" }}>SHOWS</a>
        <a href="#" style={{ color: "white", textDecoration: "none" }}>CONTACT</a>

      </div>
      <animated.div
        style={{
          transform: `translateY(-${(scrollY / 250) * 10}%)`,
          objectFit: "cover",
        }}
      >
        <Image data={navImage} style={{ height: "550px" }} />
      </animated.div>
    </div>
  );
}

export default Navbar