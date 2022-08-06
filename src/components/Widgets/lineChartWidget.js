import React, { useEffect } from "react";
import { Dimmer, Label, Loader, Segment } from "semantic-ui-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { getQueryConfig } from "../../container/ApplicationsCache";
import { getQueryDataAction } from "../../actions/queryDataActions";
import { indifiTenants, TENANTS } from "../../utils/constants";

const data = [
  {
    Date: "29 Jan",
    Captured: 8,
    Failed: 4,
  },
  {
    Date: "1 Feb",
    Captured: 10,
    Failed: 6,
  },
  {
    Date: "2 Feb",
    Captured: 12,
    Failed: 8,
  },
  {
    Date: "3 Feb",
    Captured: 2,
    Failed: 5,
  },
  {
    Date: "4 Feb",
    Captured: 8,
    Failed: 2,
  },
  {
    Date: "5 Feb",
    Captured: 10,
    Failed: 6,
  },
];

const LineChartWidget = ({ title, dataID, subDomain = { subDomain } }) => {
  const responseData = useSelector((state) => state.queryData.response[dataID]);
  console.log(responseData, 788888);
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
  return (
    <Segment
      style={{ width: "100%", height: "500px", paddingBottom: "50px" }}
      className="line-chart"
    >
      <Label attached="top">{title}</Label>
      {!responseData ? (
        <Dimmer active inverted>
          <Loader inverted />
        </Dimmer>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={
              responseData?.data.map((e) => {
                delete e.index;
                return e;
              }) || []
            }
            margin={{
              top: 15,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid
              horizontal={true}
              vertical={false}
              stroke="#e8e8e8"
            />
            <XAxis dataKey="Date" dy={15} tickSize={0} />
            <YAxis axisLine={false} tickSize={0} />
            <Tooltip />
            <Legend
              verticalAlign="top"
              height={100}
              iconType="plainline"
              iconSize={50}
            />
            {/* <Line
              dataKey="Captured"
              stroke="#5e93ce"
              dot={false}
              strokeWidth={4}
            /> */}
            <Line
              dataKey="Captured"
              stroke="#5e93ce"
              dot={false}
              strokeWidth={4}
            />
            <Line
              dataKey="Other"
              stroke="#de8244"
              strokeWidth={4}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Segment>
  );
};

export default LineChartWidget;
