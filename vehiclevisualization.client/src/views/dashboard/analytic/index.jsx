import React, { useEffect, useState } from "react";
import Main from "../../../components/main/main";
import "./analytic.css";
import CardComponent from "../../../components/card/card";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import axios from "axios";
import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ReactApexCharts from "react-apexcharts";

const Analytic = () => {
  const [selectedYear, setSelectedYear] = useState(2022);
  const [selectedProvince, setSelectedProvince] = useState(" ALL PROVINCE");
  const [vehicleData, setVehicleData] = useState([]);

  useEffect(() => {
    fetchVehicleUnitYoY();
  }, []);

  const fetchVehicleUnitYoY = () => {
    const token = localStorage.getItem("Bearer ");
    axios
      .get("/api/Vehicle/growthyoy", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setVehicleData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
  };

  const getVehicleDataForYearAndProvince = (year, province) => {
    return vehicleData.find(
      (data) => data.year === year.toString() && data.province === province
    );
  };
  
  const selectedVehicleData = getVehicleDataForYearAndProvince(
    selectedYear,
    selectedProvince
  );

  const PieChartOption = {
    chart: {
      type: "pie",
    },
    colors: ["#1e88e5", "#43a047", "#ff1744", "#651fff"],
    labels: ["Bus", "Car", "Motorcycle", "Truck"],
    dataLabels: {
      enabled: true,
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "bottom",
    },
    tooltip: {
      y: {
        formatter: (value) => `${value.toLocaleString("id-ID")} units`,
      },
    },
  };

  const PieChartSeries = [
    selectedVehicleData ? selectedVehicleData.busYear : 0,
    selectedVehicleData ? selectedVehicleData.carYear : 0,
    selectedVehicleData ? selectedVehicleData.motorCycleYear : 0,
    selectedVehicleData ? selectedVehicleData.truckYear : 0,
  ];

  const stackedColumnOptions = {
    series: [
      {
        name: "Bus",
        data: vehicleData
          .filter((data) => data.province === selectedProvince)
          .map((data) => data.busYear),
      },
      {
        name: "Car",
        data: vehicleData
          .filter((data) => data.province === selectedProvince)
          .map((data) => data.carYear),
      },
      {
        name: "Motorcycle",
        data: vehicleData
          .filter((data) => data.province === selectedProvince)
          .map((data) => data.motorCycleYear),
      },
      {
        name: "Truck",
        data: vehicleData
          .filter((data) => data.province === selectedProvince)
          .map((data) => data.truckYear),
      },
    ],
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    colors: ["#1e88e5", "#43a047", "#ff1744", "#651fff"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    title: {
      text: "Vehicle Unit Year",
      align: "center",
      style: {
        fontSize: "24px",
        fontWeight: "bold",
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: "13px",
              fontWeight: 700,
            },
          },
        },
      },
    },
    xaxis: {
      categories: vehicleData
        .filter((data) => data.province === selectedProvince)
        .map((data) => data.year),
    },
    yaxis: {
      labels: {
        formatter: (value) => `${(value / 1_000_000).toFixed(1)} M`,
      },
    },
    legend: {
      position: "right",
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
  };

  const lineChartOptions = {
    series: [
      {
        name: "Bus",
        data: vehicleData
          .filter((data) => data.province === selectedProvince)
          .map((data) => data.busYoY),
      },
      {
        name: "Car",
        data: vehicleData
          .filter((data) => data.province === selectedProvince)
          .map((data) => data.carYoY),
      },
      {
        name: "Motorcycle",
        data: vehicleData
          .filter((data) => data.province === selectedProvince)
          .map((data) => data.motorCycleYoY),
      },
      {
        name: "Truck",
        data: vehicleData
          .filter((data) => data.province === selectedProvince)
          .map((data) => data.truckYoY),
      },
    ],
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    colors: ["#1e88e5", "#43a047", "#ff1744", "#651fff"],
    markers: {
      size: 5,
      colors: ["#1e88e5", "#43a047", "#ff1744", "#651fff"],
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
    title: {
      text: "Vehicle Unit Growth YoY %",
      align: "center",
      style: {
        fontSize: "24px",
        fontWeight: "bold",
      },
    },
    xaxis: {
      categories: vehicleData
        .filter((data) => data.province === selectedProvince)
        .map((data) => data.year),
    },
  };

  return (
    <Main>
      <Box>
        <FormControl sx={{ width: "10%", backgroundColor: "#fff" }}>
          <InputLabel id="year-select-label">Year</InputLabel>
          <Select
            labelId="year-select-label"
            id="year-select"
            value={selectedYear}
            label="Year"
            onChange={handleYearChange}
          >
            {[2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022].map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {vehicleData.length > 0 && (
          <FormControl
            sx={{ width: "20%", backgroundColor: "#fff", marginLeft: 2 }}
          >
            <InputLabel id="province-select-label">Province</InputLabel>
            <Select
              labelId="province-select-label"
              id="province-select"
              value={selectedProvince}
              label="Province"
              onChange={handleProvinceChange}
              MenuProps={{
                PaperProps: {
                  sx: {
                    maxHeight: 350,
                    overflowY: "auto",
                  },
                },
              }}
            >
              {vehicleData.slice(0, 35).map((data, index) => (
                <MenuItem key={index} value={data.province}>
                  {data.province}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>
      {selectedVehicleData && (
        <Box sx={{ display: "flex", width: "100%", mt: 2 }}>
          <CardComponent width="25%" borderLeft="10px solid #1e88e5">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
                Bus
              </Typography>
              <DirectionsBusFilledIcon
                sx={{
                  fontSize: "42px",
                  backgroundColor: "#1e88e5",
                  color: "white",
                  borderRadius: "6px",
                }}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
                Units: {selectedVehicleData.busYear.toLocaleString("id-ID")}
              </Typography>
              <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
                YoY Growth: {selectedVehicleData.busYoY}%
              </Typography>
            </Box>
          </CardComponent>
          <CardComponent
            width="25%"
            marginLeft="12px"
            borderLeft="10px solid #43a047"
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
                Car
              </Typography>
              <DirectionsCarFilledIcon
                sx={{
                  fontSize: "42px",
                  backgroundColor: "#43a047",
                  color: "white",
                  borderRadius: "6px",
                }}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
                Units: {selectedVehicleData.carYear.toLocaleString("id-ID")}
              </Typography>
              <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
                YoY Growth: {selectedVehicleData.carYoY}%
              </Typography>
            </Box>
          </CardComponent>
          <CardComponent
            width="25%"
            marginLeft="12px"
            borderLeft="10px solid #ff1744"
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
                Motorcycle
              </Typography>
              <TwoWheelerIcon
                sx={{
                  fontSize: "42px",
                  backgroundColor: "#ff1744",
                  color: "white",
                  borderRadius: "6px",
                }}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
                Units:{" "}
                {selectedVehicleData.motorCycleYear.toLocaleString("id-ID")}
              </Typography>
              <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
                YoY Growth: {selectedVehicleData.motorCycleYoY}%
              </Typography>
            </Box>
          </CardComponent>
          <CardComponent
            width="25%"
            marginLeft="12px"
            borderLeft="10px solid #651fff"
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
                Truck
              </Typography>
              <LocalShippingIcon
                sx={{
                  fontSize: "42px",
                  backgroundColor: "#651fff",
                  color: "white",
                  borderRadius: "6px",
                }}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
                Units: {selectedVehicleData.truckYear.toLocaleString("id-ID")}
              </Typography>
              <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
                YoY Growth: {selectedVehicleData.truckYoY}%
              </Typography>
            </Box>
          </CardComponent>
        </Box>
      )}
      <Box sx={{ display: "flex", width: "100%", mt: 2 }}>
        <CardComponent width="70%">
          <ReactApexCharts
            options={lineChartOptions}
            series={lineChartOptions.series}
            type="line"
            height={350}
          />
        </CardComponent>
        <CardComponent width="30%" marginLeft="12px">
          <ReactApexCharts
            options={PieChartOption}
            series={PieChartSeries}
            type="pie"
            height={350}
          />
        </CardComponent>
      </Box>
      <Box sx={{ mt: 2 }}>
        <CardComponent width="100%">
          <ReactApexCharts
            options={stackedColumnOptions}
            series={stackedColumnOptions.series}
            type="bar"
            height={350}
          />
        </CardComponent>
      </Box>
    </Main>
  );
};

export default Analytic;