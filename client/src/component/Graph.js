import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { Line, Bar } from "react-chartjs-2";
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

const AccidentGraph = () => {
  const [year,setYear]=useState("");
  const DialogBox = ({ onClose }) => {
  function handleC(e){
setYear(e.target.value);
console.log(year)
  }
    return (
      <div
        data-aos="flip-right"
        className="bg-opacity-30 backdrop-blur-md p-4 rounded-lg bg-gray-200 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-80"
      >
        <div className="bg-cyan-800 border border-2 border-cyan-800w-full lg:w-1/4 rounded-lg">
          <div className="flex justify-end p-4">
            <div onClick={onClose} className="text-2xl">
              x
            </div>
          </div>
  
          <div className=" p-4 rounded shadow-md">
            <p className="mb-4">Please select Year</p>
            <div className="flex justify-center">
             <input onChange={handleC} value={year} type="text"/>
            </div>
            <button onClick={onClose}>OK</button>
          </div>
        </div>{" "}
      </div>
    );
  };
  // Custom datasets
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  

  const customDataByDate = [
    { date: "2024-04-01", accidents: 10 },
    { date: "2024-04-02", accidents: 15 },
    { date: "2024-06-03", accidents: 8 },
    { date: "2024-04-04", accidents: 12 },
    { date: "2024-09-05", accidents: 6 },
    // Add more data points as needed
  ];
  
  const [accidentDataday, setAccidentDataday] = useState([]);
  const [accidentDatamonth, setAccidentDatamonth] = useState([]);
  // const [year, setear] = useState(new Date().getFullYear());
  const [selectMonth,setSelectMonth]=useState([]);

  // const handleYearChange = (year) => {
  //   setyear(year);
  // };
  // Fetch data from the backend when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("called");

        const response = await axiosPrivate.post("/data/getData1d"); // Assuming the API endpoint is '/api/getData1d'
        setAccidentDataday(response.data); // Update the state variable with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // Call the fetchData function
  }, []);
 
  console.log("year kya tha",year);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = accidentDatamonth;
        console.log("lafda", year, "vaha", data);
        const filteredData = data
          .filter((item) => item.month.startsWith(year.toString()))
          .map((item) => {
            const monthNames = [
              "January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"
            ];
            const monthIndex = parseInt(item.month.split("-")[1]) - 1;
            const monthName = monthNames[monthIndex];
            return { month: monthName, accidents: item.accidents };
          });
        setSelectMonth(filteredData);
        console.log("vvv", filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [year]);
  
  
  console.log(selectMonth);
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("called");
        const response = await axiosPrivate.post("/data/getData1m"); // Assuming the API endpoint is '/api/getData1d'
        setAccidentDatamonth(response.data); // Update the state variable with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // Call the fetchData function
  }, []);

  console.log("vivek", accidentDatamonth);
  const customDataByVehicle = [
    { type: "Car", accidents: 20 },
    { type: "Truck", accidents: 15 },
    { type: "Motorcycle", accidents: 10 },
    { type: "Bus", accidents: 8 },
    { type: "Bicycle", accidents: 5 },
    // Add more data points as needed
  ];
  const [graphType, setGraphType] = useState("date");

  const handleGraphTypeChange = (type) => {
    console.log(type)
    if (type == "month") {
      console.log("jjjjjjjjjjj");
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
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
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
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
};

// Inside the return statement of the component:
{graphType === "month" && (
  <Line data={prepareDataByMonth(selectMonth)} />
)}
  const prepareDataByVehicle = (data) => {
    return {
      labels: data.map((item) => item.type),
      datasets: [
        {
          label: "Number of Accidents",
          data: data.map((item) => item.accidents),
          backgroundColor: "rgb(75, 192, 192)",
          borderWidth: 1,
        },
      ],
    };
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-center">Accident Data</h2>
      <div className="w-96 h-96 md:w-3/4 md:h-3/4 lg:w-4/5 lg:h-4/5 xl:w-5/6 xl:h-5/6 mx-auto">
        {graphType === "date" && (
          <Line data={prepareDataByDate(accidentDataday)} />
        )}
        {graphType === "month" && (
          <Line data={prepareDataByMonth(selectMonth)} />
        )}
        {graphType === "vehicle" && (
          <Bar data={prepareDataByVehicle(customDataByVehicle)} />
        )}
      </div>
      <div className="mt-4 flex gap-4 justify-center">
        <button className="btn" onClick={() => handleGraphTypeChange("date")}>
          Show by Date
        </button>
        <button className="btn" onClick={() => handleGraphTypeChange("month")}>
          Show by Month
        </button>
        <button
          className="btn"
          onClick={() => handleGraphTypeChange("vehicle")}
        >
          Show by Vehicle
        </button>
        {/* Link to the map page */}
        <div className="container">
          <h1>Click to Show Dialog</h1>
          <button onClick={handleDialogOpen}>Show Dialog</button>
          {isDialogOpen && <DialogBox onClose={handleDialogClose} />}
        </div>
        <Link to="/map" className="btn">
          Show Zonal Division
        </Link>
      </div>
    </div>
  );
};

export default AccidentGraph;
