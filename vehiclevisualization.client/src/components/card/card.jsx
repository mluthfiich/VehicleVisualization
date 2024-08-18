import React from "react";
import { Card, CardContent } from "@mui/material";

const CardComponent = ({ children }) => {
  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardComponent;