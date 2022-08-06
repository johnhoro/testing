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

const LineChartIndifi = ({ title, dataID }) => {
  console.log(dataID, "id");
  // const responseData = useSelector((state) =>
  //   dataID.map((v) => state.queryData.response[v])
  // );
  // console.log(responseData, "response");

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
        ...config?.filter,
        startDate,
        endDate,
        text_search,
      };
      dispatch(
        getQueryDataAction(dataID, { ...config, filter: effective_filter })
      );
    }
  }, [filter]);

  console.log(responseData, "line");
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
        <>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={400}
              isAnimationActive={false}
              data={
                responseData?.data?.map((e) => {
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
              {/* <XAxis
                dataKey="Date"
                dy={15}
                height={1}
                tickSize={0}
                borderWidth={1}
                style={{
                  stroke: "#BBBBBB",
                }}
              /> */}
              <YAxis tickSize={0} />
              <Tooltip />
              <Legend
                verticalAlign="top"
                height={100}
                iconSize={10}
                iconType="square"
              />
              <Line
                name="Credit Transactions"
                dataKey="Credit"
                stroke="#87cefa"
                dot={false}
                strokeWidth={4}
              />
              <Line
                name="Debit Transactions"
                dataKey="Debit"
                stroke="#ff9900"
                strokeWidth={4}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>{" "}
        </>
      )}
    </Segment>
  );
};

export default LineChartIndifi;
