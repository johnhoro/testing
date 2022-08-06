// import React from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export const options = {
//   maintainAspectRatio: false,
//   scales: {
//     x: {
//       grid: {
//         display: false,
//         borderWidth: 2,
//       },
//     },
//     y: {
//       grid: {
//         display: false,
//         borderWidth: 2,
//       },
//     },
//   },
//   barThickness: 10,
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top",
//       align: "start",
//       // position: "left",
//       labels: {
//         boxWidth: 10,
//         boxHeight: 10,
//         font: {
//           size: 10,
//         },
//       },
//     },
//   },
// };

// const labels = [
//   "Jan 1",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "Jan 15",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "Jan 31",
// ];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: "Uniware File Data",
//       data: [
//         3, 5, 6, 4, 3, 4, 5, 3, 4, 5, 3, 1, 6, 3, 4, 6, 1, 6, 4, 5, 3, 7, 5, 6,
//         2, 6, 2, 4, 6, 2, 3,
//       ],
//       backgroundColor: "rgb(33, 113, 161)",
//     },
//     {
//       label: "Channel File Data",
//       data: [
//         5, 4, 5, 2, 6, 2, 4, 5, 2, 7, 6, 5, 5, 6, 4, 5, 6, 4, 1, 6, 4, 3, 4, 5,
//         3, 7, 6, 1, 3, 4, 5,
//       ],
//       backgroundColor: "rgb(247, 213, 73)",
//     },
//   ],
// };

// export default function App() {
//   return (
//     <div
//       style={{
//         height: "400px",
//       }}
//     >
//       <Bar options={options} data={data} />
//     </div>
//   );
// }

import React, { useEffect } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label as LabelChart,
  ResponsiveContainer,
} from "recharts";
import { Label, Segment } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { getQueryConfig } from "../../container/ApplicationsCache";
import { getQueryDataAction } from "../../actions/queryDataActions";

const data = [
  {
    name: "T + 1 Day",
    uv: 9100,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "T + 2 Day",
    uv: 125,
    pv: 1398,
    amt: 2210,
  },
];

export default function BarChartIndifi({ type, title, dataID }) {
  const responseData = useSelector((state) => state.queryData.response[dataID]);

  console.log(dataID, responseData, "bar");
  // const responseData = useSelector((state) =>
  //   dataID.map((id) => state.queryData.response[id])
  // );
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.queryData.filter);
  const text_search = filter.text_search;
  const startDate = filter.startDate.toISOString();
  const endDate = filter.endDate.toISOString();

  useEffect(() => {
    if (!responseData) {
      const config = getQueryConfig(dataID);
      const effective_filter = {
        ...config.filter,
        startDate,
        endDate,
        text_search,
      };
      dispatch(
        getQueryDataAction(dataID, { ...config, filter: effective_filter })
      );
    }
  }, [filter]);
  console.log(responseData?.data, "barChart");

  // useEffect(() => {
  //   if (!responseData[0] || !responseData[1]) {
  //     const config = dataID.map((id) => getQueryConfig(id));
  //     dataID.map((d, i) =>
  //       dispatch(
  //         getQueryDataAction(d, {
  //           ...config[i],
  //           filter: {
  //             ...config[i]?.filter,
  //             startDate,
  //             endDate,
  //             text_search,
  //           },
  //         })
  //       )
  //     );
  //   }

  // if (!responseData) {
  //   const config = getQueryConfig(dataID);

  //   dispatch(
  //     getQueryDataAction(dataID, {
  //       ...config,
  //       filter: {
  //         ...config?.filter,
  //         startDate,
  //         endDate,
  //         text_search,
  //       },
  //     })
  //   );
  // }
  // }, [filter]);

  // export const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: "Uniware File Data",
  //       data: [
  //         3, 5, 6, 4, 3, 4, 5, 3, 4, 5, 3, 1, 6, 3, 4, 6, 1, 6, 4, 5, 3, 7, 5, 6,
  //         2, 6, 2, 4, 6, 2, 3,
  //       ],
  //       backgroundColor: "rgb(33, 113, 161)",
  //     },
  //     {
  //       label: "Channel File Data",
  //       data: [
  //         5, 4, 5, 2, 6, 2, 4, 5, 2, 7, 6, 5, 5, 6, 4, 5, 6, 4, 1, 6, 4, 3, 4, 5,
  //         3, 7, 6, 1, 3, 4, 5,
  //       ],
  //       backgroundColor: "rgb(247, 213, 73)",
  //     },
  //   ],
  // };

  console.log(responseData, "barChart");
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={200}
        data={responseData?.data}
        barSize={40}
        style={{ marginTop: "4rem" }}
      >
        <XAxis dataKey="date_uniware"></XAxis>
        <YAxis />
        <Tooltip />
        <Bar dataKey="daily_count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
