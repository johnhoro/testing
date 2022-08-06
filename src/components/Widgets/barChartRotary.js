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
import { Label, Dimmer, Loader, Segment } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { getQueryConfig } from "../../container/ApplicationsCache";
import { getQueryDataAction } from "../../actions/queryDataActions";

export default function BarChartRotary({ type, title, dataID }) {
  const responseData = useSelector((state) => state.queryData.response[dataID]);
  const data = responseData?.data?.sort(
    (a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime()
  );
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
    <Segment style={{ width: "100%", height: "400px" }} className="rotaryChart">
      <Label attached="top">{title}</Label>
      <ResponsiveContainer width="100%" height={300}>
        {!responseData ? (
          <Dimmer active inverted>
            <Loader inverted />
          </Dimmer>
        ) : (
          <BarChart
            width={500}
            data={responseData?.data}
            barSize={40}
            style={{ marginTop: "4rem" }}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="SettlementPeriod"></XAxis>
            <YAxis />
            <Tooltip />
            <Bar dataKey="Settlements" fill="#87cefa" />
          </BarChart>
        )}
      </ResponsiveContainer>
    </Segment>

    //  <ResponsiveContainer width="100%" height="100%">
    //   <BarChart
    //     width={500}
    //     height={300}
    //     data={data}
    //     margin={{
    //       top: 5,
    //       right: 30,
    //       left: 20,
    //       bottom: 5,
    //     }}
    //   >
    //     <CartesianGrid strokeDasharray="3 3" />
    //     <XAxis dataKey="name" />
    //     <YAxis />
    //     <Tooltip />
    //     <Legend />
    //     <Bar dataKey="pv" fill="#8884d8" />
    //     <Bar dataKey="uv" fill="#82ca9d" />
    //   </BarChart>
    // </ResponsiveContainer>
  );
}
