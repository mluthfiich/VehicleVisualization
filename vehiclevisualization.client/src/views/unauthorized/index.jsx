import React from "react";
import { Box, Typography, Button } from "@mui/material";
import "./unauthorized.css";
import img from "../../assets/images/img-unauthorized.jpg";
import { useNavigate } from "react-router";
import useMediaQuery from "@mui/material/useMediaQuery";

const Unauthorized = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleLogout = () => {
    localStorage.removeItem("Bearer ");
    navigate("/login");
  };

  return (
    <Box
      className={`container ${isMobile ? "mobile" : ""}`}
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: isMobile ? "column" : "row",
      }}
    >
      <Box
        className="imageContainer"
        sx={{ width: isMobile ? "100%" : "36%", justifyContent: "center" }}
      >
        <img src={img} alt="401 Unauthorized" className="image" />
      </Box>
      <Box
        className="content"
        sx={{ textAlign: "justify", width: "100%", pl: "5%" }}
      >
        <Typography
          className="heading"
          sx={{ fontWeight: "bold", fontSize: "56px" }}
        >
          401
        </Typography>
        <Typography
          className="heading"
          sx={{ fontWeight: "medium", fontSize: "36px" }}
        >
          Access Denied
        </Typography>
        <Typography
          className="subheading"
          sx={{ mt: 5, fontSize: "21px", color: "#777777" }}
        >
          The page you are looking for is either not available or cannot be
          accessed. Go back to the home page.
        </Typography>
        <Box className="comButton">
          <Button
            variant="contained"
            className="button"
            sx={{ mt: 7, width: "50%", height: "46px" }}
            onClick={handleLogout}
          >
            <Typography sx={{ fontWeight: "bold" }}>Go Back</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Unauthorized;