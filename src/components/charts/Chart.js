import { useEffect, useState } from "react";
// import "../../../node_modules/react-vis/dist/style.css";
// import {
//   HorizontalGridLines,
//   LineSeries,
//   VerticalGridLines,
//   XAxis,
//   XYPlot,
//   YAxis,
// } from "react-vis";
const Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    // const fetchData = async () => {
    //   const result = await fetchSomeData();
    //   setData(result);
    // };
    setData([
      { x: 0, y: 8 },
      { x: 1, y: 5 },
      { x: 2, y: 1 },
      { x: 3, y: 7 },
      { x: 4, y: 2 },
      { x: 5, y: 6 },
      { x: 6, y: 8 },
      { x: 7, y: 5 },
      { x: 8, y: 1 },
      { x: 9, y: 7 },
      { x: 10, y: 2 },
      { x: 11, y: 6 },
    ]);

    // fetchData();
  }, []);
  return (
    <>
      {data.length > 0 && (
        <div style={{ marginTop: "15px" }}>
          {/* <XYPlot height={300} width={300}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <LineSeries data={data} color="green" />
          </XYPlot> */}
        </div>
      )}
    </>
  );
};

export default Chart;
