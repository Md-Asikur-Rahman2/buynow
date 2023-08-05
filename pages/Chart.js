import React, { useState, useEffect } from "react";
import "react-apexcharts";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ApexChart = () => {
  const [fixedCandles, setFixedCandles] = useState([]);
  const [realTimeCandle, setRealTimeCandle] = useState(null);
  const [prevCandle, setPrevCandle] = useState(null);
  const [balance, setBalance] = useState(10000);
  const [betAmount, setBetAmount] = useState(balance * 0.05);
  const [userBet, setUserBet] = useState(null);
  const [result, setResult] = useState(null);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    setRealTimeCandle(generateRandomData());

    // Start the interval to update real-time candle data every second
    const interval = setInterval(() => {
      updateRealTimeCandle();
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 60));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // Handle the result message display and update balance after one minute
    if (timer === 0) {
      updateBalance();
      displayResult();
      setFixedCandles((prevFixedCandles) => [...prevFixedCandles, realTimeCandle]);
      setRealTimeCandle(generateRandomData());
      setTimer(60); // Start the timer again for the next round
    }
  }, [timer]);

  const updateRealTimeCandle = () => {
    setRealTimeCandle(generateRandomData());
  };

  const generateRandomData = () => {
    const randomPrice = (min, max) => Math.random() * (max - min) + min;
    const close = randomPrice(5000, 15000);
    let open = randomPrice(Math.min(close, 16000), Math.max(close, 3000));

    // Ensure that the opening price is different from the closing price
    while (open === close) {
      open = randomPrice(Math.min(close, 16000), Math.max(close, 3000));
    }

    // Determine the candle color based on the opening and closing prices
    const color = open < close ? "green" : "red";

    return {
      x: new Date().getTime(),
      y: [
        open,
        randomPrice(Math.max(open, close), 16000),
        randomPrice(3000, Math.min(open, close)),
        close,
      ],
      color,
    };
  };

  const handleBet = (isUp) => {
    setUserBet(isUp);
  };

  const updateBalance = () => {
    if (userBet !== null) {
      const result = userBet === realTimeCandle.y[3] > realTimeCandle.y[0];
      const winAmount = result ? betAmount : -betAmount;
      setBalance((prevBalance) => prevBalance + winAmount);
      setResult(result ? "Win" : "Loss");
    }
  };

  const displayResult = () => {
    setTimeout(() => {
      setResult(null);
    }, 2000);
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={{
            chart: {
              type: "candlestick",
              height: 350,
            },
            title: {
              text: "CandleStick Chart",
              align: "left",
            },
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
          }}
          series={[
            {
              name: "Candle",
              data: [...fixedCandles, realTimeCandle],
            },
          ]}
          type="candlestick"
          height={350}
        />
      </div>
      <div>
        <h2>Main Balance: {balance.toFixed(2)}</h2>
        {result && <h2>{result}</h2>}
        <div>
          <button onClick={() => handleBet(true)}>Up</button>
          <button onClick={() => handleBet(false)}>Down</button>
        </div>
        <div>
          <button onClick={() => setBetAmount((prevBetAmount) => prevBetAmount * 2)}>
            +
          </button>
          <button onClick={() => setBetAmount((prevBetAmount) => prevBetAmount / 2)}>
            -
          </button>
        </div>
        <p>Time remaining: {timer}</p>
      </div>
    </div>
  );
};

export default ApexChart;
