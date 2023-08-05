import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("./Chart"), { ssr: false });

const ApexChartPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      <h1>Next.js Candlestick Chart with ApexCharts</h1>
      {isClient && <ApexChart />}
    </div>
  );
};

export default ApexChartPage;
