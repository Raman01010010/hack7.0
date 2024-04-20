import React, { useEffect } from 'react';

const Dashboard = () => {
 
 

  const styles = `
  html {
    box-sizing: border-box;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
    padding: 0;
    margin: 0;
  }
  body {
    height: 100vh;
    overflow: hidden;
    background-color: #eee;
  }
  .city {
    display: flex;
    flex-wrap: wrap;
    height: 100vh;
    padding: 4vw;
    overflow: auto;
    transform-style: preserve-3d;
    perspective: 200px;
    perspective-origin: center;
    background-image: url('https://i.pinimg.com/564x/3a/19/8f/3a198f4a369be16c37b0f397289dc045.jpg');
    background-size: contain; /* Adjust as needed */
    background-position: center;
}




  .block {
    position: relative;
    width: calc(50vw - 12vw);
    height: calc(50vw - 12vw);
    margin: 4vw;
    /* background-color: lightgreen; */
    background-image: url('https://img.freepik.com/premium-photo/top-view-buildings_948023-1461.jpg?w=740');
    background-size: cover; /* Adjust as needed */
    background-position: center;
    box-shadow:
      0 0 0 1.25vw #fff,
      0 0 0 3.875vw #eee,
      0 0 0 4.125vw #fff,
      0 0 0 6.75vw #eee,
      0 0 0 8vw #fff;
}

  .block.double-wide {
    width: 100vw;
  }
  .intersection {
    position: absolute;
    display: block;
    width: 7vw;
    height: 7vw;
    background-color: #eee;
    border: 2px dashed #fff;
    box-shadow:
      inset 0 0 0 0.25vw #eee,
      inset 0 0 0 0.5vw #fff,
      0 0 0 0.25vw #eee,
      0 0 0 0.5vw #fff;
  }

  .intersection:nth-child(1) {
    top: -7.5vw;
    left: -7.5vw;
  }

  .intersection:nth-child(2) {
    top: -7.5vw;
    right: -7.5vw;
  }

  .intersection:nth-child(3) {
    bottom: -7.5vw;
    left: -7.5vw;
  }

  .intersection:nth-child(4) {
    bottom: -7.5vw;
    right: -7.5vw;
  }

  .intersection:nth-child(5) {
    top: -7.5vw;
    left: calc(50% - 3.5vw);
  }

  .intersection:nth-child(6) {
    bottom: -7.5vw;
    right: calc(50% - 3.5vw);
  }

  .vehicle {
    position: absolute;
    z-index: 1;
    top: -3.5vw;
    left: -3.5vw;
    width: 3.5vw;
    height: 2vw;
    transform-origin: 50% 3.5vw;
    background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Travel-car-topview.svg/768px-Travel-car-topview.svg.png?20201206193611');
  background-size: cover; /* Adjust as needed */
  background-position: center; /* Change color here */
    animation: drive 16s linear infinite;
  }

  .double-wide .vehicle {
    animation: drive-wide 16s linear infinite;
  }

  .block .vehicle:nth-child(2) {
    animation-delay: -8s;
  }

  .block:not(.double-wide) + .block:not(.double-wide) .vehicle:nth-child(1) {
    animation-delay: -1s;
  }

  .block:not(.double-wide) + .block:not(.double-wide) .vehicle:nth-child(2) {
    animation-delay: -10s;
  }

  @keyframes drive {
    0% { transform: translate(1.75vw, 0) rotate(0); }
    30% { transform: translate(39.875vw, 0) rotate(0); }
    33% { transform: translate(39.875vw, 0) rotate(90deg); }
    42% { transform: translate(39.875vw, 38.125vw) rotate(90deg); }
    45% { transform: translate(39.875vw, 38.125vw) rotate(180deg); }
    63% { transform: translate(1.875vw, 38.125vw) rotate(180deg); }
    66% { transform: translate(1.75vw, 38.125vw) rotate(270deg); }
    97% { transform: translate(1.75vw, 0) rotate(270deg); }
    100% { transform: translate(1.75vw, 0) rotate(360deg); }
  }

  @keyframes drive-wide {
    0% { transform: translate(1.875vw, 0) rotate(0); }
    30% { transform: translate(85.875vw, 0) rotate(0); }
    33% { transform: translate(85.875vw, 0) rotate(90deg); }
    42% { transform: translate(85.875vw, 38.125vw) rotate(90deg); }
    45% { transform: translate(85.875vw, 38.125vw) rotate(180deg); }
    63% { transform: translate(1.75vw, 38.125vw) rotate(180deg); }
    66% { transform: translate(1.75vw, 38.125vw) rotate(270deg); }
    97% { transform: translate(1.75vw, 0) rotate(270deg); }
    100% { transform: translate(1.75vw, 0) rotate(360deg); }
  }
`;
  return (
    <div>
        <style>{styles}</style>
    
    <div className="city">
      <div className="block">
        <div className="intersection"></div>
        <div className="intersection"></div>
        <div className="intersection"></div>
        <div className="intersection"></div>
        
        <div className="buildings">
      <img src="https://img.freepik.com/premium-photo/top-view-buildings_948023-1461.jpg?w=740" alt="building" />
    </div>        
        <div className="vehicles">
          <div className="vehicle"></div>
          <div className="vehicle"></div>
        </div>
      </div>
      <div className="block">
        <div className="intersection"></div>
        <div className="intersection"></div>
        <div className="intersection"></div>
        <div className="intersection"></div>
        
        <div className="buildings">
      <img src="https://img.freepik.com/premium-photo/top-view-buildings_948023-1461.jpg?w=740" alt="building" />
    </div>          
        <div className="vehicles">
          <div className="vehicle"></div>
          <div className="vehicle"></div>
        </div>
      </div>
      <div className="block double-wide">
        <div className="intersection"></div>
        <div className="intersection"></div>
        <div className="intersection"></div>
        <div className="intersection"></div>
        <div className="intersection"></div>
        <div className="intersection"></div>
        
        <div className="buildings">
      {/* <img src="https://img.freepik.com/premium-photo/top-view-buildings_948023-1461.jpg?w=740" alt="building" /> */}
    </div>          
        <div className="vehicles">
          <div className="vehicle"></div>
          <div className="vehicle"></div>
        </div>
      </div>
      <div className="block">
        <div className="intersection"></div>
        <div className="intersection"></div>
        <div className="intersection"></div>
        <div className="intersection"></div>
        
        <div className="buildings">
      <img src="https://img.freepik.com/premium-photo/top-view-buildings_948023-1461.jpg?w=740" alt="building" />
    </div>          
        <div className="vehicles">
          <div className="vehicle"></div>
          <div className="vehicle"></div>
        </div>
      </div>
      <div className="block">
        <div className="intersection"></div>
        <div className="intersection"></div>
        <div className="intersection"></div>
        <div className="intersection"></div>
        
        <div className="buildings">
      <img src="https://img.freepik.com/premium-photo/top-view-buildings_948023-1461.jpg?w=740" alt="building" />
    </div>          
        <div className="vehicles">
          <div className="vehicle"></div>
          <div className="vehicle"></div>
        </div>
      </div>
      <div className="block double-wide">
        <div className="intersection"></div>
        <div className="intersection"></div>
        <div className="intersection"></div>
        <div className="intersection"></div>
        <div className="intersection"></div>
        <div className="intersection"></div>
        
        <div className="buildings"></div>
        
        <div className="vehicles">
          <div className="vehicle"></div>
          <div className="vehicle"></div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
