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
  return (
    <Segment style={{ width: "100%", height: "400px" }}>
      <Label attached="top">{title}</Label>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={200}
          data={responseData?.data}
          barSize={40}
          style={{ marginTop: "4rem" }}
        >
          <XAxis dataKey="time"></XAxis>
          <YAxis />
          <Tooltip />
          <Bar dataKey="total_count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Segment>
  );
}
