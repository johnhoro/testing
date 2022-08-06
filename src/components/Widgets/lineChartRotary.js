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

const LineChartRotary = ({ title, dataID, subDomain = { subDomain } }) => {
  const responseData = useSelector((state) => state.queryData.response[dataID]);
  const data= responseData?.data?.sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime());
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
      className="line-chart rotaryChart"
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
              data.map((e) => {
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
            <Line
              name="Captured Payments"
              dataKey="CapturedPayments"
              stroke="#87cefa"
              dot={false}
              strokeWidth={3}
            />
            <Line
              name="Failed Payments"
              dataKey="FailedPayments"
              stroke="#ff9900"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Segment>
  );
};

export default LineChartRotary;
