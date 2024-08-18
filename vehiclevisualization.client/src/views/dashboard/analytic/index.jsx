import React from "react";
import Main from "../../../components/main/main";
import "./analytic.css";
import CardComponent from "../../../components/card/card";
import { Box } from "@mui/material";

const Analytic = () => {
  return (
    <Main>
      <Box>
        <CardComponent></CardComponent> 
      </Box>
    </Main>
  );
};

export default Analytic;