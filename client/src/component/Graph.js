import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { Line, Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, LineController, PointElement, LineElement, BarController, BarElement, Tooltip, Title } from 'chart.js';
Chart.register(CategoryScale, LinearScale, LineController, PointElement, LineElement, BarController, BarElement, Tooltip, Title);

const AccidentGraph = () => {
  // Custom datasets
  const customDataByDate = [
    { date: '2024-04-01', accidents: 10 },
    { date: '2024-04-02', accidents: 15 },
    { date: '2024-06-03', accidents: 8 },
    { date: '2024-04-04', accidents: 12 },
    { date: '2024-09-05', accidents: 6 },
    // Add more data points as needed
  ];




  
  const customDataByVehicle = [
    { type: 'Car', accidents: 20 },
    { type: 'Truck', accidents: 15 },
    { type: 'Motorcycle', accidents: 10 },
    { type: 'Bus', accidents: 8 },
    { type: 'Bicycle', accidents: 5 },
    // Add more data points as needed
  ];
  const [graphType, setGraphType] = useState('date');

  const handleGraphTypeChange = (type) => {
    setGraphType(type);
  };

  const prepareDataByDate = (data) => {
    return {
      labels: data.map(item => item.date),
      datasets: [
        {
          label: 'Number of Accidents',
          data: data.map(item => item.accidents),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    };
  };

  const prepareDataByMonth = (data) => {
    const aggregateDataByMonth = data.reduce((acc, cur) => {
      const month = new Date(cur.date).getMonth();
      acc[month] = (acc[month] || 0) + cur.accidents;
      return acc;
    }, {});
    return {
      labels: Object.keys(aggregateDataByMonth).map(month => new Date(2024, month).toLocaleString('default', { month: 'long' })),
      datasets: [
        {
          label: 'Number of Accidents',
          data: Object.values(aggregateDataByMonth),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    };
  };

  const prepareDataByVehicle = (data) => {
    return {
      labels: data.map(item => item.type),
      datasets: [
        {
          label: 'Number of Accidents',
          data: data.map(item => item.accidents),
          backgroundColor: 'rgb(75, 192, 192)',
          borderWidth: 1
        }
      ]
    };
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-center">Accident Data</h2>
      <div className="w-96 h-96 md:w-3/4 md:h-3/4 lg:w-4/5 lg:h-4/5 xl:w-5/6 xl:h-5/6 mx-auto">
        {graphType === 'date' && <Line data={prepareDataByDate(customDataByDate)} />}
        {graphType === 'month' && <Line data={prepareDataByMonth(customDataByDate)} />}
        {graphType === 'vehicle' && <Bar data={prepareDataByVehicle(customDataByVehicle)} />}
      </div>
      <div className="mt-4 flex gap-4 justify-center">
        <button className="btn" onClick={() => handleGraphTypeChange('date')}>Show by Date</button>
        <button className="btn" onClick={() => handleGraphTypeChange('month')}>Show by Month</button>
        <button className="btn" onClick={() => handleGraphTypeChange('vehicle')}>Show by Vehicle</button>
        {/* Link to the map page */}
        <Link to="/map" className="btn">Show Zonal Division</Link>
      </div>
    </div>
  );
};

export default AccidentGraph;
