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
import { mosaicTestTenants, TENANTS } from "../../utils/constants";

export default function BarChartMosaicTest({ type, title, dataID, subDomain }) {
  const responseData = useSelector((state) => state.queryData.response[dataID]);
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
      if (mosaicTestTenants.includes(TENANTS(subDomain))) {
        dispatch(
          getQueryDataAction(dataID, {
            ...config,
            filter: effective_filter,
            whereClause:
              Object.values(
                { value: filter.whereClause.is_channel } || {}
              ).join(` `) +
              " " +
              (config.whereClause || {}),
          })
        );
      } else {
        dispatch(
          getQueryDataAction(dataID, { ...config, filter: effective_filter })
        );
      }
    }
  }, [filter]);
  console.log(responseData?.data, "barChart_j");

  const barData = [
    { Channel_FileData: 2933, Date: "01-Mar", Metabase_FileData: 1000 },
    { Channel_FileData: 1232, Date: "02-Mar", Metabase_FileData: 4980 },
    { Channel_FileData: 2943, Date: "03-Mar", Metabase_FileData: 2522 },
    { Channel_FileData: 2330, Date: "04-Mar", Metabase_FileData: 2913 },
    { Channel_FileData: 1243, Date: "05-Mar", Metabase_FileData: 4980 },
    { Channel_FileData: 1846, Date: "06-Mar", Metabase_FileData: 3287 },
    { Channel_FileData: 4342, Date: "07-Mar", Metabase_FileData: 4980 },
    { Channel_FileData: 2933, Date: "08-Mar", Metabase_FileData: 4980 },
    { Channel_FileData: 2933, Date: "09-Mar", Metabase_FileData: 1180 },
    { Channel_FileData: 2933, Date: "10-Mar", Metabase_FileData: 4980 },
    { Channel_FileData: 2933, Date: "11-Mar", Metabase_FileData: 2280 },
    { Channel_FileData: 2933, Date: "12-Mar", Metabase_FileData: 3395 },
    { Channel_FileData: 2933, Date: "13-Mar", Metabase_FileData: 4980 },
    { Channel_FileData: 1133, Date: "14-Mar", Metabase_FileData: 2324 },
    { Channel_FileData: 2133, Date: "15-Mar", Metabase_FileData: 4980 },
    { Channel_FileData: 2933, Date: "16-Mar", Metabase_FileData: 1133 },
    { Channel_FileData: 1932, Date: "17-Mar", Metabase_FileData: 4980 },
    { Channel_FileData: 2933, Date: "18-Mar", Metabase_FileData: 4980 },
    { Channel_FileData: 2933, Date: "19-Mar", Metabase_FileData: 5745 },
    { Channel_FileData: 2933, Date: "20-Mar", Metabase_FileData: 4980 },
    { Channel_FileData: 2933, Date: "21-Mar", Metabase_FileData: 4980 },
    { Channel_FileData: 2933, Date: "22-Mar", Metabase_FileData: 3980 },
    { Channel_FileData: 2933, Date: "23-Mar", Metabase_FileData: 2980 },
    { Channel_FileData: 2933, Date: "24-Mar", Metabase_FileData: 1980 },
    { Channel_FileData: 2933, Date: "25-Mar", Metabase_FileData: 2380 },
    { Channel_FileData: 1867, Date: "26-Mar", Metabase_FileData: 4980 },
    { Channel_FileData: 1023, Date: "27-Mar", Metabase_FileData: 4180 },
    { Channel_FileData: 2933, Date: "28-Mar", Metabase_FileData: 2880 },
    { Channel_FileData: 1943, Date: "29-Mar", Metabase_FileData: 4080 },
    { Channel_FileData: 2933, Date: "30-Mar", Metabase_FileData: 1380 },
    { Channel_FileData: 2079, Date: "31-Mar", Metabase_FileData: 4580 },
  ];
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={200}
        data={barData}
        // barSize={20}
        barGap={0}
        style={{ marginTop: "4rem" }}
      >
        <XAxis dataKey="Date"></XAxis>
        <YAxis />
        <Tooltip />
        <Bar barSize={10} dataKey="Metabase_FileData" fill="#2171B5" />
        <Bar barSize={10} dataKey="Channel_FileData" fill="#F9D849" />
        <Legend />
      </BarChart>
    </ResponsiveContainer>
  );
}
