import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Line, Bar } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Box, Paper } from '@mui/material';
import backgroundImage from '../utility/pexels-olly-3769138.jpg';
import Button from '@mui/material/Button';
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineController,
  PointElement,
  LineElement,
  BarController,
  BarElement,
  Tooltip,
  Title,
} from "chart.js";
import { axiosPrivate } from "../api/axios";

// Registering chart components
Chart.register(
  CategoryScale,
  LinearScale,
  LineController,
  PointElement,
  LineElement,
  BarController,
  BarElement,
  Tooltip,
  Title
);

const styles = {
  container: {
    position: 'relative',
    borderRadius: '8px',
    maxWidth: '600px',
    margin: 'auto',
    textAlign: 'center',
    overflow: 'hidden',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    filter: 'blur(5px)',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  heading: {
    fontSize: '2rem',
    color: '#343a40',
  },
  overlay: {
    backgroundColor: 'rgba(300, 400, 300, 0.6)',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 0 20px rgba(0,0,0,0.1)',
  },
};

const DialogBox = ({ onClose, year, setYear }) => {
  function handleC(e) {
    setYear(e.target.value);
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md">
          <div className="flex justify-end p-4">
            <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-4">
            <div className="flex justify-center">
              <input
                onChange={handleC}
                value={year}
                type="text"
                className="border border-gray-300 rounded-md px-3 py-2 w-36 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const AccidentGraph = () => {
  const [isOptionsVisible, setOptionsVisible] = useState(false);
  const [year, setYear] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [accidentDataday, setAccidentDataday] = useState([]);
  const [accidentDatamonth, setAccidentDatamonth] = useState([]);
  const [graphType, setGraphType] = useState("date");
  const [selectMonth, setSelectMonth] = useState([]);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.post("/data/getData1d");
        setAccidentDataday(response.data);
      } catch (error) {
        console.error("Error fetching daily data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.post("/data/getData1m");
        setAccidentDatamonth(response.data);
      } catch (error) {
        console.error("Error fetching monthly data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filteredData = accidentDatamonth
          .filter((item) => item.month.startsWith(year.toString()))
          .map((item) => {
            const monthNames = [
              "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
            ];
            const monthIndex = parseInt(item.month.split("-")[1]) - 1;
            const monthName = monthNames[monthIndex];
            return { month: monthName, accidents: item.accidents };
          });
        setSelectMonth(filteredData);
      } catch (error) {
        console.error("Error filtering data:", error);
      }
    };
    fetchData();
  }, [year, accidentDatamonth]);

  const handleGraphTypeChange = (type) => {
    if (type === "month") {
      handleDialogOpen();
    }
    setGraphType(type);
  };

  const prepareDataByDate = (data) => {
    return {
      labels: data.map((item) => item.date),
      datasets: [
        {
          label: "Number of Accidents",
          data: data.map((item) => item.accidents),
          fill: false,
          borderColor: "rgb(100, 0, 192)",
          tension: 0.2,
        },
      ],
    };
  };

  const prepareDataByMonth = (data) => {
    return {
      labels: data.map((item) => item.month),
      datasets: [
        {
          label: "Number of Accidents",
          data: data.map((item) => item.accidents),
          fill: false,
          borderColor: "rgb(100, 0, 192)",
          tension: 0.1,
        },
      ],
    };
  };

  const prepareDataByVehicle = (data) => {
    return {
      labels: data.map((item) => item.type),
      datasets: [
        {
          label: "Number of Accidents",
          data: data.map((item) => item.accidents),
          backgroundColor: "rgb(100, 0, 192)",
          borderWidth: 1,
        },
      ],
    };
  };

  const customDataByVehicle = [
    { type: "Car", accidents: 20 },
    { type: "Truck", accidents: 15 },
    { type: "Motorcycle", accidents: 10 },
    { type: "Bus", accidents: 8 },
    { type: "Bicycle", accidents: 5 },
  ];

  const toggleOptionsVisibility = () => {
    setOptionsVisible(!isOptionsVisible);
  };

  // Common chart options for dark x and y coordinates
  const commonChartOptions = {
    scales: {
      x: {
        ticks: {
          color: "#000", // Dark color for x-axis labels
        },
        grid: {
          color: "#000", // Dark color for x-axis grid lines
        },
      },
      y: {
        ticks: {
          color: "#000", // Dark color for y-axis labels
        },
        grid: {
          color: "#000", // Dark color for y-axis grid lines
        },
      },
    },
  };

  return (
    <>
      <div style={styles.backgroundImage}></div>
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <div className="flex flex-col lg:w-1/4 p-4">
          <button className="absolute top-20 left-0" onClick={toggleOptionsVisibility}>
            {isOptionsVisible ? (
              <FontAwesomeIcon icon={faArrowLeft} className="fa-3x" />
            ) : (
              <FontAwesomeIcon icon={faCircleArrowRight} className="fa-3x" />
            )}
          </button>
          {isOptionsVisible && (
            <div className="bg-red-100 flex flex-col items-center justify-center p-4">
              <Paper elevation={3} className="p-4">
              <h2 className="text-center mb-4">Graph Options</h2>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    className="mb-2"
                    onClick={() => handleGraphTypeChange("date")}
                  >
                    Show by Date
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    className="mb-2"
                    onClick={() => handleGraphTypeChange("month")}
                  >
                    Show by Month
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    className="mb-2"
                    onClick={() => handleGraphTypeChange("vehicle")}
                  >
                    Show by Vehicle
                  </Button>
                  <Button
                    component={Link}
                    to="/map"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Show Zonal Division
                  </Button>
                </Box>
                <div className="container">
                  {isDialogOpen && (
                    <DialogBox onClose={handleDialogClose} year={year} setYear={setYear} />
                  )}
                </div>
              </Paper>
            </div>
          )}
        </div>
        <div className="w-full lg:w-3/4 p-4">
          {graphType === "date" && (
            <Line data={prepareDataByDate(accidentDataday)} options={commonChartOptions} />
          )}
          {graphType === "month" && (
            <Line data={prepareDataByMonth(selectMonth)} options={commonChartOptions} />
          )}
          {graphType === "vehicle" && (
            <Bar data={prepareDataByVehicle(customDataByVehicle)} options={commonChartOptions} />
          )}
        </div>
      </div>
    </>
  );
};

export default AccidentGraph;
