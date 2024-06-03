import React, { useEffect, useState } from 'react';

const DataFetcher = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
    };

    fetchData(); // Fetch data initially
    const interval = setInterval(fetchData, 60000); // Fetch data every 60 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Bitcoin Price Index</h2>
      <p>USD: {data.bpi.USD.rate}</p>
      <p>GBP: {data.bpi.GBP.rate}</p>
      <p>EUR: {data.bpi.EUR.rate}</p>
    </div>
  );
};

export default DataFetcher;
