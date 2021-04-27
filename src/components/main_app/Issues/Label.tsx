import React from "react";
import colourForFont from "../../../helpers/colourForFont";

export default function Label({ color, text }) {
  return (
    <div
      style={{
        backgroundColor: `#${color}`,
        borderRadius: "20px",
        textAlign: "center",
        padding: "4px",
        margin: "2px",
        position: "relative",
        color: colourForFont(color),
        marginBottom: "10px",
      }}
    >
      {text}
    </div>
  );
}
