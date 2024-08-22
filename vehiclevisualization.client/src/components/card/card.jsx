import React from "react";
import { Card, CardContent } from "@mui/material";

const CardComponent = ({
  children,
  width,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  borderLeft
}) => {
  return (
    <Card sx={{ width, marginLeft, marginRight, marginTop, marginBottom, borderLeft }}>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardComponent;
