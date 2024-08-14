import React from "react";
import Main from "../../components/main/main";
import "./style.css";
import { Box, Typography, Button, CardContent, Card, CardActions } from "@mui/material";

const DataVehicle = () => {
  return (
    <Main>
      <Box>
        <Card sx={{ maxWidth: "100%" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Box>
    </Main>
  );
};

export default DataVehicle;