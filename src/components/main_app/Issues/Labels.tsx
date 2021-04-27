import React from "react";
import Label from "./Label";

export default function Labels({ labels }) {
  return labels.map((label) => (
    <div key={label.id}>
      <Label color={label.color} text={label.name} />
    </div>
  ));
}
